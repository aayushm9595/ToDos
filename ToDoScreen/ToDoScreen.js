import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native"; 
import Delete from '../Delete.svg';
import Edit from '../Edit.svg';
import { Styles } from "./Styles";
import { commonStyles } from "../Styles";
export const ToDoScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (taskText) {
      if (editIndex !== null) {
        // Edit existing task
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = taskText;
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        // Add new task
        setTasks([...tasks, taskText]);
      }
      setTaskText("");
    }
  };

  const ToDoItem = ({ index, item }) => {
    return (
      <View style={Styles.taskItem}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.text}>{item}</Text>
        <View style={Styles.row}>
        <TouchableOpacity onPress={() => editTask(index)}>
          <Edit width="30" height="30" marginRight={10}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTask(index)}>
          <Delete width="30" height="30" />
        </TouchableOpacity>
        </View>
      </View>
    );
  };

  let btnStyle = taskText === "" ? [commonStyles.ctaBtn, Styles.paddingTen, Styles.bgOpacity] : [commonStyles.ctaBtn, Styles.paddingTen] 
  const editTask = (index) => {
    // Set the text input to the task text for editing
    setTaskText(tasks[index]);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.header}>To-Do List</Text>
      <TextInput
        style={Styles.input}
        placeholder="Enter a task"
        placeholderTextColor={"black"}
        value={taskText}
        onChangeText={(text) => setTaskText(text)}
      />
      <TouchableOpacity
        style={btnStyle}
        disabled={taskText === ""}
        onPress={addTask}
      >
        <Text style={commonStyles.ctaText}>
          {editIndex !== null ? "Update" : "Add Task"}
        </Text>
      </TouchableOpacity>
      <FlatList
        style={commonStyles.mt10}
        data={tasks}
        renderItem={({ item, index }) => <ToDoItem item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
