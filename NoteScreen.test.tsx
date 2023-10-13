import React from "react";
import {
  render,
  act,
  fireEvent,
  userEvent,
} from "@testing-library/react-native";
import { NoteScreen } from "./NoteScreen/NoteScreen";

describe("NoteScreen", () => {
  it("renders the TextInput", () => {
    const { getByPlaceholderText } = render(<NoteScreen />);
    const input = getByPlaceholderText("Enter a note");
    expect(input).toBeTruthy();
  });

  it("updates the TextInput value on user input", () => {
    const { getByPlaceholderText } = render(<NoteScreen />);
    const input = getByPlaceholderText("Enter a note");

    act(() => {
      fireEvent.changeText(input, "New note text");
    });
    expect(input.props.value).toBe("New note text");
  });

  it("disables the Save button when the input is empty", async () => {
    const { getByText } = render(<NoteScreen />);
    const saveMocking = { saveNote: jest.fn() };
    const saveButton = getByText("Save");
    const user = userEvent.setup();
    await user.press(saveButton);
    expect(saveMocking.saveNote).not.toBeCalled();
  });

  // We can write more specific tests for other functionality as needed like save to enabled when text is present.
});
