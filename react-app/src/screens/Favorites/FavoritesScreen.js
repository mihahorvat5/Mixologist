import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import { odprti } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import { getFavorites } from "../../firebase/firebaseService";
import { useState, useEffect } from "react";

export default function FavoritesScreen(props) {
    const { navigation } = props;
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        // Fetch favorites when component mounts
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

    //const onPressRecipe = (item) => {
    //  navigation.navigate("Recipe", { item });
    //};

    const renderRecipes = ({ item }) => (
        <View style={styles.container}>
      
            <Text style={styles.title}>{item.name}</Text>
        </View>
    );

    return (
        <View>
            {/* Use fetched data for the FlatList */}
            <FlatList
                vertical
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={favorites} // Use the fetched favorites data
                renderItem={renderRecipes}
                keyExtractor={(item) => `${item.id}`} // Use the document ID as the key
            />
        </View>
    );
}