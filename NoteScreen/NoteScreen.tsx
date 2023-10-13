import React, { useState, useMemo } from "react";
import { Styles } from "./Styles";
import { commonStyles } from "../Styles";
import { View, TouchableOpacity, TextInput, Text } from "react-native";

export const NoteScreen = (props) => {
  const params = props.route?.params;
  const [taskText, setTaskText] = useState(params?.existingText || "");
  const btnStyle = useMemo(() => {
    return taskText === ""
      ? [commonStyles.ctaBtn, Styles.paddingTen, Styles.bgOpacity]
      : [commonStyles.ctaBtn, Styles.paddingTen];
  }, [taskText]);

  const addOrUpdateTask = () => {
    var index = params?.editIndex;
    if (typeof index === "number" && taskText) {
      params?.saveTasks(taskText, index);
    } else if (taskText) {
      params?.saveTasks(taskText);
    }
  };
  return (
    <View style={Styles.container}>
      <TextInput
        style={Styles.input}
        placeholder="Enter a note"
        placeholderTextColor={"black"}
        multiline={true}
        textAlignVertical="top"
        value={taskText}
        onChangeText={(text) => setTaskText(text)}
      />
      <TouchableOpacity
        style={btnStyle}
        testID={"add_task"}
        disabled={taskText === ""}
        onPress={addOrUpdateTask}
        accessibilityLabel={"Add new note"}
      >
        <Text style={commonStyles.ctaText}>{"Save"}</Text>
      </TouchableOpacity>
    </View>
  );
};
