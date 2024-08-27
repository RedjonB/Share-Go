import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
} from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { Fonts, Colors, Default } from "../../constants/styles";
import CommonButton from "../../components/commonButton";
import { Feather, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const RegisterScreen = () => {
  const router = useRouter();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`registerScreen:${key}`);
  }

  const [userName, setUserName] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [mobileNumber, setMobileNumber] = useState();

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

  const backTouchable = () => {
    return (
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          alignSelf: isRtl ? "flex-end" : "flex-start",
          margin: Default.fixPadding * 2,
        }}
      >
        <Ionicons
          name={isRtl ? "arrow-forward-outline" : "arrow-back-outline"}
          size={24}
          color={Colors.black}
        />
      </TouchableOpacity>
    );
  };

  const registerContainer = () => {
    return (
      <View style={styles.registerContainerStyle}>
        <Text style={{ ...Fonts.Bold22black }}>{tr("register")}</Text>
        <Text style={styles.welcomePleaseTextStyle}>{tr("welcomePlease")}</Text>
      </View>
    );
  };

  const userNameTitleAndTextInput = () => {
    return (
      <View
        style={{
          marginBottom: Default.fixPadding * 3,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text
          style={{ ...Fonts.Bold16black, textAlign: isRtl ? "right" : "left" }}
        >
          {tr("userName")}
        </Text>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingVertical:
              Platform.OS === "ios"
                ? Default.fixPadding * 1.5
                : Default.fixPadding * 1.2,
            ...styles.textInputViewStyle,
          }}
        >
          <Feather name="user" size={18} color={Colors.grey} />
          <TextInput
            value={userName}
            onChangeText={setUserName}
            placeholder={tr("enterUserName")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            style={{
              textAlign: isRtl ? "right" : "left",
              ...styles.textInputStyle,
            }}
          />
        </View>
      </View>
    );
  };

  const emailTitleAndTextInput = () => {
    return (
      <View
        style={{
          marginBottom: Default.fixPadding * 3,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text
          style={{ ...Fonts.Bold16black, textAlign: isRtl ? "right" : "left" }}
        >
          {tr("emailAddress")}
        </Text>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingVertical:
              Platform.OS === "ios"
                ? Default.fixPadding * 1.5
                : Default.fixPadding * 1.2,
            ...styles.textInputViewStyle,
          }}
        >
          <Feather name="mail" size={18} color={Colors.grey} />
          <TextInput
            value={emailAddress}
            onChangeText={setEmailAddress}
            keyboardType="email-address"
            placeholder={tr("enterEmailAddress")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            style={{
              textAlign: isRtl ? "right" : "left",
              ...styles.textInputStyle,
            }}
          />
        </View>
      </View>
    );
  };

  const mobileNumberTitleAndTextInput = () => {
    return (
      <View
        style={{
          marginHorizontal: Default.fixPadding * 2,
          marginBottom: Default.fixPadding * 2,
        }}
      >
        <Text
          style={{ ...Fonts.Bold16black, textAlign: isRtl ? "right" : "left" }}
        >
          {tr("mobileNumber")}
        </Text>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingVertical:
              Platform.OS === "ios"
                ? Default.fixPadding * 1.5
                : Default.fixPadding * 1.2,
            ...styles.textInputViewStyle,
          }}
        >
          <Feather name="phone" size={18} color={Colors.grey} />
          <TextInput
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="number-pad"
            placeholder={tr("enterMobileNumber")}
            placeholderTextColor={Colors.grey}
            selectionColor={Colors.primary}
            style={{
              textAlign: isRtl ? "right" : "left",
              ...styles.textInputStyle,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bgColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {screenBgImage()}
        <View style={{ flex: 1 }}>
          {backTouchable()}
          <ScrollView
            showsVerticalScrollIndicator={false}
            automaticallyAdjustKeyboardInsets={true}
          >
            {registerContainer()}
            {userNameTitleAndTextInput()}
            {emailTitleAndTextInput()}
            {mobileNumberTitleAndTextInput()}

            <CommonButton
              title={tr("register")}
              onPress={() => router.push("auth/otpVerificationScreen")}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  imageViewStyle: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  registerContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Default.fixPadding * 4,
    marginBottom: Default.fixPadding * 3,
    marginHorizontal: Default.fixPadding * 2,
  },
  welcomePleaseTextStyle: {
    ...Fonts.Bold14grey,
    textAlign: "center",
    maxWidth: "80%",
    marginTop: Default.fixPadding * 0.5,
  },
  textInputViewStyle: {
    alignItems: "center",
    marginTop: Default.fixPadding,
    paddingHorizontal: Default.fixPadding * 1.5,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  textInputStyle: {
    flex: 1,
    ...Fonts.Bold15black,
    marginHorizontal: Default.fixPadding,
  },
});
