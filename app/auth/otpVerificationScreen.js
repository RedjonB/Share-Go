import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { Fonts, Colors, Default } from "../../constants/styles";
import CommonButton from "../../components/commonButton";
import { Ionicons } from "@expo/vector-icons";
import { RNTouchable } from "../../components/rNTouchable";
import { OtpInput } from "react-native-otp-entry";

const { width } = Dimensions.get("window");

const OtpVerificationScreen = () => {
  const router = useRouter();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`otpVerificationScreen:${key}`);
  }

  const [timer, setTimer] = useState(59);
  const [intervalStop, setIntervalStop] = useState(true);

  const intervalRef = useRef();

  useEffect(() => {
    if (intervalStop) {
      intervalRef.current = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        } else {
          clearInterval(intervalRef.current);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [timer, intervalStop]);

  const formatSecondsToTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

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
      <RNTouchable
        onPress={() => {
          setIntervalStop(false);
          router.back();
        }}
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
      </RNTouchable>
    );
  };

  const otpVerificationContainer = () => {
    return (
      <View style={styles.otpVerificationContainerStyle}>
        <Text style={Fonts.Bold22black}>{tr("oTPVerification")}</Text>
        <Text style={styles.confirmationTextStyle}>{`${tr(
          "confirmation"
        )} +355 1234567890`}</Text>
      </View>
    );
  };

  const otpInputView = () => {
    return (
      <View>
        <OtpInput
          numberOfDigits={4}
          onTextChange={(otp) => {
            if (otp.length === 4) {
              setIntervalStop(false);
              router.push("auth/uploadDocumentScreen");
            }
          }}
          theme={{
            containerStyle: styles.otpContainerStyle,
            pinCodeContainerStyle: styles.pinCodeContainerStyle,
            pinCodeTextStyle: Fonts.Bold18primary,
            focusedPinCodeContainerStyle: styles.focusedPinCodeContainerStyle,
            focusStickStyle: { backgroundColor: Colors.primary },
          }}
        />
      </View>
    );
  };

  const timerView = () => {
    return (
      <View style={styles.timerViewStyle}>
        <Text style={{ ...Fonts.Bold12primary }}>
          {formatSecondsToTime(timer)}
        </Text>
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
            {otpVerificationContainer()}
            {otpInputView()}
            {timerView()}

            <CommonButton
              title={tr("verify")}
              onPress={() => {
                setIntervalStop(false);
                router.push("auth/uploadDocumentScreen");
              }}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  imageViewStyle: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  otpVerificationContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding * 2,
  },
  confirmationTextStyle: {
    ...Fonts.Bold14grey,
    textAlign: "center",
    marginTop: Default.fixPadding * 0.5,
  },
  otpContainerStyle: {
    marginHorizontal: Default.fixPadding * 6,
    marginVertical: Default.fixPadding * 4,
  },
  pinCodeContainerStyle: {
    borderWidth: 0,
    width: 45,
    height: 45,
    borderRadius: 5,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  focusedPinCodeContainerStyle: {
    borderWidth: 0,
    borderRadius: 5,
  },
  timerViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: Default.fixPadding * 1.4,
    paddingVertical: Default.fixPadding * 0.5,
    marginBottom: Default.fixPadding * 2,
    borderRadius: 5,
    backgroundColor: Colors.pink,
  },
});
