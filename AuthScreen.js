import { useEffect, useState } from "react";
import { Platform, Linking, View, TouchableOpacity, AppState, Text } from "react-native";
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import {Styles as styles} from './Styles';
export const AuthScreen = ({navigation, route}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticationError, setAuthenticationError] = useState('');

  const navigateToToDo =  () => {
    navigation.navigate('ToDo');
  };
  
  const promptForAuthentication = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with biometric',
        fallbackLabel: 'Enter custom passcode',
      });
      setIsAuthenticated(result.success);
      setAuthenticationError(result.error);
    } catch (error) {
      console.error('Error during authentication:', error);
    }
    await SecureStore.setItemAsync('lastActiveTime', new Date().getTime().toString());
  };

  const checkAuthentication = async () => {
      // Check if the app was in the background for more than 5 seconds
      const backgroundTime = 5 * 1000; // 5 seconds
      const currentTime = new Date().getTime();
      const lastActiveTime = await SecureStore.getItemAsync('lastActiveTime');
      if (!lastActiveTime || currentTime - parseInt(lastActiveTime, 10) > backgroundTime) {
        promptForAuthentication();
      }
    // Update the last active time
    await SecureStore.setItemAsync('lastActiveTime', new Date().getTime().toString());
  };

  useEffect(() => {
    // Check authentication when the app is focused
    promptForAuthentication();
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

    useEffect(() => {
      if(isAuthenticated) {
        navigation.navigate('ToDo')
      }
      else {
        navigation.popToTop();
      }
    }, [isAuthenticated])
  
    const goToSettings = () => {
      if (Platform.OS === 'ios') {
        Linking.openURL('App-Prefs:PASSCODE');
      } else if (Platform.OS === 'android') {
        Linking.sendIntent('android.settings.SECURITY_SETTINGS');
      }
    };
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {(authenticationError === 'passcode_not_set' || authenticationError === 'not_enrolled') && (
          <>
            <Text style={{ textAlign: 'center' }}> To use the app you must set a screen lock</Text>
            <TouchableOpacity style={styles.loginScreenButton} underlayColor="white" accessibilityLabel="Set pin or passcode" onPress={goToSettings}>
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
        {
          isAuthenticated && (
            <>
            <TouchableOpacity style={styles.loginScreenButton} underlayColor="white"  onPress={navigateToToDo}>
              <Text style={styles.loginText}>Proceed</Text>
            </TouchableOpacity>
          </>
          )
        }
      </View>
    );
  };