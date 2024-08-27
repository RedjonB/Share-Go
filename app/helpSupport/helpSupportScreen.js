import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import Header from "../../components/header";
import CommonButton from "../../components/commonButton";

const { width } = Dimensions.get("window");

const HelpSupportScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`helpSupportScreen:${key}`);
  }

  const [name, setName] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [message, setMessage] = useState();

  const imageContainer = () => {
    return (
      <View style={styles.imageViewStyle}>
        <Image
          source={require("../../assets/images/help.png")}
          style={{ resizeMode: "cover", height: 186, width: width * 0.8 }}
        />
      </View>
    );
  };

  const nameTitleAndTextInput = () => {
    return (
      <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
        <Text
          style={{
            ...Fonts.SemiBold16black,
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {tr("name")}
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={tr("enterName")}
          placeholderTextColor={Colors.grey}
          selectionColor={Colors.primary}
          style={{
            textAlign: isRtl ? "right" : "left",
            ...styles.textInputStyle,
          }}
        />
      </View>
    );
  };

  const emailTitleAndTextInput = () => {
    return (
      <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
        <Text
          style={{
            ...Fonts.SemiBold16black,
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {tr("emailAddress")}
        </Text>
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
    );
  };

  const messageTitleAndTextInput = () => {
    return (
      <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
        <Text
          style={{
            ...Fonts.SemiBold16black,
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {tr("message")}
        </Text>
        <TextInput
          value={message}
          onChangeText={setMessage}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          placeholder={tr("writeMessageHere")}
          placeholderTextColor={Colors.grey}
          selectionColor={Colors.primary}
          style={{
            paddingTop: Default.fixPadding,
            height: 156,
            textAlign: isRtl ? "right" : "left",
            ...styles.textInputStyle,
          }}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <Header title={tr("helpSupport")} navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        {imageContainer()}
        {nameTitleAndTextInput()}
        {emailTitleAndTextInput()}
        {messageTitleAndTextInput()}
      </ScrollView>
      <CommonButton title={tr("submit")} onPress={() => navigation.goBack()} />
    </View>
  );
};

export default HelpSupportScreen;

const styles = StyleSheet.create({
  imageViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Default.fixPadding * 2.4,
  },
  textInputStyle: {
    ...Fonts.SemiBold16black,
    paddingVertical: Default.fixPadding * 1.5,
    paddingHorizontal: Default.fixPadding * 1.6,
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
