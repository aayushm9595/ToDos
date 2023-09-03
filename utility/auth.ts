import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { Platform, Linking } from "react-native";
export type LocalAuthenticationResult =
  | { success: true }
  | { success: false; error: string; warning?: string };

export const goToSettings = () => {
  if (Platform.OS === "ios") {
    Linking.openURL("App-Prefs:PASSCODE");
  } else if (Platform.OS === "android") {
    Linking.sendIntent("android.settings.SECURITY_SETTINGS");
  }
};
export const promptForAuthentication = async (setAuthenticationResults) => {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with biometric",
      fallbackLabel: "Enter custom passcode",
    });
    setAuthenticationResults(result);
  } catch (error) {
    console.error("Error during authentication:", error);
  }
  await SecureStore.setItemAsync(
    "lastActiveTime",
    new Date().getTime().toString()
  );
};

export const checkAuthentication = async (setAuthenticationResults) => {
  // Check if the app was in the background for more than 5 seconds
  const backgroundTime = 5 * 1000; // 5 seconds
  const currentTime = new Date().getTime();
  const lastActiveTime = await SecureStore.getItemAsync("lastActiveTime");
  if (
    !lastActiveTime ||
    currentTime - parseInt(lastActiveTime, 10) > backgroundTime
  ) {
    promptForAuthentication(setAuthenticationResults);
  }
  // Update the last active time
  await SecureStore.setItemAsync(
    "lastActiveTime",
    new Date().getTime().toString()
  );
};
