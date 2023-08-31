/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/react-in-jsx-scope */
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import {
  StyleSheet, Text, View, Button, TouchableOpacity,
} from 'react-native';

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

export default function App() {
  const [isBiometricSupported, setIsBioMetricSupported] = useState(false);
  const [isAuthenticated, setIsAutheticated] = useState(false);
  const [authenticationError, setAuthenticationError] = useState('');

  useEffect(() => {
    // const checkForBiometric = async () => {
    //   const compatible = await LocalAuthentication.hasHardwareAsync();
    //   // console.log('compatible', compatible);
    //   console.log(LocalAuthentication.SecurityLevel);
    //   setIsBioMetricSupported(compatible);
    // };
    // checkForBiometric();
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with biometric',
      fallbackLabel: 'Enter custom passcode',
    });
    auth.then((result) => {
      console.log('result', result);
      setIsAutheticated(result.success);
      setAuthenticationError(result.error);
    });
  }, []);

  function authenticate() {
    // const auth = LocalAuthentication.authenticateAsync({
    //   promptMessage: 'Authenticate with biometric',
    //   fallbackLabel: 'Enter custom passcode',
    // });
    // auth.then((result) => {
    //   setIsAutheticated(result.success);
    //   console.log(result);
    // });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {!isAuthenticated
      && (
        <TouchableOpacity style={styles.loginScreenButton} underlayColor="white" accessibilityLabel="Authenticate to Proceed">
          <Text style={styles.loginText}>Go to Settings</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
