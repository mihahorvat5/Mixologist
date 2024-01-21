import { StyleSheet } from "react-native";
import { RecipeCard } from "../../AppStyles";

const styles = StyleSheet.create({
  container: {
    ...RecipeCard.container,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 1,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    flexDirection: "column",
  },
  photo: {
    ...RecipeCard.photo,
    borderRadius: 10,
    width: "100%",
  },
  title: {
    ...RecipeCard.title,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4, // Adjust the marginTop value to reduce the space
    textAlign: "center",
  },
  category: {
    ...RecipeCard.category,
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default styles;
