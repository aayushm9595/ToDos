import { useEffect, useState } from "react";
import { View, TouchableOpacity, AppState, Text } from "react-native";
import { Styles } from "./Styles";
import { commonStyles } from "../Styles";
import {
  checkAuthentication,
  promptForAuthentication,
  goToSettings,
} from "../utility/auth";
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
    <View style={Styles.parentView}>
      {(authenticationError === "passcode_not_set" ||
        authenticationError === "not_enrolled") && (
        <>
          <Text style={Styles.textCenterAlign}>
            To use the app you must set a screen lock
          </Text>
          <TouchableOpacity
            style={[Styles.loginScreenButton, commonStyles.ctaBtn]}
            underlayColor="white"
            accessibilityLabel="Set pin or passcode"
            onPress={goToSettings}
          >
            <Text style={commonStyles.ctaText}>
              Go to Settings (Set Pin/Passcode)
            </Text>
          </TouchableOpacity>
        </>
      )}
      {authenticationError === "user_cancel" && (
        <>
          <Text style={Styles.textCenterAlign}>Authenticate to proceed</Text>
          <TouchableOpacity
            style={[Styles.loginScreenButton, commonStyles.ctaBtn]}
            underlayColor="white"
            accessibilityLabel="Authenticate to Proceed"
            onPress={callAuthenticateAction}
          >
            <Text style={commonStyles.ctaText}>Authenticate</Text>
          </TouchableOpacity>
        </>
      )}
      {isAuthenticated && (
        <>
          <TouchableOpacity
            style={[Styles.loginScreenButton, commonStyles.ctaBtn]}
            underlayColor="white"
            onPress={navigateToToDo}
          >
            <Text style={commonStyles.ctaText}>Proceed</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
