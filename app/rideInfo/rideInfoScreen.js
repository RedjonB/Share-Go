import React, { useMemo, useRef } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import Header from "../../components/header";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "../../constants/key";
import MapView, { Marker } from "react-native-maps";
import DashedLine from "react-native-dashed-line";
import CommonButton from "../../components/commonButton";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

const RideInfoScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`rideInfoScreen:${key}`);
  }

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["50%", "75%"], []);

  const initialMapData = {
    latitude: 22.5981662,
    longitude: 88.4570113,
    latitudeDelta: 0.098643,
    longitudeDelta: 0.090448,
  };

  const listOfData = [
    {
      key: "1",
      title: tr("sourceLocation"),
      address: "Washinton sq.park, New Jersey ",
      coordinates: {
        latitude: 22.6013867,
        longitude: 88.4354486,
      },
    },
    {
      key: "2",
      title: `${tr("pickUp")} brooklyan`,
      address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
      name: "Brooklyn Simmons",
      image: require("../../assets/images/users/user1.png"),
      coordinates: {
        latitude: 22.6115648,
        longitude: 88.4317279,
      },
    },
    {
      key: "3",
      title: `${tr("pickUp")} leslie`,
      address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
      name: "Leslie Alexander",
      image: require("../../assets/images/users/user7.png"),
      coordinates: {
        latitude: 22.6112648,
        longitude: 88.440279,
      },
    },
    {
      key: "4",
      title: `${tr("pickUp")} jenny`,
      address: "42km drive",
      name: "Jenny Wilson",
      image: require("../../assets/images/users/user3.png"),
      coordinates: {
        latitude: 22.6211662,
        longitude: 88.4390113,
      },
    },
    {
      key: "5",
      title: `${tr("pickUp")} robert`,
      address: "8502 Preston Rd. Inglewood, Maine 98380",
      name: "Robert Fox",
      image: require("../../assets/images/users/user5.png"),
      coordinates: {
        latitude: 22.6311662,
        longitude: 88.4490113,
      },
    },
    {
      key: "6",
      title: tr("destinationLocation"),
      address: "2464 Royal Ln. Mesa, New Jersey 45463",
      coordinates: {
        latitude: 22.6451662,
        longitude: 88.4550113,
      },
    },
  ];

  const mapViewAndDirection = () => {
    return (
      <MapView initialRegion={initialMapData} style={{ flex: 1 }}>
        {listOfData.map((marker, index) => (
          <Marker coordinate={marker.coordinates} key={marker.key}>
            {!marker.image ? (
              <View
                style={{
                  borderColor: index === 0 ? Colors.green : Colors.primary,
                  ...styles.markerCircleStyle,
                }}
              />
            ) : (
              <Image
                source={marker.image}
                style={{ width: 25, height: 25, borderRadius: 14.5 }}
              />
            )}
          </Marker>
        ))}

        {listOfData.map((marker, index) =>
          listOfData.length - 1 === index ? null : (
            <MapViewDirections
              key={marker.key}
              apikey={GOOGLE_API_KEY}
              origin={listOfData[index].coordinates}
              destination={listOfData[index + 1].coordinates}
              strokeWidth={3}
              strokeColor={Colors.mariner}
            />
          )
        )}
      </MapView>
    );
  };

  const rideDetails = () => {
    return (
      <View style={{ marginTop: Default.fixPadding * 2 }}>
        {listOfData.map((item, index) => {
          const lastIndex = listOfData.length - 1 === index;
          const firstIndex = index === 0;
          return (
            <View
              key={index}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <View style={{ alignItems: "center" }}>
                {item.image ? (
                  <Image
                    source={item.image}
                    style={{ width: 16, height: 16, borderRadius: 8 }}
                  />
                ) : (
                  <View
                    style={{
                      borderColor:
                        item.title !== tr("sourceLocation")
                          ? Colors.primary
                          : Colors.green,
                      ...styles.circleViewStyle,
                      marginTop: firstIndex ? Default.fixPadding * 0.2 : 0,
                    }}
                  />
                )}
                {listOfData.length - 1 === index ? null : (
                  <DashedLine
                    dashGap={2.5}
                    dashLength={2.5}
                    dashThickness={1.5}
                    dashColor={Colors.grey}
                    axis="vertical"
                    style={{ height: 45 }}
                  />
                )}
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: isRtl ? "flex-end" : "flex-start",
                  marginLeft: isRtl ? 0 : Default.fixPadding,
                  marginRight: isRtl ? Default.fixPadding : 0,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    ...(firstIndex || lastIndex
                      ? Fonts.SemiBold14primary
                      : Fonts.SemiBold14grey),
                    overflow: "hidden",
                  }}
                >
                  {item.title}
                </Text>
                <Text numberOfLines={1} style={styles.addressTextStyle}>
                  {item.address}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const renderItemCoPassengers = ({ item, index }) => {
    const lastIndex = listOfData.length - 1 === index;
    const firstIndex = index === 0;
    return (
      <>
        {firstIndex || lastIndex ? null : (
          <View style={styles.renderItemCoPassengersViewStyle}>
            <Image
              source={item.image}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />

            <Text numberOfLines={2} style={styles.nameTextStyle}>
              {item.name}
            </Text>
          </View>
        )}
      </>
    );
  };

  const coPassengers = () => {
    return (
      <View
        style={{
          marginTop: Default.fixPadding * 2,
          marginBottom: Default.fixPadding * 9,
        }}
      >
        <Text
          style={{
            ...Fonts.Bold16black,
            textAlign: isRtl ? "right" : "left",
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("coPassengers")}
        </Text>
        <FlatList
          horizontal
          inverted={isRtl}
          data={listOfData}
          renderItem={renderItemCoPassengers}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  const bottomSheetContainer = () => {
    return (
      <BottomSheet
        index={0}
        ref={bottomSheetModalRef}
        enablePanDownToClose={false}
        snapPoints={snapPoints}
        style={styles.containerStyle}
        handleIndicatorStyle={styles.handleIndicatorStyle}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...styles.rideStartsOnTextStyle,
            }}
          >{`${tr("rideStartsOn")} 12 June, 10 :30 am`}</Text>
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            {rideDetails()}
            {coPassengers()}
          </BottomSheetScrollView>
        </View>
      </BottomSheet>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={tr("map")} navigation={navigation} />
        {mapViewAndDirection()}
        {bottomSheetContainer()}
        <View style={{ backgroundColor: Colors.white }}>
          <CommonButton
            title={tr("startRide")}
            onPress={() => navigation.navigate("startRide/startRideScreen")}
          />
        </View>
      </View>
    </View>
  );
};

export default RideInfoScreen;

const styles = StyleSheet.create({
  markerCircleStyle: {
    width: 24,
    height: 24,
    borderWidth: 8,
    borderRadius: 12,
    backgroundColor: Colors.regularGrey,
  },
  containerStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  rideStartsOnTextStyle: {
    ...Fonts.Bold16black,
    marginHorizontal: Default.fixPadding * 2,
    marginTop: Default.fixPadding,
  },
  circleViewStyle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 5,
    backgroundColor: Colors.white,
  },
  handleIndicatorStyle: {
    width: 88,
    height: 2,
    backgroundColor: Colors.lightGrey,
  },
  markerCircleStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 8,
    backgroundColor: Colors.white,
  },
  renderItemCoPassengersViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    marginHorizontal: Default.fixPadding * 2,
    marginVertical: Default.fixPadding * 1.5,
  },
  nameTextStyle: {
    ...Fonts.SemiBold13black,
    overflow: "hidden",
    textAlign: "center",
  },
  addressTextStyle: {
    ...Fonts.SemiBold13darkGrey,
    overflow: "hidden",
    marginTop: Default.fixPadding * 0.3,
  },
});
