import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';
import { blue100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const ToDoScreen = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);
  const [selectedTodoId, setSelectedTodoId] = useState(null); // New state for selected item ID

  const handleAddTodo = () => {
    setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
    setTodo(""); // Clear input
  };

  const handleDeleteTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  const handleEditTodo = (todo) => {
    setEditedTodo(todo);
    setTodo(todo.title);
    setSelectedTodoId(todo.id); // Set the selected item ID
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todoList.map((item) => {
      if (item.id === editedTodo.id) {
        return { ...item, title: todo };
      }
      return item;
    });
    setTodoList(updatedTodos);
    setEditedTodo(null);
    setTodo("");
    setSelectedTodoId(null); // Reset the selected item ID
  };

  const renderTodos = ({ item }) => {
    const isSelected = item.id === selectedTodoId; // Check if this item is selected

    return (
      <View style={{
        backgroundColor: "#1e90ff",
        borderRadius: 6,
        paddingHorizontal: 6,
        paddingVertical: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        borderColor: isSelected ? "#ff6347" : "#1e90ff", // Change border color based on selection
        borderWidth: 2
      }}>
        <Text style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: "800",
          flex: 1
        }}>{item.title}</Text>

        <IconButton icon="pencil" iconColor='#fff' onPress={() => handleEditTodo(item)} />
        <IconButton icon="trash-can" iconColor='#fff' onPress={() => handleDeleteTodo(item.id)} />
      </View>
    );
  };

  return (
    <View style={{ marginHorizontal: 16 }}>
<Text style={{ 
        fontSize: 30, 
        fontWeight: 'bold', 
        marginVertical: 20, 
        textAlign: 'center',
        color:"blue"
      }}>TODO APP</Text>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "#1e90ff",
          borderRadius: 6,
          paddingVertical: 12,
          paddingHorizontal: 16,
          marginTop: 10,
        }}
        placeholder='Add a task'
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      />

      {editedTodo ?
        <TouchableOpacity style={{
          backgroundColor: "#000",
          borderRadius: 6,
          paddingVertical: 8,
          marginVertical: 34,
          alignItems: "center"
        }}
          onPress={() => handleUpdateTodo()}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>Save</Text>
        </TouchableOpacity> :
        <TouchableOpacity style={{
          backgroundColor: "#000",
          borderRadius: 6,
          paddingVertical: 8,
          marginVertical: 34,
          alignItems: "center"
        }}
          onPress={() => handleAddTodo()}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>Add</Text>
        </TouchableOpacity>
      }

      {/* Render to do list */}
      <FlatList data={todoList} renderItem={renderTodos} keyExtractor={item => item.id} />
    </View>
  );
};

export default ToDoScreen;

const styles = StyleSheet.create({});
