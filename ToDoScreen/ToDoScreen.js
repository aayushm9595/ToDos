import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native"; 
import * as SecureStore from "expo-secure-store";
import Delete from '../Delete.svg';
import Edit from '../Edit.svg';
import { Styles } from "./Styles";
import { commonStyles } from "../Styles";
export const ToDoScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  
  // Use `useEffect` to load tasks from SecureStore when the component mounts
  useEffect(() => {
    loadTasksFromStorage();
  }, []);

  // Function to load tasks from SecureStore
  const loadTasksFromStorage = async () => {
    try {
      const savedTasks = await SecureStore.getItemAsync('tasks');
      console.log('savedTasks', savedTasks);
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  // Use secure store to save task to persist tasks in next sessions
  const saveTasksToStorage = async (updatedTasks) => {
    try {
      await SecureStore.setItemAsync('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const btnStyle = useMemo(() => {
    return taskText === ""
      ? [commonStyles.ctaBtn, Styles.paddingTen, Styles.bgOpacity]
      : [commonStyles.ctaBtn, Styles.paddingTen];
  }, [taskText]);

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const editTask = (index) => {
    // Set the text input to the task text for editing
    setTaskText(tasks[index]);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    // Generate copy of new tasks from existing tasks and delete the task from copy to get new list of tasks
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const addOrUpdateTask = () => {
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


  // Single To DO item in the list which can be edited, deleted
  const ToDoItem = React.memo(({ index, item }) => {
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
  });

  
  

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
        onPress={addOrUpdateTask}
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
