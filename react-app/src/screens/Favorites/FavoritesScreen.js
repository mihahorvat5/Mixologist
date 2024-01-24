import React, { useState, useEffect, useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getFavorites, deleteFavoriteById } from "../../firebase/firebaseService";

export default function FavoritesScreen(props) {
  const { navigation } = props;
  const [favorites, setFavorites] = useState([]);
  const [isItemDeleted, setIsItemDeleted] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      const fetchedFavorites = await getFavorites();
      setFavorites(fetchedFavorites);
      setIsItemDeleted(false); // Resetiranje stanja obnovi FlatList
    };

    fetchFavorites();
  }, [isItemDeleted]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, [navigation]);

  const onPressRecipe = (item) => {
    deleteFavoriteById(item.id);
    setIsItemDeleted(true); // Nastavitev stanja, ko je izdelek izbrisan
  };

  const renderRecipes = ({ item }) => {
    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => onPressRecipe(item)}
      >
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.slike[0] }} />
          <BlurOverlay />
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const BlurOverlay = () => <View style={styles.blurOverlay} />;

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={favorites}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}
