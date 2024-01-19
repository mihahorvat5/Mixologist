import { StyleSheet } from "react-native";
import { RecipeCard } from "../../AppStyles";

const styles = StyleSheet.create({
  container: {
    ...RecipeCard.container,
    borderWidth: 0, // Set border width to 0 to make the border invisible
    borderRadius: 10, // Add border radius for rounded corners
    padding: 10, // Add padding for better spacing
    marginBottom: 10, // Add margin bottom for better separation between items
  },
  photo: {
    ...RecipeCard.photo,
    borderRadius: 10, // Add border radius to the top of the image
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden", // Clip the image to the rounded border
  },
  title: {
    ...RecipeCard.title,
    fontSize: 18, // Adjust font size for the title
    fontWeight: "bold", // Make the title bold
    marginTop: 8, // Add some margin at the top
  },
  category: {
    ...RecipeCard.category,
    fontSize: 16, // Adjust font size for the category
    fontStyle: "italic", // Apply italic style to the category
  },
});

export default styles;
