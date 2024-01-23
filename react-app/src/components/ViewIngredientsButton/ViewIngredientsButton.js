import React, { useState } from "react";
import { TouchableHighlight, Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

export default function ViewIngredientsButton(props) {
  const [isPressed, setIsPressed] = useState(false);

  const buttonStyles = [
    styles.container,
    isPressed && styles.buttonPressed // Add this for pressed state style
  ];

  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={props.onPress}
      onShowUnderlay={() => setIsPressed(true)}
      onHideUnderlay={() => setIsPressed(false)}
    >
      <View style={buttonStyles}>
        <Text style={styles.text}>Add to favorites</Text>
      </View>
    </TouchableHighlight>
  );
}

ViewIngredientsButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};
