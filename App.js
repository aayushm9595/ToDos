import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ToDoScreen } from './ToDoScreen';
import { AuthScreen } from './AuthScreen';

const Stack = createNativeStackNavigator();

export const navigationRef = React.createRef();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="ToDo" component={ToDoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
