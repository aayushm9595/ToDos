import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textCenterAlign: { textAlign: "center" },
  loginText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  loginScreenButton: {
    marginRight: 40,
    marginLeft: 40,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex",
    height: 50,
    width: 300,
    backgroundColor: "#1E6738",
    borderRadius: 20,
    position: "absolute",
    bottom: 100,
  },
});
