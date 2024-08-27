import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MyStatusBar from "../components/myStatusBar";
import { Colors, Default, Fonts } from "../constants/styles";
import { useNavigation } from "expo-router";

const SplashScreen = () => {
  const navigation = useNavigation();

  setTimeout(() => {
    navigation.navigate("onboarding/onboardingScreen");
  }, 2000);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary }}>
      <MyStatusBar />
      <View style={styles.containerStyle}>
        <Image
          source={require("../assets/images/appIcon.png")}
          style={styles.imageStyle}
        />
        <Text style={Fonts.SemiBold28white}>Share & Go</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: 55,
    height: 52.79,
    marginBottom: Default.fixPadding * 0.3,
  },
});
