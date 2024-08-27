import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../../constants/styles";
import { AntDesign, FontAwesome, Fontisto } from "@expo/vector-icons";
import { RNTouchable } from "../../../components/rNTouchable";
import DashedLine from "react-native-dashed-line";
import CommonButton from "../../../components/commonButton";
import { useLocalSearchParams, useNavigation } from "expo-router";
import DateAndTimeModal from "../../../components/dateAndTimeModal";
import { BottomSheet } from "react-native-btr";

const { width, height } = Dimensions.get("window");

const FindPoolScreen = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`findPoolScreen:${key}`);
  }

  const [openDateAndTimeModal, setOpenDateAndTimeModal] = useState(false);
  const [seatBottomSheet, setSeatBottomSheet] = useState(false);

  const [selectedDate, setSelectedDate] = useState();

  const [sourcePointLocation, setSourcePointLocation] = useState();
  const [desPointLocation, setDesPointLocation] = useState();

  useEffect(() => {
    if (params?.key === "1" && params?.sourceLocation) {
      setSourcePointLocation(params?.sourceLocation);
    } else if (params?.key === "2" && params?.destinationLocation) {
      setDesPointLocation(params?.destinationLocation);
    }
  }, [
    params?.key,
    params?.sourceLocation,
    params?.params?.destinationLocation,
  ]);

  const seatList = Array.from({ length: 6 }, (_, index) => index + 1);
  const [selectedSeat, setSelectedSeat] = useState(1);
  const [confirmSeat, setConfirmSeat] = useState();

  const header = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.headerViewStyle,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            textAlign: isRtl ? "right" : "left",
            marginRight: isRtl ? 0 : Default.fixPadding,
            marginLeft: isRtl ? Default.fixPadding : 0,
            ...styles.headerTextStyle,
          }}
        >
          {tr("findPool")}
        </Text>
        <RNTouchable
          onPress={() => navigation.navigate("notification/notificationScreen")}
          style={styles.notificationButtonStyle}
        >
          <Fontisto name="bell" size={20} color={Colors.primary} />
        </RNTouchable>
      </View>
    );
  };

  const image = () => {
    return (
      <Image
        source={require("../../../assets/images/img1.png")}
        style={{ width: width, height: 209 }}
      />
    );
  };

  const findYourPoolContainer = () => {
    return (
      <View>
        <View style={styles.titleContainerStyle}>
          <Text
            style={{
              ...Fonts.Bold18primary,
              marginBottom: Default.fixPadding * 0.5,
            }}
          >
            {tr("findYourPool")}
          </Text>
          <Text style={{ ...Fonts.SemiBold15grey, textAlign: "center" }}>
            {tr("youFull")}
          </Text>
        </View>
      </View>
    );
  };

  const location = () => {
    return (
      <View style={styles.locationStyle}>
        <View style={{ flexDirection: isRtl ? "row-reverse" : "row" }}>
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
              dashThickness={1.2}
              dashColor={Colors.black}
              axis="vertical"
              style={{ height: 25, marginVertical: Default.fixPadding * 0.5 }}
            />

            <View
              style={{
                borderColor: Colors.primary,
                ...styles.circleViewStyle,
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("pickLocations/pickLocationsScreen", {
                  key: "1",
                  id: "1",
                });
              }}
              style={{ paddingBottom: Default.fixPadding * 1.5 }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...(sourcePointLocation
                    ? Fonts.SemiBold15black
                    : Fonts.SemiBold15grey),
                  overflow: "hidden",
                  textAlign: isRtl ? "right" : "left",
                }}
              >
                {sourcePointLocation
                  ? sourcePointLocation
                  : tr("sourceLocation")}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: Colors.lightGrey,
              }}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("pickLocations/pickLocationsScreen", {
                  key: "2",
                  id: "1",
                });
              }}
              style={{ paddingTop: Default.fixPadding * 1.5 }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...(desPointLocation
                    ? Fonts.SemiBold15black
                    : Fonts.SemiBold15grey),
                  overflow: "hidden",
                  textAlign: isRtl ? "right" : "left",
                }}
              >
                {desPointLocation
                  ? desPointLocation
                  : tr("destinationLocation")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const dateAndTime = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpenDateAndTimeModal(true)}
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.commonTouchableStyle,
        }}
      >
        <AntDesign name="calendar" size={18} color={Colors.grey} />
        <Text
          numberOfLines={1}
          style={{
            ...(selectedDate ? Fonts.SemiBold15black : Fonts.SemiBold15grey),
            ...styles.commonTextStyle,
            textAlign: isRtl ? "right" : "left",
            marginLeft: isRtl ? 0 : Default.fixPadding * 1.2,
            marginRight: isRtl ? Default.fixPadding * 1.2 : 0,
          }}
        >
          {selectedDate ? selectedDate : tr("dateTime")}
        </Text>
      </TouchableOpacity>
    );
  };

  const noOfSeat = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setSeatBottomSheet(true)}
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.commonTouchableStyle,
        }}
      >
        <FontAwesome name="user-o" size={18} color={Colors.grey} />
        <Text
          numberOfLines={1}
          style={{
            ...(confirmSeat ? Fonts.SemiBold15black : Fonts.SemiBold15grey),
            ...styles.commonTextStyle,
            textAlign: isRtl ? "right" : "left",
            marginLeft: isRtl ? 0 : Default.fixPadding * 1.2,
            marginRight: isRtl ? Default.fixPadding * 1.2 : 0,
          }}
        >
          {confirmSeat ? `${confirmSeat} ${tr("seat")}` : tr("noOfSeat")}
        </Text>
      </TouchableOpacity>
    );
  };

  const bottomSeatHeader = () => {
    return (
      <View style={styles.bottomSeatHeaderViewStyle}>
        <Text style={{ ...Fonts.Bold18primary }}>{tr("selectSeat")}</Text>
      </View>
    );
  };

  const renderItemSeat = ({ item, index }) => {
    const isSelected = selectedSeat === item;
    return (
      <View
        style={{
          borderTopWidth: index === 0 ? 0 : 1,
          borderTopColor: Colors.lightGreyOpacity50,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSelectedSeat(item)}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.bottomSheetSeatTouchableStyle,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              ...Fonts.SemiBold16black,
              overflow: "hidden",
              textAlign: isRtl ? "right" : "left",
            }}
          >{`${item} ${tr("seat")}`}</Text>

          <View
            style={{
              borderWidth: isSelected ? 6 : null,
              ...styles.checkCircleViewStyle,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const bottomSheetButtons = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.bottomSheetButtonsViewStyle,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSeatBottomSheet(false)}
          style={{
            backgroundColor: Colors.white,
            ...styles.bottomSheetButtonStyle,
          }}
        >
          <Text
            numberOfLines={1}
            style={{ ...Fonts.Bold16black, overflow: "hidden" }}
          >
            {tr("cancel")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setConfirmSeat(selectedSeat);
            setSeatBottomSheet(false);
          }}
          style={{
            backgroundColor: Colors.primary,
            ...styles.bottomSheetButtonStyle,
          }}
        >
          <Text
            numberOfLines={1}
            style={{ ...Fonts.Bold16white, overflow: "hidden" }}
          >
            {tr("okay")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const seatBottomSheetWrapper = () => {
    return (
      <BottomSheet
        visible={seatBottomSheet}
        onBackButtonPress={() => setSeatBottomSheet(false)}
        onBackdropPress={() => setSeatBottomSheet(false)}
      >
        <View style={styles.bottomSheetMainViewStyle}>
          {bottomSeatHeader()}
          <FlatList
            data={seatList}
            renderItem={renderItemSeat}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
          />
          {bottomSheetButtons()}
        </View>
      </BottomSheet>
    );
  };

  const dateAndTimeModal = () => {
    return (
      <DateAndTimeModal
        visible={openDateAndTimeModal}
        closeModal={() => setOpenDateAndTimeModal(false)}
        okayButtonHandle={(selectedDate) => {
          setSelectedDate(selectedDate);
          setOpenDateAndTimeModal(false);
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {image()}
          {findYourPoolContainer()}
          {location()}
          {dateAndTime()}
          {noOfSeat()}
        </ScrollView>
        <CommonButton
          title={tr("findPool")}
          onPress={() =>
            navigation.navigate("availablePool/availablePoolScreen")
          }
        />
      </View>

      {dateAndTimeModal()}
      {seatBottomSheetWrapper()}
    </View>
  );
};

export default FindPoolScreen;

const styles = StyleSheet.create({
  headerViewStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.6,
    paddingHorizontal: Default.fixPadding * 2,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  headerTextStyle: {
    flex: 1,
    textTransform: "uppercase",
    overflow: "hidden",
    ...Fonts.Bold18primary,
  },
  notificationButtonStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    borderRadius: 5,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  titleContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Default.fixPadding * 3,
    marginHorizontal: Default.fixPadding * 2,
  },
  locationStyle: {
    paddingVertical: Default.fixPadding * 1.4,
    paddingHorizontal: Default.fixPadding * 1.5,
    marginTop: Default.fixPadding * 3,
    marginBottom: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  circleViewStyle: {
    width: 16,
    height: 16,
    borderWidth: 5,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  commonTouchableStyle: {
    alignItems: "center",
    marginBottom: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding * 2,
    padding: Default.fixPadding * 1.5,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  commonTextStyle: {
    flex: 1,
    overflow: "hidden",
  },
  bottomSheetMainViewStyle: {
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: height / 1.8,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  bottomSeatHeaderViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 2,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  bottomSheetSeatTouchableStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.5,
    paddingHorizontal: Default.fixPadding * 2,
  },
  bottomSheetButtonsViewStyle: {
    alignItems: "center",
    marginVertical: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding,
  },
  bottomSheetButtonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding,
    marginHorizontal: Default.fixPadding,
    borderRadius: 5,
    ...Default.shadow,
  },
  checkCircleViewStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
