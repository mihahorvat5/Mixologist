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
  addOpenProduct
} from "../../data/MockDataAPI";
import BackButton from "../../components/BackButton/BackButton";
import ViewIngredientsButton from "../../components/ViewIngredientsButton/ViewIngredientsButton";
import starImage from './star.jpg';
import { stringify } from '@firebase/util';
import { initializeApp } from "firebase/app"
import { addDoc, collection, getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbMzm5VcdEZFNqPPOp1QGF89ylw5T9IUw",
  authDomain: "time-s-up-c057c.firebaseapp.com",
  projectId: "time-s-up-c057c",
  storageBucket: "time-s-up-c057c.appspot.com",
  messagingSenderId: "563808351599",
  appId: "1:563808351599:web:ac57a44e11998a1e7de49a",
  measurementId: "G-KF5LFY1MDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore()

const { width: viewportWidth } = Dimensions.get("window");

export default function RecipeScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.item;
  const category = getCategoryById(item.categoryId);
  const title = getCategoryName(category.id);
  const [activeSlide, setActiveSlide] = useState(0);

  const slider1Ref = useRef();
  

  const starPress = (num) => {
    const ref = doc(db, 'data', item.code)
    updateDoc(ref, {
      ocene: arrayUnion(num)
  });
    alert(
      "Uspešno ste ocenili izdelek!")
  }


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "true",
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
            onSnapToItem={(index) => setActiveSlide(0)}
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
              let date = new Date();
              let rokDatum = new Date(date.setMonth(date.getMonth()+item.trajanje));
              let rok = rokDatum.toISOString().slice(0,10);
              addOpenProduct(item.id,item.id,item.title,item.photo_url,rok,false)
              let ingredients = item.ingredients;
              let title = "Ingredients for " + item.title;
              navigation.navigate("Open products");
            }}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <TouchableHighlight onPress={() => starPress(1)}>
    <View style={{width: 25, height: 25}}>
        <Image style={{width: '100%', height: '100%'}} source={starImage} />
    </View>
    </TouchableHighlight><TouchableHighlight onPress={() => starPress(2)}>
    <View style={{width: 25, height: 25}}>
        <Image style={{width: '100%', height: '100%'}} source={starImage} />
    </View>
    </TouchableHighlight><TouchableHighlight onPress={() => starPress(3)}>
    <View style={{width: 25, height: 25}}>
        <Image style={{width: '100%', height: '100%'}} source={starImage} />
    </View>
    </TouchableHighlight><TouchableHighlight onPress={() => starPress(4)}>
    <View style={{width: 25, height: 25}}>
        <Image style={{width: '100%', height: '100%'}} source={starImage} />
    </View>
    </TouchableHighlight><TouchableHighlight onPress={() => starPress(5)}>
    <View style={{width: 25, height: 25}}>
        <Image style={{width: '100%', height: '100%'}} source={starImage} />
    </View>
    </TouchableHighlight>
</View>
      </View>
    </ScrollView>
  );
}
