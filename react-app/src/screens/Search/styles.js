import { StyleSheet } from "react-native";
import { RecipeCard } from "../../AppStyles";

const styles = StyleSheet.create({
  container: {
    ...RecipeCard.container,
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  photo: {
    ...RecipeCard.photo,
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  title: {
    ...RecipeCard.title,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  category: {
    ...RecipeCard.category,
    fontSize: 16,
    fontStyle: "italic",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 100,
    width: 200, // Adjust the width to make it slimmer
    justifyContent: "space-around",
    marginBottom: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: "black",
    margin: 10,
  },
  searchInput: {
    backgroundColor: "#EDEDED",
    color: "black",
    flex: 1, // Take remaining space
    height: 50,
    marginLeft: 10, // Add some margin to separate the input from icons
  },
});

export default styles;
