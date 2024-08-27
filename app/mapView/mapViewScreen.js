import React, { useState, useRef, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/header";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "../../constants/key";
import MapView, { Marker } from "react-native-maps";
import DashedLine from "react-native-dashed-line";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

const MapViewScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`mapViewScreen:${key}`);
  }
  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["55%"], []);

  const initialMapData = {
    latitude: 37.681707,
    longitude: -122.4053769,
    latitudeDelta: 0.1122,
    longitudeDelta: 0.1422,
  };

  const [coordinates] = useState([
    {
      latitude: 37.7117876,
      longitude: -122.4134812,
    },
    {
      latitude: 37.743707,
      longitude: -122.4351769,
    },
  ]);

  const mapViewAndDirection = () => {
    return (
      <MapView initialRegion={initialMapData} style={{ flex: 1 }}>
        <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey={GOOGLE_API_KEY}
          strokeWidth={3}
          strokeColor={Colors.mariner}
        />
        <Marker coordinate={coordinates[0]}>
          <View
            style={{ ...styles.markerCircleStyle, borderColor: Colors.green }}
          />
        </Marker>
        <Marker coordinate={coordinates[1]}>
          <View
            style={{ ...styles.markerCircleStyle, borderColor: Colors.primary }}
          />
        </Marker>

        <Marker coordinate={{ latitude: 37.7217876, longitude: -122.4014812 }}>
          <View style={styles.kmViewStyle}>
            <Text style={{ ...Fonts.SemiBold13white }}>42 km</Text>
          </View>
        </Marker>
      </MapView>
    );
  };

  const listOfData = [
    {
      key: "1",
      title: tr("pickUpPoint"),
      status: "point",
      address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    },
    {
      key: "2",
      title: tr("sourceLocation"),
      status: "source",
      address: "Washinton sq.park, New Jersey ",
      time: "5 :25 pm",
    },
    {
      key: "3",
      title: tr("drive"),
      status: "point",
      address: "42km drive",
    },
    {
      key: "4",
      title: tr("destinationLocation"),
      status: "destination",
      address: "2464 Royal Ln. Mesa, New Jersey 45463",
      time: "6:15 pm",
    },
    {
      key: "5",
      title: tr("dropPoint"),
      status: "point",
      address: "8502 Preston Rd. Inglewood, Maine 98380",
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          marginHorizontal: Default.fixPadding * 2,
          marginTop: index === 0 ? Default.fixPadding : 0,
        }}
      >
        <View
          style={{ alignItems: "center", marginTop: Default.fixPadding * 0.3 }}
        >
          {item.status === "point" ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Colors.lightGrey,
                ...styles.locationCircleStyle,
              }}
            >
              <Ionicons name="person" size={10} color={Colors.white} />
            </View>
          ) : (
            <View
              style={{
                ...styles.locationCircleStyle,
                backgroundColor: Colors.white,
                borderWidth: 5,
                borderColor:
                  item.status === "source" ? Colors.green : Colors.primary,
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
            marginHorizontal: Default.fixPadding,
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginBottom: Default.fixPadding * 0.3,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                ...(item.time ? Fonts.SemiBold14primary : Fonts.SemiBold14grey),
                flex: 1,
                textAlign: isRtl ? "right" : "left",
                overflow: "hidden",
              }}
            >
              {item.title}
            </Text>
            <Text numberOfLines={1} style={styles.timeTextStyle}>
              {item.time}
            </Text>
          </View>
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold13darkGrey,
              overflow: "hidden",
            }}
          >
            {item.address}
          </Text>
        </View>
      </View>
    );
  };

  const bottomView = () => {
    return (
      <BottomSheet
        index={0}
        ref={bottomSheetModalRef}
        enablePanDownToClose={false}
        snapPoints={snapPoints}
        style={styles.bottomSheetViewStyle}
        handleIndicatorStyle={styles.handleIndicatorStyle}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              textAlign: isRtl ? "right" : "left",
              ...styles.rideStartTextStyle,
            }}
          >
            {`${tr("rideStarts")} 12 June, 10 :30 am`}
          </Text>
          <BottomSheetFlatList
            data={listOfData}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: Default.fixPadding * 2 }}
          />
        </View>
      </BottomSheet>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={tr("mapView")} navigation={navigation} />
        <View style={{ flex: 1 }}>
          {mapViewAndDirection()}
          {bottomView()}
        </View>
      </View>
    </View>
  );
};

export default MapViewScreen;

const styles = StyleSheet.create({
  bottomSheetViewStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.white,
  },
  rideStartTextStyle: {
    ...Fonts.Bold16black,
    marginHorizontal: Default.fixPadding * 2,
    marginVertical: Default.fixPadding,
  },
  timeTextStyle: {
    ...Fonts.Bold14primary,
    overflow: "hidden",
    maxWidth: 80,
  },
  locationCircleStyle: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  markerCircleStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 8,
    backgroundColor: Colors.regularGrey,
  },
  kmViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Default.fixPadding * 0.4,
    paddingVertical: Default.fixPadding * 0.2,
    backgroundColor: Colors.primary,
    borderRadius: 2,
    ...Default.shadowPrimary,
  },
  handleIndicatorStyle: {
    width: 88,
    height: 2,
    backgroundColor: Colors.lightGrey,
  },
});
