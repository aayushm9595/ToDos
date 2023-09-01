import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, AppState, Linking, Platform,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

const Stack = createNativeStackNavigator();

export const navigationRef = React.createRef();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  loginScreenButton: {
    marginRight: 40,
    marginLeft: 40,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    display: 'flex',
    height: 50,
    width: 300,
    backgroundColor: '#1E6738',
    borderRadius: 20,
    position: 'absolute',
    bottom: 100,
  },
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticationError, setAuthenticationError] = useState('');

  const promptForAuthentication = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with biometric',
        fallbackLabel: 'Enter custom passcode',
      });

      console.log('result', result);
      setIsAuthenticated(result.success);
      setAuthenticationError(result.error);
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  const checkAuthentication = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (hasHardware) {
      // Check if the app was in the background for more than 5 seconds
      const backgroundTime = 10 * 1000; // 10 seconds
      const currentTime = new Date().getTime();
      const lastActiveTime = await SecureStore.getItemAsync('lastActiveTime');

      if (!lastActiveTime || currentTime - parseInt(lastActiveTime, 10) > backgroundTime) {
        promptForAuthentication();
      }
    }
    // Update the last active time
    await SecureStore.setItemAsync('lastActiveTime', new Date().getTime().toString());
  };

  useEffect(() => {
    // Check authentication when the app is focused
    const appStateChangeHandler = async (nextAppState) => {
      if (nextAppState === 'active') {
        checkAuthentication();
      }
    };

    AppState.addEventListener('change', appStateChangeHandler);

    // Check authentication on initial app load
    checkAuthentication();

    // Cleanup the event listener
    return () => {
      AppState.removeEventListener('change', appStateChangeHandler);
    };
  }, []);

  const AuthScreen = () => {
    const isFocused = useIsFocused();

    const goToSettings = () => {
      if (Platform.OS === 'ios') {
        Linking.openURL('App-Prefs:PASSCODE');
      } else if (Platform.OS === 'android') {
        Linking.sendIntent('android.settings.SECURITY_SETTINGS');
      }
    };

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {((authenticationError === 'passcode_not_set' || authenticationError === 'not_enrolled') && isFocused) && (
          <>
            <Text style={{ textAlign: 'center' }}> To use the app you must set a screen lock</Text>
            <TouchableOpacity style={styles.loginScreenButton} underlayColor="white" accessibilityLabel="Authenticate to Proceed" onPress={goToSettings}>
              <Text style={styles.loginText}>Go to Settings (Set Pin/Passcode)</Text>
            </TouchableOpacity>
          </>
        )}
        {authenticationError === 'user_cancel' && (
          <>
              <Text style={{ textAlign: 'center' }}>Authenticate to proceed</Text>
            <TouchableOpacity style={styles.loginScreenButton} underlayColor="white" accessibilityLabel="Authenticate to Proceed" onPress={promptForAuthentication}>
              <Text style={styles.loginText}>Authenticate</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
