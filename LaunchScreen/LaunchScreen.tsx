import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Styles } from "./Styles";
import { commonStyles } from "../Styles";
export const LaunchScreen = ({ navigation }) => {
  const navigateToAuth = () => {
    navigation.navigate("Auth");
  };

  return (
    <View style={Styles.parentView}>
      <TouchableOpacity
        style={[Styles.loginScreenButton, commonStyles.ctaBtn]}
        accessibilityLabel="Authenticate"
        onPress={navigateToAuth}
      >
        <Text style={commonStyles.ctaText}>Authenticate</Text>
      </TouchableOpacity>
    </View>
  );
};
