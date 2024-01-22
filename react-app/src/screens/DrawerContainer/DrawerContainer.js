import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";

export default function DrawerContainer(props) {
  const { navigation } = props;
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="HOME"
          source={require("../../../assets/icons/home1.png")}
          onPress={() => {
            navigation.navigate("Home");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="CATEGORIES"
          source={require("../../../assets/icons/category2.png")}
          onPress={() => {
            navigation.navigate("Categories");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="FAVORITES"
          source={require("../../../assets/icons/cocktailList.png")}
          onPress={() => {
            navigation.navigate("Favorites");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="SEARCH"
          source={require("../../../assets/icons/search2.png")}
          onPress={() => {
            navigation.navigate("Search");
            navigation.closeDrawer();
          }}
        />
      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
