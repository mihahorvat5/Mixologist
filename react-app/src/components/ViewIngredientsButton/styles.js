import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    width: 270,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100,
    borderColor: "#00B1CC",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: "#00B1CC",
    fontWeight: "bold",
  },
  buttonPressed: {
    backgroundColor: '#E0E0E0', 
  },
});

export default styles;
