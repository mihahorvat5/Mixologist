import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import MenuImage from "../../components/MenuImage/MenuImage";
import { recipes } from "../../data/dataArrays.js";
import { stringify } from '@firebase/util';
//import styles from "./styles";

export default function ScannerScreen(props) {

    const { navigation } = props;

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

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
    (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].code == `${data}`) {
        console.log(recipes[i].title);

        var item = recipes[i];
        var title = item.title;
      }
    }

    if (title == undefined){
      title = "Izdelek ne obstaja";
    }

    Alert.alert(
      "Skeniran izdelek",
      `${title}`,
      [
        {
          text: "Skeniraj ponovno",
          onPress: () => {
            console.log("Ponovno skeniranje");
            setScanned(false);
          },
          style: "cancel"
        },
        { text: "OK", onPress: () => {
            console.log("OK Pressed");
            if (item != undefined){
              navigation.navigate("Recipe", {item});
            }
            else{
              navigation.navigate("Home");
            }
            
        } }
      ]
    );
    };

    if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
    return <Text>No access to camera</Text>;
    }

    return (
    <View style={styles.container}>
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
