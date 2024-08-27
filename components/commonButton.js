import React from "react";
import { StyleSheet, Text } from "react-native";
import { RNTouchable } from "./rNTouchable";
import { Fonts, Colors, Default } from "../constants/styles";

const CommonButton = (props) => {
  return (
    <RNTouchable style={styles.touchableStyle} onPress={() => props.onPress()}>
      <Text style={{ ...Fonts.Bold18white }}>{props.title}</Text>
    </RNTouchable>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  touchableStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.4,
    margin: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    ...Default.shadow,
  },
});
