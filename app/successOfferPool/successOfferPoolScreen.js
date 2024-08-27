import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import { RNTouchable } from "../../components/rNTouchable";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const SuccessOfferPoolScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`successOfferPoolScreen:${key}`);
  }

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      navigation.navigate("offerPool/offerPoolScreen");
    });
  }, []);

  const header = () => {
    return (
      <View style={styles.headerViewStyle}>
        <RNTouchable
          onPress={() => navigation.navigate("offerPool/offerPoolScreen")}
          style={{
            alignSelf: isRtl ? "flex-end" : "flex-start",
          }}
        >
          <Feather
            name={isRtl ? "arrow-right" : "arrow-left"}
            size={25}
            color={Colors.black}
          />
        </RNTouchable>
      </View>
    );
  };

  const centerCircleAndTitle = () => {
    return (
      <View style={styles.containerStyle}>
        <LinearGradient
          colors={[Colors.primary, Colors.lightPrimary]}
          style={styles.mainViewCircle}
        >
          <View style={styles.subCircleView}>
            <LinearGradient
              colors={[Colors.primary, Colors.lightPrimary]}
              style={styles.linearGradientCircleStyle}
            >
              <Feather name="check" size={48} color={Colors.white} />
            </LinearGradient>
          </View>
        </LinearGradient>
        <Text style={styles.congratulationTextStyle}>
          {tr("congratulation")}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {centerCircleAndTitle()}
      </View>
    </View>
  );
};

export default SuccessOfferPoolScreen;

const styles = StyleSheet.create({
  headerViewStyle: {
    padding: Default.fixPadding * 2,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 2,
  },
  congratulationTextStyle: {
    textAlign: "center",
    ...Fonts.SemiBold17black,
    marginTop: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding * 4,
  },
  mainViewCircle: {
    justifyContent: "center",
    alignItems: "center",
    width: 114,
    height: 114,
    borderRadius: 57,
  },
  subCircleView: {
    justifyContent: "center",
    alignItems: "center",
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: Colors.regularGrey,
  },
  linearGradientCircleStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 88,
    height: 88,
    borderRadius: 44,
  },
});
