import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../../constants/styles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import DashedLine from "react-native-dashed-line";
import CommonButton from "../../../components/commonButton";
import { useLocalSearchParams, useNavigation } from "expo-router";
import DateAndTimeModal from "../../../components/dateAndTimeModal";

const OfferPoolScreen = () => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`offerPoolScreen:${key}`);
  }

  const [openDateAndTimeModal, setOpenDateAndTimeModal] = useState(false);
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

  const header = () => {
    return (
      <View style={styles.headerViewStyle}>
        <Text style={{ ...Fonts.Bold18primary }}>{tr("offerPool")}</Text>
      </View>
    );
  };

  const imageContainer = () => {
    return (
      <View style={styles.imageContainerViewStyle}>
        <Image
          source={require("../../../assets/images/poolOffer.png")}
          style={styles.imageStyle}
        />
        <Text style={{ ...Fonts.Bold18primary }}>{tr("createPool")}</Text>
        <Text style={styles.shareTextStyle}>{tr("share")}</Text>
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
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("pickLocations/pickLocationsScreen", {
                  key: "1",
                  id: "2",
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
                  id: "2",
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
          ...styles.dateAndTimeTouchableStyle,
        }}
      >
        <AntDesign name="calendar" size={18} color={Colors.grey} />
        <Text
          numberOfLines={1}
          style={{
            ...(selectedDate ? Fonts.SemiBold15black : Fonts.SemiBold15grey),
            ...styles.selectedDateTextStyle,
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

  const [recurringRide, setRecurringRide] = useState(true);
  const dayList = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const [selectedDays, setSelectedDays] = useState(["Mo", "We"]);

  const renderItemDay = ({ item, index }) => {
    const isSelected = selectedDays.includes(item);
    return (
      <TouchableOpacity
        disabled={!recurringRide}
        activeOpacity={0.8}
        onPress={() => {
          if (isSelected) {
            setSelectedDays((prev) => prev.filter((i) => i !== item));
          } else {
            setSelectedDays((prev) => [...prev, item]);
          }
        }}
        style={{
          ...styles.dayTouchableStyle,
          borderColor: isSelected ? Colors.primary : Colors.transparent,
          marginLeft: isRtl
            ? 0
            : index === 0
            ? Default.fixPadding * 2
            : Default.fixPadding * 1.5,
          marginRight: isRtl
            ? index === 0
              ? Default.fixPadding * 2
              : Default.fixPadding * 1.5
            : 0,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            ...(isSelected ? Fonts.SemiBold15primary : Fonts.SemiBold15grey),
            overflow: "hidden",
          }}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const recurringRideContainer = () => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if (recurringRide) {
              setRecurringRide(false);
              setSelectedDays([]);
            } else {
              setRecurringRide(true);
            }
          }}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          <Ionicons
            name={recurringRide ? "checkbox-outline" : "square-outline"}
            size={17}
            color={Colors.primary}
          />
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold15black,
              overflow: "hidden",
              marginLeft: isRtl ? 0 : Default.fixPadding,
              marginRight: isRtl ? Default.fixPadding : 0,
            }}
          >
            {tr("recurringRide")}
          </Text>
        </TouchableOpacity>

        <FlatList
          horizontal
          inverted={isRtl}
          data={dayList}
          renderItem={renderItemDay}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingRight: Default.fixPadding * 2 }}
        />
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
        {header()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {imageContainer()}
          {location()}
          {dateAndTime()}
          {recurringRideContainer()}
        </ScrollView>
        <CommonButton
          title={tr("continue")}
          onPress={() => navigation.navigate("setOffer/setOfferScreen")}
        />
      </View>
      {dateAndTimeModal()}
    </View>
  );
};

export default OfferPoolScreen;

const styles = StyleSheet.create({
  headerViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 2.1,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  imageContainerViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Default.fixPadding * 1.2,
    marginBottom: Default.fixPadding * 4,
    marginHorizontal: Default.fixPadding * 2,
  },
  imageStyle: {
    width: 225,
    height: 150,
    resizeMode: "contain",
    marginBottom: Default.fixPadding * 2,
  },
  shareTextStyle: {
    ...Fonts.SemiBold14grey,
    textAlign: "center",
    marginTop: Default.fixPadding * 0.5,
    marginHorizontal: Default.fixPadding * 2,
  },
  locationStyle: {
    paddingVertical: Default.fixPadding * 1.4,
    paddingHorizontal: Default.fixPadding * 1.5,
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
  dateAndTimeTouchableStyle: {
    alignItems: "center",
    padding: Default.fixPadding * 1.5,
    marginBottom: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  selectedDateTextStyle: {
    flex: 1,
    overflow: "hidden",
  },
  dayTouchableStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Default.fixPadding * 1.2,
    paddingVertical: Default.fixPadding,
    width: 40,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
