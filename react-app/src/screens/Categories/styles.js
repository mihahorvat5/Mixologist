import { StyleSheet } from "react-native";
import { RecipeCard } from "../../AppStyles";

const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 215,
    borderRadius: 10, // Add border radius for rounded corners
    overflow: "hidden", // Clip the content to the rounded border
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  categoriesPhoto: {
    width: "100%",
    height: 155,
    borderRadius: 10, // Add border radius to the top of the image
    overflow: "hidden", // Clip the image to the rounded border
  },
  categoriesName: {
    fontSize: 18, // Adjust font size for the title
    fontWeight: "bold", // Make the title bold
    textAlign: "center",
    color: "#333333",
    marginTop: 8, // Add some margin at the top
  },
  categoriesInfo: {
    marginTop: 3,
    marginBottom: 5,
    fontSize: 16, // Adjust font size for the info
    fontStyle: "italic", // Apply italic style to the info
  },
});

export default styles;
