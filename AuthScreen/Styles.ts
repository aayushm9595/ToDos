import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  parentView: { 
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textCenterAlign: { textAlign: "center" },
  loginScreenButton: {
    left: 20,
    right: 20,
    position: "absolute",
    bottom: 100,
  },
});
