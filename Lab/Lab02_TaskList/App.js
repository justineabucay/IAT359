// Import React and the useState hook for managing component state
import React, { useState } from 'react';
// Import React Native components needed for the UI
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

// Import SafeAreaView from expo's safe-area-context instead of react-native
// This ensures the app content doesn't overlap with device status bars/notches
import { SafeAreaView } from 'react-native-safe-area-context';

// Main App component - functional component using hooks
const App = () => {

  // STATE MANAGEMENT
  // tasks: array that holds all the tasks, initially empty
  // setTasks: function to update the tasks array
  const [tasks, setTasks] = useState([]);

  // task: string that holds the current input text from the user
  // setTask: function to update the current input text
  const [task, setTask] = useState('');

  // FUNCTION: Add a new task to the list
  const addTask = () => {
    // Check if the input has actual content (not just whitespace)
    if (task.trim()) {
      // Create a new task object with unique ID and the text from input
      // Use spread operator (...) to keep existing tasks and add the new one
      // Date.now() creates a unique timestamp ID converted to string
      setTasks([...tasks, { id: Date.now().toString(), text: task }]);
      // Clear the input field after adding the task
      setTask('');
    }
  };

  // FUNCTION: Remove a specific task from the list
  const deleteTask = (id) => {
    // Filter out the task with the matching ID
    // This creates a new array without the deleted task
    setTasks(tasks.filter((item) => item.id !== id));
  };

  // FUNCTION: Remove all tasks from the list
  const clearTasks = () => {
    // Set tasks array back to empty
    setTasks([]);
  };

  // RENDER METHOD - This returns the JSX that creates the user interface
  return (
    // SafeAreaView: Ensures content doesn't overlap with device status bars
    // Uses the container style defined below
    <SafeAreaView style={styles.container}>

      {/* TITLE SECTION */}
      {/* Text component displays the app title with custom styling */}
      <Text style={styles.title}>Task Manager</Text>

      {/* INPUT SECTION */}
      {/* View acts as a container for the input field and add button */}
      <View style={styles.inputContainer}>

        {/* TextInput: where users type their tasks */}
        <TextInput
          style={styles.input}           // Custom styling for the input
          placeholder="Enter a task"     // Gray text shown when input is empty
          value={task}                   // Controlled component - shows current task state
          onChangeText={setTask}         // Updates task state when user types
        />

        {/* ADD BUTTON */}
        {/* TouchableOpacity: makes the button respond to user touches */}
        <TouchableOpacity
          style={styles.addButton}       // Custom button styling
          onPress={addTask}              // Calls addTask function when pressed
        >
          {/* Text inside the button */}
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* TASK LIST SECTION */}
      {/* FlatList: optimized component for displaying scrollable lists */}
      <FlatList
        data={tasks}                     // The array of tasks to display
        keyExtractor={(item) => item.id} // Tells React how to identify each item uniquely
        renderItem={({ item }) => (      // Function that defines how each task looks

          // INDIVIDUAL TASK CONTAINER
          <View style={styles.taskContainer}>

            {/* Task text display */}
            <Text style={styles.taskText}>{item.text}</Text>

            {/* DELETE BUTTON for each task */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)} // Calls deleteTask with this task's ID
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* CLEAR ALL BUTTON */}
      {/* This button only shows when there are tasks (conditional rendering) */}
      {tasks.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearTasks}           // Calls clearTasks function
        >
          <Text style={styles.clearButtonText}>Clear All Tasks</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

// STYLING SECTION
// StyleSheet.create() optimizes the styles for performance
const styles = StyleSheet.create({

  // MAIN CONTAINER STYLE
  // Applied to the SafeAreaView that wraps everything
  container: {
    flex: 1,                    // Takes up full screen height
    padding: 40,                // 40 units of padding on all sides
    backgroundColor: '#f8f8f8', // Light gray background color
  },

  // TITLE STYLE
  // Applied to the "Task Manager" text at the top
  title: {
    fontSize: 20,               // Large text size
    fontWeight: 'bold',         // Makes text bold
    marginBottom: 10,           // Space below the title
    textAlign: 'center',        // Centers the text horizontally
  },

  // INPUT CONTAINER STYLE
  // Applied to the View that holds the text input and add button
  inputContainer: {
    flexDirection: 'row',       // Arranges children horizontally (side by side)
    marginBottom: 20,           // Space below this section
  },

  // TEXT INPUT STYLE
  // Applied to the TextInput where users type tasks
  input: {
    flex: 1,                    // Takes up remaining space in the row
    borderWidth: 1,             // 1 unit border thickness
    borderColor: '#ccc',        // Light gray border color
    borderRadius: 5,            // Rounded corners
    padding: 10,                // Internal padding for text
    marginRight: 10,            // Space between input and add button
  },

  // ADD BUTTON STYLE
  // Applied to the TouchableOpacity add button
  addButton: {
    backgroundColor: '#28a745',  // Green background color
    padding: 10,                 // Internal padding
    borderRadius: 5,             // Rounded corners
  },

  // ADD BUTTON TEXT STYLE
  // Applied to the text inside the add button
  addButtonText: {
    color: 'white',              // White text color
    fontWeight: 'bold',          // Bold text
  },

  // INDIVIDUAL TASK CONTAINER STYLE
  // Applied to each task item in the list
  taskContainer: {
    flexDirection: 'row',        // Arranges task text and delete button horizontally
    justifyContent: 'space-between', // Pushes content to opposite ends
    alignItems: 'center',        // Centers content vertically
    backgroundColor: 'white',    // White background for each task
    padding: 15,                 // Internal padding
    marginBottom: 10,            // Space between task items
    borderRadius: 5,             // Rounded corners
    // SHADOW PROPERTIES (for depth effect)
    shadowColor: '#000',         // Black shadow
    shadowOffset: {
      width: 0,                  // No horizontal shadow offset
      height: 2,                 // 2 units vertical shadow offset
    },
    shadowOpacity: 0.1,          // Light shadow (10% opacity)
    shadowRadius: 3.84,          // Shadow blur radius
    elevation: 5,                // Android shadow elevation
  },

  // TASK TEXT STYLE
  // Applied to the text that displays each task
  taskText: {
    flex: 1,                     // Takes up available space
    fontSize: 16,                // Medium text size
  },

  // DELETE BUTTON STYLE
  // Applied to each delete button next to tasks
  deleteButton: {
    backgroundColor: '#dc3545',  // Red background color
    padding: 8,                  // Internal padding
    borderRadius: 5,             // Rounded corners
  },

  // DELETE BUTTON TEXT STYLE
  // Applied to text inside delete buttons
  deleteButtonText: {
    color: 'white',              // White text
    fontSize: 12,                // Small text size
    fontWeight: 'bold',          // Bold text
  },

  // CLEAR ALL BUTTON STYLE
  // Applied to the clear all tasks button at bottom
  clearButton: {
    backgroundColor: '#ffc107',  // Yellow/orange background
    padding: 15,                 // Internal padding
    borderRadius: 5,             // Rounded corners
    marginTop: 10,               // Space above the button
  },

  // CLEAR BUTTON TEXT STYLE
  // Applied to text inside the clear all button
  clearButtonText: {
    color: 'white',              // White text
    textAlign: 'center',         // Centers text horizontally
    fontWeight: 'bold',          // Bold text
  },
});

// Export the App component as the default export
// This allows other files to import and use this component
export default App;