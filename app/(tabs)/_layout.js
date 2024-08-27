import React, { useCallback, useState } from "react";
import { Tabs } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  BackHandler,
  Platform,
} from "react-native";
import { Fonts, Colors, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import SnackbarToast from "../../components/snackbarToast";

export default function Layout() {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`layout:${key}`);
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

  const bottomTab = () => {
    return (
      <Tabs
        initialRouteName="findPool/findPoolScreen"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            ...styles.tabBarStyle,
          },
          tabBarItemStyle: {
            height: 65,
          },

          tabBarIcon: ({ focused }) => {
            if (route.name === "findPool/findPoolScreen") {
              return (
                <View style={styles.commonViewStyle}>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Image
                      source={require("../../assets/images/icons/icon1.png")}
                      style={{
                        tintColor: focused ? Colors.primary : Colors.grey,
                        ...styles.imageStyle,
                      }}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        ...(focused ? Fonts.Bold14primary : Fonts.Bold14grey),
                        ...styles.textStyle,
                      }}
                    >
                      {tr("findPool")}
                    </Text>
                  </View>
                </View>
              );
            } else if (route.name === "offerPool/offerPoolScreen") {
              return (
                <View style={styles.commonViewStyle}>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Image
                      source={require("../../assets/images/icons/icon2.png")}
                      style={{
                        tintColor: focused ? Colors.primary : Colors.grey,
                        ...styles.imageStyle,
                      }}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        ...(focused ? Fonts.Bold14primary : Fonts.Bold14grey),
                        ...styles.textStyle,
                      }}
                    >
                      {tr("offerPool")}
                    </Text>
                  </View>
                </View>
              );
            } else if (route.name === "myTrip/myTripScreen") {
              return (
                <View style={styles.commonViewStyle}>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Image
                      source={require("../../assets/images/icons/icon3.png")}
                      style={{
                        tintColor: focused ? Colors.primary : Colors.grey,
                        ...styles.imageStyle,
                      }}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        ...(focused ? Fonts.Bold14primary : Fonts.Bold14grey),
                        ...styles.textStyle,
                      }}
                    >
                      {tr("myTrip")}
                    </Text>
                  </View>
                </View>
              );
            } else if (route.name === "profile/profileScreen") {
              return (
                <View style={styles.commonViewStyle}>
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <MaterialIcons
                      size={24}
                      name="person-outline"
                      color={focused ? Colors.primary : Colors.grey}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        ...(focused ? Fonts.Bold14primary : Fonts.Bold14grey),
                        ...styles.textStyle,
                      }}
                    >
                      {tr("profile")}
                    </Text>
                  </View>
                </View>
              );
            }
          },
        })}
      >
        <Tabs.Screen
          name={isRtl ? "profile/profileScreen" : "findPool/findPoolScreen"}
        />
        <Tabs.Screen
          name={isRtl ? "myTrip/myTripScreen" : "offerPool/offerPoolScreen"}
        />
        <Tabs.Screen
          name={isRtl ? "offerPool/offerPoolScreen" : "myTrip/myTripScreen"}
        />
        <Tabs.Screen
          name={isRtl ? "findPool/findPoolScreen" : "profile/profileScreen"}
        />
      </Tabs>
    );
  };
  return (
    <>
      {bottomTab()}
      <SnackbarToast
        visible={visibleToast}
        title={tr("tapBack")}
        onDismiss={onDismissVisibleToast}
      />
    </>
  );
}
const styles = StyleSheet.create({
  commonViewStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarStyle: {
    height: 65,
    borderTopColor: Colors.transparent,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  imageStyle: {
    width: 22,
    height: 22,
  },
  textStyle: {
    overflow: "hidden",
    marginTop: Default.fixPadding * 0.5,
    marginHorizontal: Default.fixPadding * 0.4,
  },
});
