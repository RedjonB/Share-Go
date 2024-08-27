import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import Header from "../../components/header";
import { Fontisto, Octicons } from "@expo/vector-icons";
import CommonButton from "../../components/commonButton";
import ChangePhotoBottomSheet from "../../components/changePhotoBottomSheet";

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`editProfileScreen:${key}`);
  }

  const [name, setName] = useState("Courtney henry");
  const [mobileNumber, setMobileNumber] = useState("+91 1234567890");
  const [emailAddress, setEmailAddress] = useState("courtney@example.com");
  const [changePhotoBottomSheet, setChangePhotoBottomSheet] = useState(false);
  const [bottomSheetTitle, setBottomSheetTitle] = useState();

  const userImage = () => {
    return (
      <View style={styles.imageViewStyle}>
        <Image
          source={require("../../assets/images/users/user.png")}
          style={{ width: 112, height: 112, borderRadius: 56 }}
        />
        <TouchableOpacity
          onPress={() => {
            setBottomSheetTitle(tr("profilePhoto"));
            setChangePhotoBottomSheet(true);
          }}
          style={{
            ...styles.cameraTouchableStyle,
            right: isRtl ? null : 0,
            left: isRtl ? 0 : null,
          }}
        >
          <Fontisto name="camera" size={18} color={Colors.primary} />
        </TouchableOpacity>
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

  const mobileNumberTitleAndTextInput = () => {
    return (
      <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
        <Text
          style={{
            ...Fonts.SemiBold16black,
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {tr("mobileNumber")}
        </Text>
        <TextInput
          value={mobileNumber}
          onChangeText={setMobileNumber}
          keyboardType="phone-pad"
          placeholder={tr("enterMobileNumber")}
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
          placeholder={tr("enterEmail")}
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

  const governmentIdTouchable = () => {
    return (
      <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
        <Text
          style={{
            ...Fonts.SemiBold16black,
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {tr("governmentId")}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setBottomSheetTitle(tr("governmentId"));
            setChangePhotoBottomSheet(true);
          }}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingVertical: Default.fixPadding * 1.6,
            ...styles.idAndLicenseTouchableStyle,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold16primary,
              flex: 1,
              textAlign: isRtl ? "right" : "left",
              overflow: "hidden",
            }}
          >
            GovermentId.pdf
          </Text>
          <Octicons name="check-circle-fill" size={16} color={Colors.green} />
        </TouchableOpacity>
      </View>
    );
  };

  const drivingLicenseTouchable = () => {
    return (
      <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
        <Text
          style={{
            ...Fonts.SemiBold16black,
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {tr("drivingLicense")}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setBottomSheetTitle(tr("drivingLicense"));
            setChangePhotoBottomSheet(true);
          }}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingVertical: Default.fixPadding * 1.6,
            ...styles.idAndLicenseTouchableStyle,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold16primary,
              flex: 1,
              textAlign: isRtl ? "right" : "left",
              overflow: "hidden",
            }}
          >
            Drivinglicence.jpg
          </Text>
          <Octicons name="check-circle-fill" size={16} color={Colors.green} />
        </TouchableOpacity>
      </View>
    );
  };

  const changeProfilePhotoBottomSheet = () => {
    return (
      <ChangePhotoBottomSheet
        title={bottomSheetTitle}
        visible={changePhotoBottomSheet}
        closeBottomSheet={() => setChangePhotoBottomSheet(false)}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <Header title={tr("editProfile")} navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        {userImage()}
        {nameTitleAndTextInput()}
        {mobileNumberTitleAndTextInput()}
        {emailTitleAndTextInput()}
        {governmentIdTouchable()}
        {drivingLicenseTouchable()}
      </ScrollView>
      <CommonButton title={tr("update")} onPress={() => navigation.goBack()} />
      {changeProfilePhotoBottomSheet()}
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  imageViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 3.6,
  },
  cameraTouchableStyle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
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
  idAndLicenseTouchableStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Default.fixPadding * 1.6,
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
