import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../../constants/styles";
import { RNTouchable } from "../../../components/rNTouchable";
import { useNavigation } from "expo-router";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`profileScreen:${key}`);
  }
  const [openLogoutModal, setOpenLogoutModal] = useState(false);

  const header = () => {
    return (
      <View style={styles.headerViewStyle}>
        <Text style={{ ...Fonts.Bold18primary }}>{tr("profile")}</Text>
      </View>
    );
  };

  const userDetails = () => {
    return (
      <View style={styles.userDetailViewStyle}>
        <Image
          source={require("../../../assets/images/users/user.png")}
          style={{ width: 70, height: 70, borderRadius: 35 }}
        />
        <Text style={styles.nameTextStyle}>Courtney Henry</Text>
        <Text style={{ ...Fonts.Bold14grey }}>+91 123456789</Text>
      </View>
    );
  };

  const walletTouchable = () => {
    return (
      <RNTouchable
        onPress={() => navigation.navigate("wallet/walletScreen")}
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          paddingLeft: isRtl
            ? Default.fixPadding * 0.9
            : Default.fixPadding * 1.5,
          paddingRight: isRtl
            ? Default.fixPadding * 1.5
            : Default.fixPadding * 0.9,
          ...styles.walletTouchableStyle,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="wallet-outline" size={18} color={Colors.primary} />
          <Text
            numberOfLines={1}
            style={{
              textAlign: isRtl ? "right" : "left",
              ...styles.walletTextStyle,
            }}
          >
            {tr("wallet")}
          </Text>
        </View>
        <Text numberOfLines={1} style={styles.priceTextStyle}>
          $110.00
        </Text>
      </RNTouchable>
    );
  };

  const data = [
    {
      key: "1",
      title: tr("editProfile"),
      icon: AntDesign,
      iconName: "user",
      navigateTo: "editProfile/editProfileScreen",
    },
    {
      key: "2",
      title: tr("myCar"),
      icon: Ionicons,
      iconName: "car-outline",
      navigateTo: "myCar/myCarScreen",
    },
    {
      key: "3",
      title: tr("rideHistory"),
      icon: MaterialCommunityIcons,
      iconName: "history",
      navigateTo: "rideHistory/rideHistoryScreen",
    },
    {
      key: "4",
      title: tr("language"),
      icon: Ionicons,
      iconName: "globe-outline",
      navigateTo: "language/languageScreen",
    },
    {
      key: "5",
      title: tr("termsCondition"),
      icon: MaterialCommunityIcons,
      iconName: "text-box-outline",
      navigateTo: "termsAndCondition/termsAndConditionScreen",
    },
    {
      key: "6",
      title: tr("privacyPolicy"),
      icon: Feather,
      iconName: "alert-circle",
      navigateTo: "privacyPolicy/privacyPolicyScreen",
    },
    {
      key: "7",
      title: tr("helpSupport"),
      icon: Feather,
      iconName: "help-circle",
      navigateTo: "helpSupport/helpSupportScreen",
    },
    {
      key: "8",
      title: tr("logout"),
      icon: Feather,
      iconName: "log-out",
    },
  ];

  const renderItem = () => {
    return (
      <View style={styles.whiteBoxViewStyle}>
        {data.map((item, index) => {
          const logoutIndex = data.length - 1 === index;

          return (
            <View
              key={item.key}
              style={{
                borderTopWidth: index === 0 ? 0 : 1,
                borderTopColor: Colors.greyOpacity40,
              }}
            >
              <RNTouchable
                onPress={() => {
                  if (logoutIndex) {
                    setOpenLogoutModal(true);
                  } else {
                    navigation.navigate(item.navigateTo);
                  }
                }}
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  ...styles.listOfTouchableStyle,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: isRtl ? "row-reverse" : "row",
                    alignItems: "center",
                  }}
                >
                  <item.icon
                    name={item.iconName}
                    size={18}
                    color={logoutIndex ? Colors.darkRed : Colors.black}
                  />

                  <Text
                    numberOfLines={1}
                    style={{
                      textAlign: isRtl ? "right" : "left",
                      ...(logoutIndex
                        ? Fonts.SemiBold16darkRed
                        : Fonts.SemiBold16black),
                      ...styles.textStyle,
                    }}
                  >
                    {item.title}
                  </Text>
                </View>

                {!logoutIndex && (
                  <Feather
                    name={isRtl ? "chevron-left" : "chevron-right"}
                    size={20}
                    color={Colors.black}
                  />
                )}
              </RNTouchable>
            </View>
          );
        })}
      </View>
    );
  };

  const logoutModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openLogoutModal}
        onRequestClose={() => setOpenLogoutModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setOpenLogoutModal(false)}
          style={{ flex: 1 }}
        >
          <View style={styles.modalBackViewStyle}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.modalTouchableStyle}
            >
              <Text style={styles.areYouSureTextStyle}>{tr("areYouSure")}</Text>
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignSelf: isRtl ? "flex-start" : "flex-end",
                }}
              >
                <TouchableOpacity onPress={() => setOpenLogoutModal(false)}>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.Bold18grey,
                      ...styles.modalCommonTextStyle,
                    }}
                  >
                    {tr("cancel")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setOpenLogoutModal(false);
                    navigation.push("auth/loginScreen");
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      marginLeft: isRtl ? 0 : Default.fixPadding * 3,
                      marginRight: isRtl ? Default.fixPadding * 3 : 0,
                      ...Fonts.Bold18primary,
                      ...styles.modalCommonTextStyle,
                    }}
                  >
                    {tr("logout")}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {userDetails()}
          {walletTouchable()}
          {renderItem()}
        </ScrollView>
        {logoutModal()}
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  headerViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 2.1,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  userDetailViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    margin: Default.fixPadding * 2,
  },
  nameTextStyle: {
    ...Fonts.Bold16black,
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 0.3,
  },
  walletTouchableStyle: {
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.5,
    marginBottom: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding * 2,
    borderStyle: "dashed",
    borderWidth: 0.9,
    borderColor: Colors.primary,
    borderRadius: 10,
  },
  walletTextStyle: {
    ...Fonts.SemiBold16primary,
    flex: 1,
    overflow: "hidden",
    marginHorizontal: Default.fixPadding,
  },
  priceTextStyle: {
    ...Fonts.Bold16primary,
    overflow: "hidden",
    maxWidth: 100,
  },
  textStyle: {
    flex: 1,
    overflow: "hidden",
    marginHorizontal: Default.fixPadding,
  },
  whiteBoxViewStyle: {
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  listOfTouchableStyle: {
    alignItems: "center",
    paddingTop: Default.fixPadding * 1.5,
    paddingBottom: Default.fixPadding * 2,
    paddingHorizontal: Default.fixPadding * 1.2,
  },
  modalTouchableStyle: {
    overflow: "hidden",
    width: width * 0.8,
    padding: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  modalBackViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.transparentBlack,
  },
  areYouSureTextStyle: {
    ...Fonts.SemiBold16black,
    textAlign: "center",
    marginBottom: Default.fixPadding * 2,
  },
  modalCommonTextStyle: {
    overflow: "hidden",
    maxWidth: 100,
  },
});
