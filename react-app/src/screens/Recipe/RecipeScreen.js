import React, { useLayoutEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import styles from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  getIngredientName,
  getCategoryName,
  getCategoryById,
  addOpenProduct,
  getIngredientsString, // Add this import
  getHowToMakeString, // Add this import
} from "../../data/MockDataAPI";
import BackButton from "../../components/BackButton/BackButton";
import ViewIngredientsButton from "../../components/ViewIngredientsButton/ViewIngredientsButton";
const { width: viewportWidth } = Dimensions.get("window");
import { addFavorite } from "../../firebase/firebaseService";
import Toast from 'react-native-toast-message';


export default function RecipeScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.item;
  const category = getCategoryById(item.categoryId);
  const title = getCategoryName(category.id);
  const [activeSlide, setActiveSlide] = useState(0);

  const slider1Ref = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
        marginTop: 10,
        backgroundColor: "transparent",
        color: "transparent",
      },
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  const onPressIngredient = (item) => {
    var name = getIngredientName(item);
    let ingredient = item;
    navigation.navigate("Ingredient");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>

        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
            <Carousel
              ref={slider1Ref}
              data={item.photosArray}
              renderItem={renderImage}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              firstItem={0}
              loop={false}
              autoplay={false}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={(index) => setActiveSlide(index)} // Update this line
            />
            <Pagination
              dotsLength={item.photosArray.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotColor="rgba(255, 255, 255, 0.92)"
              dotStyle={styles.paginationDot}
              inactiveDotColor="white"
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={slider1Ref.current}
              tappableDots={!!slider1Ref.current}
            />
          </View>
        </View>

        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.title}</Text>

          <View style={styles.infoContainer}>
            <TouchableHighlight
              onPress={() =>
                navigation.navigate("RecipesList", { category, title })
              }
            >
              <Text style={styles.category}>
                {getCategoryName(item.categoryId).toUpperCase()}
              </Text>
            </TouchableHighlight>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoRecipe}>{item.time}</Text>
          </View>

          <View style={styles.infoContainer}>
            <ViewIngredientsButton
              onPress={() => {
                const favoriteData = {
                  Name: item.title,
                  Ingredients: item.ingredients,
                  HowToMake: item.howToMake,
                  Category: getCategoryName(item.categoryId),
                  slike: item.photosArray
                };

                addFavorite(favoriteData);
                Toast.show({
                  type: 'success',
                  text1: 'Added to Favorites',
                  position: 'bottom',
                  text2: `${item.title} has been added to your favorites!`
                });
              }}
            />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.descriptionTitle}>INGREDIENTS</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>{item.ingredients}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.descriptionTitle}>HOW TO MAKE</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoDescriptionRecipe}>{item.howToMake}</Text>
          </View>
        </View>

      </ScrollView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
}
