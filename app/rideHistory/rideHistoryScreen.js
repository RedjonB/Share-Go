import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import Header from "../../components/header";
import { Feather, AntDesign } from "@expo/vector-icons";
import DashedLine from "react-native-dashed-line";
import Stars from "react-native-stars";

const { height } = Dimensions.get("window");

const RideHistoryScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`rideHistoryScreen:${key}`);
  }

  const [openRateSheet, setOpenRateSheet] = useState(false);
  const [reviewMessage, setReviewMessage] = useState();

  const rideHistoryList = [
    {
      key: "1",
      image: require("../../assets/images/users/user12.png"),
      name: "Wilson",
      date: "22 June ",
      time: "10 :30 pm",
      sourceLocation: "6391 Elgin St. Celina,",
      destinationLocation: "2464 Royal Ln. Mesa, ",
    },
    {
      key: "2",
      image: require("../../assets/images/users/user13.png"),
      name: "Elenora",
      date: "23 June",
      time: "11:30 pm",
      sourceLocation: "1901 Thornridge Cir. ",
      destinationLocation: "4517 Washington Ave.",
    },
    {
      key: "3",
      image: require("../../assets/images/users/user14.png"),
      name: "Jacob",
      date: "24 June ",
      time: "9:30 am",
      sourceLocation: "Gray St. Utica, Pennsylvania",
      destinationLocation: "Elgin St. Celina, Delaware ",
    },
    {
      key: "4",
      image: require("../../assets/images/users/user15.png"),
      name: "Jenny",
      date: "25 June ",
      time: "8:30 am",
      sourceLocation: "Elgin St. Celina, Delaware ",
      destinationLocation: "Washington Ave. Manchester",
    },
    {
      key: "5",
      image: require("../../assets/images/users/user16.png"),
      name: "Sojit",
      date: "26 june",
      time: "10:15 pm",
      sourceLocation: "Thornridge Cir. Shiloh,",
      destinationLocation: "4140 Parker Rd. Allentown, ",
    },
    {
      key: "6",
      image: require("../../assets/images/users/user6.png"),
      name: "jones",
      date: "26 June ",
      time: "10:30 pm",
      sourceLocation: "4140 Parker Rd. ",
      destinationLocation: "2715 Ash Dr. San Jose, ",
    },
    {
      key: "7",
      image: require("../../assets/images/users/user21.png"),
      name: "Lesli",
      date: "27 June",
      time: "11:20 pm",
      sourceLocation: "2972 Westheimer Rd. ",
      destinationLocation: "4140 Parker Rd. Allentown, ",
    },
    {
      key: "8",
      image: require("../../assets/images/users/user22.png"),
      name: "Jenny",
      date: "28 June ",
      time: "10:30 pm",
      sourceLocation: "6391 Elgin St. Celina, ",
      destinationLocation: "2464 Royal Ln. Mesa, ",
    },
    {
      key: "9",
      image: require("../../assets/images/users/user23.png"),
      name: "Robert",
      date: "28 June ",
      time: "8:30 am",
      sourceLocation: "6391 Elgin St. Celina, ",
      destinationLocation: "2464 Royal Ln. Mesa, ",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.renderItemViewStyle,
        }}
      >
        <View style={{ alignItems: "center", width: 42 }}>
          <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
            <Image
              source={item.image}
              style={{ width: 42, height: 42, borderRadius: 21 }}
            />
            <View style={styles.greenCheckMarkViewStyle}>
              <Feather name="check" size={10} color={Colors.white} />
            </View>
          </View>
          <Text numberOfLines={1} style={styles.userNameTextStyle}>
            {item.name}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: isRtl ? "flex-end" : "flex-start",
            marginLeft: isRtl ? Default.fixPadding : Default.fixPadding * 2.4,
            marginRight: isRtl ? Default.fixPadding * 2.4 : Default.fixPadding,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold14black,
              overflow: "hidden",
              marginBottom: Default.fixPadding * 0.6,
            }}
          >
            {`${item.date} | ${item.time}`}
          </Text>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginRight: isRtl ? 0 : Default.fixPadding * 0.9,
                marginLeft: isRtl ? Default.fixPadding * 0.9 : 0,
              }}
            >
              <View
                style={{
                  borderColor: Colors.green,
                  ...styles.circleViewStyle,
                }}
              />

              <DashedLine
                dashGap={2}
                dashLength={2}
                dashThickness={1.5}
                dashColor={Colors.grey}
                axis="vertical"
                style={{
                  height: 11,
                }}
              />

              <View
                style={{
                  borderColor: Colors.primary,
                  ...styles.circleViewStyle,
                }}
              />
            </View>
            <View
              style={{ flex: 1, alignItems: isRtl ? "flex-end" : "flex-start" }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold12grey,
                  overflow: "hidden",
                  marginBottom: Default.fixPadding,
                }}
              >
                {item.sourceLocation}
              </Text>
              <Text
                numberOfLines={1}
                style={{ ...Fonts.SemiBold12grey, overflow: "hidden" }}
              >
                {item.destinationLocation}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.rateUsTouchableStyle}
          onPress={() => setOpenRateSheet(true)}
        >
          <Text
            numberOfLines={1}
            style={{ ...Fonts.Bold15white, overflow: "hidden" }}
          >
            {tr("rateUs")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const rideHistoryFlatList = () => {
    return (
      <FlatList
        data={rideHistoryList}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: Default.fixPadding * 2 }}
      />
    );
  };

  const reviewTitleAndRating = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: Default.fixPadding * 3,
        }}
      >
        <Text style={styles.howWasTextStyle}>{tr("howWayYour")}</Text>

        <View style={{ marginVertical: Default.fixPadding * 3 }}>
          <Stars
            default={4}
            count={5}
            half={false}
            spacing={Default.fixPadding * 1.3}
            fullStar={
              <AntDesign name="star" size={40} color={Colors.lightYellow} />
            }
            emptyStar={
              <AntDesign name="star" size={40} color={Colors.greyOpacity50} />
            }
          />
        </View>
      </View>
    );
  };

  const reviewTextInput = () => {
    return (
      <TextInput
        value={reviewMessage}
        onChangeText={setReviewMessage}
        multiline={true}
        numberOfLines={5}
        textAlignVertical="top"
        placeholder={tr("saySomething")}
        placeholderTextColor={Colors.grey}
        selectionColor={Colors.primary}
        style={{
          textAlign: isRtl ? "right" : "left",
          paddingTop: Default.fixPadding,
          ...styles.textInputStyle,
        }}
      />
    );
  };

  const sheetButtons = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.sheetButtonsViewStyle,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: Colors.white,
            ...styles.cancelAndSendTouchableStyle,
          }}
          onPress={() => {
            setReviewMessage("");
            setOpenRateSheet(false);
          }}
        >
          <Text
            numberOfLines={1}
            style={{ ...Fonts.Bold18grey, overflow: "hidden" }}
          >
            {tr("cancel")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: Colors.primary,
            ...styles.cancelAndSendTouchableStyle,
          }}
          onPress={() => {
            setReviewMessage("");
            setOpenRateSheet(false);
          }}
        >
          <Text
            numberOfLines={1}
            style={{ ...Fonts.Bold18white, overflow: "hidden" }}
          >
            {tr("send")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const giveRateModalContainer = () => {
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={openRateSheet}
        onRequestClose={() => setOpenRateSheet(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setOpenRateSheet(false)}
          style={{ flex: 1, backgroundColor: Colors.transparentBlack }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: Colors.transparentBlack,
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : null}
              style={{
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <View style={styles.modalMainViewStyle}>
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      alignSelf: "center",
                      marginHorizontal: Default.fixPadding * 2,
                      marginBottom: Default.fixPadding * 0.2,
                    }}
                  >
                    <Text
                      style={{
                        ...Fonts.Bold20primary,
                      }}
                    >
                      {tr("rateYourRide")}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <TouchableWithoutFeedback>
                    <View>
                      {reviewTitleAndRating()}
                      {reviewTextInput()}
                    </View>
                  </TouchableWithoutFeedback>
                </ScrollView>
                {sheetButtons()}
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={tr("rideHistory")} navigation={navigation} />
        {rideHistoryFlatList()}
        {giveRateModalContainer()}
      </View>
    </View>
  );
};

export default RideHistoryScreen;

const styles = StyleSheet.create({
  renderItemViewStyle: {
    alignItems: "center",
    marginBottom: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding * 2,
    padding: Default.fixPadding * 0.9,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  rateUsTouchableStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Default.fixPadding * 0.6,
    paddingHorizontal: Default.fixPadding * 0.3,
    width: 78,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  userNameTextStyle: {
    ...Fonts.Bold12black,
    overflow: "hidden",
    marginTop: Default.fixPadding * 0.5,
  },
  greenCheckMarkViewStyle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.green,
  },
  circleViewStyle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 5.5,
    backgroundColor: Colors.white,
  },
  modalMainViewStyle: {
    maxHeight: height / 1.8,
    paddingTop: Default.fixPadding * 2.1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  howWasTextStyle: {
    ...Fonts.SemiBold14grey,
    textAlign: "center",
    marginTop: Default.fixPadding * 0.3,
  },
  textInputStyle: {
    height: 124,
    ...Fonts.SemiBold16black,
    paddingVertical: Default.fixPadding * 0.8,
    paddingHorizontal: Default.fixPadding * 1.1,
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 1.5,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  sheetButtonsViewStyle: {
    alignItems: "center",
    marginTop: Default.fixPadding * 1.5,
    marginBottom: Default.fixPadding * 2.5,
    marginHorizontal: Default.fixPadding,
  },
  cancelAndSendTouchableStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.1,
    marginHorizontal: Default.fixPadding,
    borderRadius: 5,
    ...Default.shadow,
  },
});
