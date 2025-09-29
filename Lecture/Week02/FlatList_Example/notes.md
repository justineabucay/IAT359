# FlatList
The app creates a simple todo list where users can add items that appear in a scrollable list below the input.
```js
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

const App = () => {
  const [item, setItem] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
      setItems([...items, item]);
      setItem('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter an item"
        value={item}
        onChangeText={setItem}
      />
      <Button title="Add Item" onPress={addItem} />
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style = {styles.listItemView}>
            <Text style={styles.listItem}>{item}</Text>
          </View>
        )       
        }
      />
    </View>
  );
};

export default App;

```

## State Management
```js
const [item, setItem] = useState('');
const [items, setItems] = useState([]);
```
- `item`: stores the current text being typed in the input field, which starts empty
- `items`: stores the array of all added items, which starts as an empty array

## Add Item Function
```js
const addItem = () => {
    setItems([...items, item]);  // Add current item to the array
    setItem('');                 // Clear the input field
};
```
- uses the spread operator `...items` to create a new array w/ all existing items
- add the current `item` to the end of that array
- clears the input field by setting `item` back to empty string

## UI Components
### TextInput
```js
<TextInput
  style={styles.input}
  placeholder="Enter an item"
  value={item}              // Shows current state value
  onChangeText={setItem}    // Updates state when user types
/>
```
- controlled input - its valus is always synced w/ the `item` state
- when user types, `setItem` updates the state

### FlatList
```js
<FlatList
  data={items}              // Uses the items array as data source
  renderItem={({ item }) => (
    <View style={styles.listItemView}>
      <Text style={styles.listItem}>{item}</Text>
    </View>
  )}
/>
```
- renders each string in the `items` array
- `{ item }` parameter is the current array element being rendered

## How It Works
- user types in the TextInput -> `item` state updates
- user presses "Add Item" button -> `addItem()` function runs
- current `item` gets added to `items` array
- input field gets cleared
- FlatList automatically re-renders to show the neew item
- process repeats for each new item