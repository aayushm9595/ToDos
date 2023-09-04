import React from "react";
import {
  render,
  fireEvent,
  act,
  userEvent,
} from "@testing-library/react-native";
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

  it("adds a new task", async () => {
    const { getByText, getByPlaceholderText, getByTestId, getByA11yLabel } =
      render(<ToDoScreen />);

    const input = getByPlaceholderText("Enter a task");
    const addButton = getByTestId("add_task");
    // Simulate changing the text input
    act(() => {
      fireEvent.changeText(input, "New Task");
    });
    // Checking if the value in text input is changed with updated value
    expect(input.props.value).toBe("New Task");
    const user = userEvent.setup();
    // Simulate clicking the "Add Task" button
    await user.press(addButton);
    // Check if the new task is rendered
    expect(getByText("New Task")).toBeTruthy();
  });

  it("edits an existing task", async () => {
    const { getByPlaceholderText, getAllByTestId, getByTestId, getByText } =
      render(<ToDoScreen />);

    const input = getByPlaceholderText("Enter a task");
    const addButton = getByTestId("add_task");
    act(() => {
      fireEvent.changeText(input, "New Task 1");
    });
    const user = userEvent.setup();
    await user.press(addButton);
    const editButtons = getAllByTestId("Edit");
    await user.press(editButtons[0]);

    const updateButton = getByTestId("update");
    act(() => {
      fireEvent.changeText(input, "Updated Task");
    });
    await user.press(updateButton);

    expect(getByText("Updated Task")).toBeTruthy();
  });

  it("deletes a task", async () => {
    const { queryByText, getByPlaceholderText, getByTestId, getAllByTestId } =
      render(<ToDoScreen />);
    const user = userEvent.setup();
    const input = getByPlaceholderText("Enter a task");
    const addButton = getByTestId("add_task");
    act(() => {
      fireEvent.changeText(input, "Task to Delete");
    });
    await user.press(addButton);

    const deleteButtons = getAllByTestId("Delete");
    await user.press(deleteButtons[0]);

    expect(queryByText("Task to Delete")).toBeNull();
  });
});
