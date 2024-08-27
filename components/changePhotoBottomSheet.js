import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Default, Colors, Fonts } from "../constants/styles";
import { useTranslation } from "react-i18next";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheet } from "react-native-btr";

const ChangePhotoBottomSheet = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`changePhotoBottomSheet:${key}`);
  }

  const changeProfilePhotoBottomSheet = () => {
    return (
      <View style={styles.bottomSheetViewStyle}>
        <Text
          style={{
            ...Fonts.SemiBold18black,
            textAlign: "center",
            marginHorizontal: Default.fixPadding,
          }}
        >
          {`${tr("change")} ${props.title}`}
        </Text>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.bottomSheetTitleBottomViewStyle,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={props.closeBottomSheet}
            style={styles.circleTouchableStyle}
          >
            <View style={styles.bottomSheetCircleViewStyle}>
              <MaterialCommunityIcons
                name="camera"
                size={30}
                color={Colors.blue}
              />
            </View>
            <Text style={{ ...Fonts.Medium16black }}>{tr("camera")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={props.closeBottomSheet}
            style={styles.circleTouchableStyle}
          >
            <View style={styles.bottomSheetCircleViewStyle}>
              <MaterialCommunityIcons
                name="image-area"
                size={30}
                color={Colors.lightGreen}
              />
            </View>
            <Text style={{ ...Fonts.Medium16black }}>{tr("gallery")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            onPress={props.closeBottomSheet}
            style={styles.circleTouchableStyle}
          >
            <View style={styles.bottomSheetCircleViewStyle}>
              <MaterialCommunityIcons
                name="trash-can"
                size={30}
                color={Colors.lightRed}
              />
            </View>
            <Text style={{ ...Fonts.Medium16black }}>{tr("remove")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <BottomSheet
      visible={props.visible}
      onBackButtonPress={props.closeBottomSheet}
      onBackdropPress={props.closeBottomSheet}
    >
      {changeProfilePhotoBottomSheet()}
    </BottomSheet>
  );
};

export default ChangePhotoBottomSheet;

const styles = StyleSheet.create({
  bottomSheetViewStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: Default.fixPadding * 1.8,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  bottomSheetTitleBottomViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Default.fixPadding * 2.5,
  },
  bottomSheetCircleViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: Default.fixPadding,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  circleTouchableStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 0.5,
  },
});
