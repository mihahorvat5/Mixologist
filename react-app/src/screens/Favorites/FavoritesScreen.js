import React, { useState, useEffect, useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getFavorites, deleteFavorites, deleteFavoriteById } from "../../firebase/firebaseService";

export default function FavoritesScreen(props) {
  const { navigation } = props;
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    const fetchFavorites = async () => {
      const fetchedFavorites = await getFavorites();
      setFavorites(fetchedFavorites);
    };

    fetchFavorites();
  }, []);

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
  }, []);

  const onPressRecipe = (item) => {
    deleteFavoriteById(item.id)
    //deleteFavorites('favorites');
  };

  const renderRecipes = ({ item}) => {
   

    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => onPressRecipe(item)}
      >
        <View style={styles.container}>
          <Image style={styles.photo} source={{uri: item.slike[0]}} />
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
};
