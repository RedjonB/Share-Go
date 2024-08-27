import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import { RNTouchable } from "../../components/rNTouchable";

const { width } = Dimensions.get("window");

const TripCompletedScreen = () => {
  const navigation = useNavigation();

  const { t } = useTranslation();

  function tr(key) {
    return t(`tripCompletedScreen:${key}`);
  }

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      navigation.navigate("findPool/findPoolScreen");
    });
  }, []);

  const imageContainer = () => {
    return (
      <View style={styles.containerStyle}>
        <Image
          source={require("../../assets/images/ride.png")}
          style={styles.imageStyle}
        />
        <Text
          style={{ ...Fonts.Bold20primary, marginBottom: Default.fixPadding }}
        >
          {tr("tripCompleted")}
        </Text>
        <Text style={{ ...Fonts.SemiBold15grey, textAlign: "center" }}>
          {tr("yourTripCompleted")}
          <Text style={{ ...Fonts.SemiBold15primary }}>{` $34.50 `}</Text>
          {tr("fromThisTrip")}
        </Text>
      </View>
    );
  };

  const backToHomeTouchable = () => {
    return (
      <RNTouchable
        onPress={() => navigation.navigate("findPool/findPoolScreen")}
        style={styles.backTouchableStyle}
      >
        <Text style={{ ...Fonts.Bold16primary }}>{tr("backHome")}</Text>
      </RNTouchable>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View style={styles.mainViewStyle}>
        {imageContainer()}
        {backToHomeTouchable()}
      </View>
    </View>
  );
};

export default TripCompletedScreen;

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 2,
  },
  imageStyle: {
    resizeMode: "contain",
    width: width * 0.8,
    height: 177,
    marginBottom: Default.fixPadding * 2,
  },
  backTouchableStyle: {
    alignSelf: "center",
    margin: Default.fixPadding * 1.3,
  },
});
