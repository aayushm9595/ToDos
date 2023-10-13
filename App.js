import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { NoteScreen } from "./NoteScreen/NoteScreen";
import { LaunchScreen } from "./LaunchScreen/LaunchScreen";
import { ToDoScreen } from "./ToDoScreen/ToDoScreen";
import { AuthScreen } from "./AuthScreen/AuthScreen";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const Stack = createNativeStackNavigator();

export const navigationRef = React.createRef();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Launch">
        <Stack.Screen name="Launch" component={LaunchScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="ToDo" component={ToDoScreen} />
        <Stack.Screen name="Note" component={NoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
