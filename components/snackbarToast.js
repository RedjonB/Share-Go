import React from "react";
import { Text, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { Colors, Fonts } from "../constants/styles";

const SnackbarToast = (props) => {
  return (
    <Snackbar
      visible={props.visible}
      onDismiss={props.onDismiss}
      duration={1500}
      style={{
        backgroundColor: Colors.black,
      }}
    >
      <Text numberOfLines={2} style={styles.titleTextStyle}>
        {props.title}
      </Text>
    </Snackbar>
  );
};

export default SnackbarToast;
const styles = StyleSheet.create({
  titleTextStyle: {
    ...Fonts.SemiBold14white,
    overflow: "hidden",
    textAlign: "center",
  },
});
