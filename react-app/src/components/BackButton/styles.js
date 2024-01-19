import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50, // Make it circular
    width: 50, // Set a fixed width
    height: 50, // Set a fixed height
    backgroundColor: "#876CFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginLeft: 30,
  },
  btnIcon: {
    height: 17,
    width: 17,
  },
});

export default styles;
