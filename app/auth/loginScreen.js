import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  BackHandler,
} from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { useTranslation } from "react-i18next";
import { Fonts, Colors, Default } from "../../constants/styles";
import IntlPhoneInput from "react-native-intl-phone-input";
import CommonButton from "../../components/commonButton";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import SnackbarToast from "../../components/snackbarToast";

const { width } = Dimensions.get("window");

const LoginScreen = () => {
  const router = useRouter();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`loginScreen:${key}`);
  }

  const [visibleToast, setVisibleToast] = useState(false);
  const onDismissVisibleToast = () => setVisibleToast(false);

  const [exitApp, setExitApp] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (Platform.OS === "android") {
          setTimeout(() => {
            setExitApp(0);
          }, 2000);

          if (exitApp === 0) {
            setExitApp(exitApp + 1);
            setVisibleToast(true);
          } else if (exitApp === 1) {
            BackHandler.exitApp();
          }
          return true;
        }
      };
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    }, [exitApp])
  );

  const screenBgImage = () => {
    return (
      <View style={styles.imageViewStyle}>
        <Image
          source={require("../../assets/images/bg.png")}
          style={{ width: width, height: 324 }}
        />
      </View>
    );
  };

  const loginContainer = () => {
    return (
      <View style={styles.titleWrapperStyle}>
        <Text style={{ ...Fonts.Bold22black }}>{tr("login")}</Text>
        <Text style={styles.welcomePleaseTextStyle}>{tr("welcomePlease")}</Text>
      </View>
    );
  };

  const mobileNumberAndTitle = () => {
    return (
      <View style={styles.mobileNumberWrapperStyle}>
        <Text
          style={{ ...Fonts.Bold16black, textAlign: isRtl ? "right" : "left" }}
        >
          {tr("mobileNumber")}
        </Text>

        <IntlPhoneInput
          placeholder={tr("enterMobileNumber")}
          placeholderTextColor={Colors.grey}
          defaultCountry="AL"
          filterText={tr("search")}
          closeText={tr("close")}
          flagStyle={{
            fontSize: 22,
          }}
          modalCountryItemCountryNameStyle={{
            ...Fonts.Bold15black,
          }}
          closeButtonStyle={styles.closeButtonStyle}
          dialCodeTextStyle={{
            fontSize: 0,
            ...(Platform.OS === "ios" && Fonts.Bold15black),
          }}
          containerStyle={{
            paddingVertical:
              Platform.OS === "ios"
                ? Default.fixPadding * 1.2
                : Default.fixPadding,
            ...styles.phoneNumberContainerStyle,
          }}
          phoneInputStyle={{
            textAlign: isRtl ? "right" : "left",
            paddingHorizontal: isRtl ? 0 : Default.fixPadding,
            ...styles.phoneInputStyle,
          }}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bgColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {screenBgImage()}
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          {loginContainer()}
          {mobileNumberAndTitle()}
          <CommonButton
            title={tr("login")}
            onPress={() => router.push("auth/registerScreen")}
          />
        </ScrollView>
      </View>
      <SnackbarToast
        visible={visibleToast}
        title={tr("tapBack")}
        onDismiss={onDismissVisibleToast}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  imageViewStyle: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  titleWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Default.fixPadding * 10,
    marginHorizontal: Default.fixPadding * 2,
  },
  welcomePleaseTextStyle: {
    ...Fonts.Bold14grey,
    textAlign: "center",
    maxWidth: "80%",
    marginTop: Default.fixPadding * 0.5,
  },
  mobileNumberWrapperStyle: {
    marginTop: Default.fixPadding * 5,
    marginHorizontal: Default.fixPadding * 2,
  },
  closeButtonStyle: {
    ...Fonts.Bold15black,
    backgroundColor: Colors.primary,
  },
  phoneNumberContainerStyle: {
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 2.6,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  phoneInputStyle: {
    ...Fonts.Bold15black,
    borderLeftWidth: 1,
    borderLeftColor: Colors.grey,
    marginLeft: Default.fixPadding,
  },
});
