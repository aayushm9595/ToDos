import { useEffect, useState } from "react";
import {
  Platform,
  Linking,
  View,
  TouchableOpacity,
  AppState,
  Text,
} from "react-native";
import { Styles as styles } from "./Styles";
import {
  checkAuthentication,
  promptForAuthentication,
  goToSettings,
} from "./utility/auth";
export const AuthScreen = ({ navigation, route }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticationError, setAuthenticationError] = useState("");

  const navigateToToDo = () => {
    navigation.navigate("ToDo");
  };

  const setAuthenticationResults = (result) => {
    setIsAuthenticated(result.success);
    setAuthenticationError(result.error);
  };

  useEffect(() => {
    // Check authentication when the app is focused
    promptForAuthentication(setAuthenticationResults);
    const appStateChangeHandler = async (nextAppState) => {
      if (nextAppState === "active") {
        checkAuthentication(setAuthenticationResults);
      }
    };

    AppState.addEventListener("change", appStateChangeHandler);

    // Check authentication on initial app load
    checkAuthentication(setAuthenticationResults);

    // Cleanup the event listener
    return () => {
      AppState.removeEventListener("change", appStateChangeHandler);
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.popToTop();
    }
  }, [isAuthenticated]);

  const callAuthenticateAction = () => {
    promptForAuthentication(setAuthenticationResults);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {(authenticationError === "passcode_not_set" ||
        authenticationError === "not_enrolled") && (
        <>
          <Text style={styles.textCenterAlign}>
            To use the app you must set a screen lock
          </Text>
          <TouchableOpacity
            style={styles.loginScreenButton}
            underlayColor="white"
            accessibilityLabel="Set pin or passcode"
            onPress={goToSettings}
          >
            <Text style={styles.loginText}>
              Go to Settings (Set Pin/Passcode)
            </Text>
          </TouchableOpacity>
        </>
      )}
      {authenticationError === "user_cancel" && (
        <>
          <Text style={styles.textCenterAlign}>Authenticate to proceed</Text>
          <TouchableOpacity
            style={styles.loginScreenButton}
            underlayColor="white"
            accessibilityLabel="Authenticate to Proceed"
            onPress={callAuthenticateAction}
          >
            <Text style={styles.loginText}>Authenticate</Text>
          </TouchableOpacity>
        </>
      )}
      {isAuthenticated && (
        <>
          <TouchableOpacity
            style={styles.loginScreenButton}
            underlayColor="white"
            onPress={navigateToToDo}
          >
            <Text style={styles.loginText}>Proceed</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
