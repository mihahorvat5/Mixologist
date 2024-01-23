import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00B1CC",
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    paddingHorizontal: 20,
    backgroundColor: "#00B1CC",
  },
  text: {
    color: "white", // Add this line to set text color to white
  },
});

export default styles;
