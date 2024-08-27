import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { Fonts, Colors, Default } from "../../constants/styles";
import CommonButton from "../../components/commonButton";
import { Ionicons } from "@expo/vector-icons";
import { Circle } from "react-native-animated-spinkit";
import ChangePhotoBottomSheet from "../../components/changePhotoBottomSheet";

const { width } = Dimensions.get("window");

const UploadDocumentScreen = () => {
  const router = useRouter();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`uploadDocumentScreen:${key}`);
  }

  const [loadingModal, setLoadingModal] = useState(false);

  const [uploadPhotoBottomSheet, setUploadPhotoBottomSheet] = useState(false);
  const [bottomSheetTitle, setBottomSheetTitle] = useState();

  const closeLoadingModal = () => {
    setLoadingModal(true);
    setTimeout(() => {
      setLoadingModal(false);
      router.push("findPool/findPoolScreen");
    }, 1500);
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

  const uploadDocumentTitle = () => {
    return (
      <View style={styles.titleViewStyle}>
        <Text style={{ ...Fonts.Bold22black, textAlign: "center" }}>
          {tr("uploadDocument")}
        </Text>
      </View>
    );
  };

  const drivingLicense = () => {
    return (
      <View
        style={{
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text style={{ ...Fonts.SemiBold18black, textAlign: "center" }}>
          {tr("drivingLicense")}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setBottomSheetTitle(tr("drivingLicense"));
            setUploadPhotoBottomSheet(true);
          }}
          style={styles.uploadLicenseTouchableStyle}
        >
          <Image
            source={require("../../assets/images/icons/camera.png")}
            style={styles.cameraImgStyle}
          />
          <Text style={{ ...Fonts.Bold14grey, textAlign: "center" }}>
            {tr("uploadDrivingLicense")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const governmentId = () => {
    return (
      <View
        style={{
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text style={{ ...Fonts.SemiBold18black, textAlign: "center" }}>
          {tr("governmentId")}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setBottomSheetTitle(tr("governmentId"));
            setUploadPhotoBottomSheet(true);
          }}
          style={styles.uploadLicenseTouchableStyle}
        >
          <Image
            source={require("../../assets/images/icons/camera.png")}
            style={styles.cameraImgStyle}
          />
          <Text style={{ ...Fonts.Bold14grey, textAlign: "center" }}>
            {tr("uploadAnyOne")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const uploadPhotoBottomSheetWrapper = () => {
    return (
      <ChangePhotoBottomSheet
        title={bottomSheetTitle}
        visible={uploadPhotoBottomSheet}
        closeBottomSheet={() => setUploadPhotoBottomSheet(false)}
      />
    );
  };

  const pleaseWaitLoadingModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={loadingModal}>
        <View style={styles.modalViewStyle}>
          <View style={styles.modalSubViewStyle}>
            <Circle size={40} color={Colors.primary} />
            <Text
              style={{
                ...Fonts.Bold18primary,
                marginTop: Default.fixPadding,
              }}
            >
              {tr("pleaseWait")}
            </Text>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bgColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {screenBgImage()}
        <View style={{ flex: 1 }}>
          {backTouchable()}
          <ScrollView showsVerticalScrollIndicator={false}>
            {uploadDocumentTitle()}
            {drivingLicense()}
            {governmentId()}
          </ScrollView>
          <CommonButton
            title={tr("continue")}
            onPress={() => closeLoadingModal()}
          />
        </View>
      </View>
      {pleaseWaitLoadingModal()}
      {uploadPhotoBottomSheetWrapper()}
    </View>
  );
};

export default UploadDocumentScreen;

const styles = StyleSheet.create({
  imageViewStyle: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  titleViewStyle: {
    marginTop: Default.fixPadding * 1.5,
    marginBottom: Default.fixPadding * 6.6,
    marginHorizontal: Default.fixPadding * 2,
  },
  uploadLicenseTouchableStyle: {
    justifyContent: "center",
    alignItems: "center",
    height: 144,
    padding: Default.fixPadding * 2,
    marginTop: Default.fixPadding * 1.5,
    marginBottom: Default.fixPadding * 2.9,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  cameraImgStyle: {
    width: 40,
    height: 40,
    marginBottom: Default.fixPadding * 1.3,
  },
  modalViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.transparentBlack,
  },
  modalSubViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.9,
    height: 145,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
