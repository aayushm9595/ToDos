import React from "react";
import { render, userEvent } from "@testing-library/react-native";
import { ToDoScreen } from "./ToDoScreen/ToDoScreen";

// jest.mock(
//   "react-native/Libraries/Components/Touchable/TouchableOpacity",
//   () => "TouchableOpacity",
// );

describe("ToDoScreen", () => {
  it("renders without crashing", () => {
    const { getByText, getByPlaceholderText } = render(<ToDoScreen />);
    expect(getByText("Notes")).toBeTruthy();
  });

  it("renders Add new note button", () => {
    const { getByTestId } = render(<ToDoScreen />);
    const addButton = getByTestId("add_task");
    expect(addButton).toBeTruthy();
  });

  it("clicking add new note button navigates to the Note screen", async () => {
    const navigationMock = { navigate: jest.fn() };
    const { getByTestId } = render(<ToDoScreen navigation={navigationMock} />);
    const addButton = getByTestId("add_task");
    const user = userEvent.setup();
    await user.press(addButton);
    expect(navigationMock.navigate).toHaveBeenCalledWith("Note", {
      saveTasks: expect.any(Function),
    });
  });

  it("renders a list of notes", () => {
    const tasks = ["Task 1", "Task 2", "Task 3"];
    const navigationMock = { navigate: jest.fn() };
    const { getByText } = render(
      <ToDoScreen navigation={navigationMock} propTasks={tasks} />,
    );
    tasks.forEach((task) => {
      const taskElement = getByText(task);
      expect(taskElement).toBeTruthy();
    });
  });

  it("delete a note", async () => {
    const tasks = ["Task 1", "Task 2", "Task 3"];
    const navigationMock = { navigate: jest.fn() };
    const { getByText, getByTestId, queryByText } = render(
      <ToDoScreen navigation={navigationMock} propTasks={tasks} />,
    );
    tasks.forEach((task) => {
      const taskElement = getByText(task);
      expect(taskElement).toBeTruthy();
    });
    const deleteButton = getByTestId("Delete_0");
    expect(deleteButton).toBeTruthy();
    const user = userEvent.setup();
    await user.press(deleteButton);
    expect(queryByText("Task 1")).toBeNull();
  });
});
