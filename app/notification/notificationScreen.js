import React, { useState } from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { SwipeListView } from "react-native-swipe-list-view";
import SnackbarToast from "../../components/snackbarToast";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import { Feather, Fontisto } from "@expo/vector-icons";
import Header from "../../components/header";

const NotificationScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`notificationScreen:${key}`);
  }

  const [removeNotificationToast, setRemoveNotificationToast] = useState(false);
  const onDismiss = () => setRemoveNotificationToast(false);

  const notificationList = [
    {
      key: "1",
      title: "New request",
      other:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero mattis a netus morbi",
      time: "2 min ago",
    },
    {
      key: "2",
      title: "Money added",
      other:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero mattis a netus morbi",
      time: "4min ago",
    },
    {
      key: "3",
      title: "Payment successfull",
      other:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero mattis a netus morbi",
      time: "4min ago",
    },
  ];

  const rowTranslateAnimatedValues = {};
  notificationList.forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
  });

  const [notification, setNotification] = useState(
    notificationList.map((notification, i) => ({
      key: `${i}`,
      title: notification.title,
      other: notification.other,
      time: notification.time,
    }))
  );

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (
      value < -Dimensions.get("window").width ||
      value > Dimensions.get("window").width
    ) {
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...notification];
        const prevIndex = notification.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        setNotification(newData);
        setRemoveNotificationToast(true);
      });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: Colors.regularGrey }}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.notificationViewStyle,
          }}
        >
          <View style={styles.bellCircleView}>
            <Fontisto name="bell" size={26} color={Colors.white} />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: isRtl ? "flex-end" : "flex-start",
              marginLeft: isRtl ? 0 : Default.fixPadding * 1.5,
              marginRight: isRtl ? Default.fixPadding * 1.5 : 0,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold16black, overflow: "hidden" }}
            >
              {item.title}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                ...Fonts.Medium14black,
                overflow: "hidden",
                textAlign: isRtl ? "right" : "left",
                marginVertical: Default.fixPadding * 0.5,
              }}
            >
              {item.other}
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold14grey, overflow: "hidden" }}
            >
              {item.time}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderHiddenItem = () => (
    <View style={styles.renderHiddenItemViewStyle} />
  );

  const emptyNotification = () => {
    return (
      <View style={styles.emptyNotificationViewStyle}>
        <Feather name="bell-off" size={40} color={Colors.grey} />
        <Text style={styles.noNotificationTextStyle}>
          {tr("noNotification")}
        </Text>
      </View>
    );
  };

  const notificationSwipeView = () => {
    return (
      <SwipeListView
        data={notification}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
        showsVerticalScrollIndicator={false}
        rightOpenValue={-Dimensions.get("window").width}
        leftOpenValue={Dimensions.get("window").width}
        contentContainerStyle={{ paddingTop: Default.fixPadding * 2 }}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={tr("notification")} navigation={navigation} />
        {notification.length === 0
          ? emptyNotification()
          : notificationSwipeView()}
      </View>
      <SnackbarToast
        title={tr("removed")}
        visible={removeNotificationToast}
        onDismiss={onDismiss}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  emptyNotificationViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 2,
  },
  noNotificationTextStyle: {
    marginTop: Default.fixPadding * 0.5,
    ...Fonts.Bold18grey,
  },
  notificationViewStyle: {
    alignItems: "center",
    padding: Default.fixPadding * 1.1,
    marginBottom: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  bellCircleView: {
    justifyContent: "center",
    alignItems: "center",
    width: 49,
    height: 49,
    borderRadius: 24.5,
    backgroundColor: Colors.primary,
  },
  renderHiddenItemViewStyle: {
    flex: 1,
    marginBottom: Default.fixPadding * 2,
    backgroundColor: Colors.red,
  },
});
