import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { RNTouchable } from "../../components/rNTouchable";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const SuccessTransactionScreen = () => {
  const navigation = useNavigation();
  const { key } = useLocalSearchParams();

  const { t } = useTranslation();

  function tr(key) {
    return t(`successTransactionScreen:${key}`);
  }

  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      navigation.navigate("findPool/findPoolScreen");
    });
  }, []);

  const centerCircleAndTitle = () => {
    return (
      <View style={styles.containerStyle}>
        <View style={{ alignItems: "center" }}>
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
          <Text
            style={{
              ...Fonts.Bold18primary,
              marginTop: Default.fixPadding * 2,
            }}
          >{`$110.00 ${key === "1" ? tr("added") : tr("sended")}`}</Text>
          <Text style={styles.congratulationTextStyle}>
            {key === "1" ? tr("congratulation") : tr("sendCongratulation")}
          </Text>
        </View>
        <RNTouchable
          onPress={() => navigation.navigate("findPool/findPoolScreen")}
          style={styles.backHomeTouchableStyle}
        >
          <Text
            numberOfLines={1}
            style={{ ...Fonts.Bold16primary, overflow: "hidden" }}
          >
            {tr("backHome")}
          </Text>
        </RNTouchable>
      </View>
    );
  };

  const havingIssue = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("helpSupport/helpSupportScreen")}
        style={{
          alignSelf: "center",
          margin: Default.fixPadding * 1.5,
        }}
      >
        <Text
          numberOfLines={1}
          style={{ ...Fonts.SemiBold15grey, overflow: "hidden" }}
        >
          {tr("havingIssue")}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {centerCircleAndTitle()}
        {havingIssue()}
      </View>
    </View>
  );
};

export default SuccessTransactionScreen;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: Default.fixPadding * 2,
  },
  congratulationTextStyle: {
    textAlign: "center",
    ...Fonts.SemiBold16grey,
    marginTop: Default.fixPadding * 0.5,
    marginHorizontal: Default.fixPadding,
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
  backHomeTouchableStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Default.fixPadding * 3,
    padding: Default.fixPadding * 1.4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.regularGrey,
  },
});
