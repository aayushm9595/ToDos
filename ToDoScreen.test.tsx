import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ToDoScreen } from "./ToDoScreen/ToDoScreen";

// jest.mock(
//   "react-native/Libraries/Components/Touchable/TouchableOpacity",
//   () => "TouchableOpacity",
// );

describe("ToDoScreen", () => {
  it("renders without crashing", () => {
    const { getByText, getByPlaceholderText } = render(<ToDoScreen />);
    expect(getByText("To-Do List")).toBeTruthy();
    expect(getByPlaceholderText("Enter a task")).toBeTruthy();
  });

  // it("adds a new task", async () => {
  //   const { getByText, getByPlaceholderText, getByTestId } = render(
  //     <ToDoScreen />,
  //   );

  //   const input = getByPlaceholderText("Enter a task");
  //   const addButton = getByTestId("Add Task");
  //   await waitFor(() => {
  //     expect(addButton).toBeTruthy();
  //   });
  //   console.log("addButton.", addButton);
  //   // Simulate changing the text input
  //   await waitFor(() => {
  //     fireEvent.changeText(input, "New Task");
  //   });
  //   console.log("addButton", addButton);
  //   // // Simulate clicking the "Add Task" button
  //   fireEvent.press(addButton);
  //   // Use fireEvent with 'press' for React Native components

  //   // // Check if the new task is rendered
  //   await waitFor(() => {
  //     expect(getByText("New Task")).toBeTruthy();
  //   });
  // });

  //   it('edits an existing task', () => {
  //     const { getByText, getAllByText, getByPlaceholderText } = render(<ToDoScreen />);

  //     const input = getByPlaceholderText('Enter a task');
  //     const addButton = getByText('Add Task');
  //     fireEvent.changeText(input, 'New Task 1');
  //     fireEvent.press(addButton);

  //     const editButton = getAllByText('Edit')[0];
  //     fireEvent.press(editButton);

  //     const updateButton = getByText('Update');
  //     fireEvent.changeText(input, 'Updated Task');
  //     fireEvent.press(updateButton);

  //     expect(getByText('Updated Task')).toBeTruthy();
  //   });

  //   it('deletes a task', () => {
  //     const { getByText, queryByText, getByPlaceholderText } = render(<ToDoScreen />);

  //     const input = getByPlaceholderText('Enter a task');
  //     const addButton = getByText('Add Task');
  //     fireEvent.changeText(input, 'Task to Delete');
  //     fireEvent.press(addButton);

  //     const deleteButton = getByText('Delete');
  //     fireEvent.press(deleteButton);

  //     expect(queryByText('Task to Delete')).toBeNull();
  //   });
});
