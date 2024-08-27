import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Fonts, Default, Colors } from "../constants/styles";
import { RNTouchable } from "./rNTouchable";
import Feather from "react-native-vector-icons/Feather";

const Header = (props) => {
  const { i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  return (
    <View
      style={{
        flexDirection: isRtl ? "row-reverse" : "row",
        ...styles.headerViewStyle,
      }}
    >
      <RNTouchable onPress={() => props.navigation.goBack()}>
        <Feather
          name={isRtl ? "arrow-right" : "arrow-left"}
          size={25}
          color={Colors.black}
        />
      </RNTouchable>
      <Text
        numberOfLines={1}
        style={{
          textAlign: isRtl ? "right" : "left",
          ...styles.titleTextStyle,
        }}
      >
        {props.title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerViewStyle: {
    zIndex: 1,
    alignItems: "center",
    padding: Default.fixPadding * 2,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  titleTextStyle: {
    flex: 1,
    overflow: "hidden",
    marginHorizontal: Default.fixPadding * 1.5,
    ...Fonts.Bold18black,
  },
});
