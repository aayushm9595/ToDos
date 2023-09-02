import * as SecureStore from "expo-secure-store";

// Function to load tasks from SecureStore
export const loadTasksFromStorage = async (setTasks) => {
  try {
    const savedTasks = await SecureStore.getItemAsync("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
};
// Use secure store to save task to persist tasks in next sessions
export const saveTasksToStorage = async (updatedTasks) => {
  try {
    await SecureStore.setItemAsync("tasks", JSON.stringify(updatedTasks));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
};