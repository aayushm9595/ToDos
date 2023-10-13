/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useMemo, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Delete from "../Delete.svg";
import Edit from "../Edit.svg";
import { Styles } from "./Styles";
import { commonStyles } from "../Styles";
import { loadTasksFromStorage, saveTasksToStorage } from "../utility/storage";
export const ToDoScreen = ({ navigation, propTasks }) => {
  const [tasks, setTasks] = useState(propTasks);

  // Use `useEffect` to load tasks from SecureStore when the component mounts
  useEffect(() => {
    loadTasksFromStorage(setTasks);
  }, []);

  const btnStyle = useMemo(() => {
    return [commonStyles.ctaBtn, Styles.paddingTen];
  }, []);

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const saveTasksToStore = (text, indexToUpdate) => {
    var updatedTasks = tasks ? [...tasks] : [];
    if (typeof indexToUpdate === "number") {
      updatedTasks[indexToUpdate] = text;
    } else {
      updatedTasks.push(text);
    }
    setTasks(updatedTasks);
  };
  const editTask = (index) => {
    // Set the text input to the task text for editing
    navigation.navigate("Note", {
      editIndex: index,
      existingText: tasks[index],
      saveTasks: saveTasksToStore,
    });
  };

  const deleteTask = (index) => {
    // Generate copy of new tasks from existing tasks and delete the task from copy to get new list of tasks
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const addOrUpdateTask = () => {
    navigation.navigate("Note", {
      saveTasks: saveTasksToStore,
    });
  };

  // Single To DO item in the list which can be edited, deleted
  const NoteItem = React.memo(({ index, item }: { index: any; item: any }) => {
    return (
      <View style={Styles.taskItem}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={Styles.text}>
          {item}
        </Text>
        <View style={Styles.row}>
          <TouchableOpacity testID="Edit" onPress={() => editTask(index)}>
            <Edit width="30" height="30" marginRight={10} />
          </TouchableOpacity>
          <TouchableOpacity
            testID={`Delete_${index}`}
            onPress={() => deleteTask(index)}
          >
            <Delete width="30" height="30" />
          </TouchableOpacity>
        </View>
      </View>
    );
  });

  return (
    <View style={Styles.container}>
      <Text style={Styles.header}>Notes</Text>
      <TouchableOpacity
        style={btnStyle}
        testID={"add_task"}
        onPress={addOrUpdateTask}
        accessibilityLabel={"Add new note"}
      >
        <Text style={commonStyles.ctaText}>{"Add new note"}</Text>
      </TouchableOpacity>
      <FlatList
        style={commonStyles.mt10}
        data={tasks}
        renderItem={({ item, index }) => <NoteItem item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
