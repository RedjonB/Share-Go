import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../constants/styles";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { RNTouchable } from "../../components/rNTouchable";
import CommonButton from "../../components/commonButton";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import Geocoder from "react-native-geocoding";
import { GOOGLE_API_KEY } from "../../constants/key";

Geocoder.init(GOOGLE_API_KEY);

const PickLocationsScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const { key, id } = useLocalSearchParams();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`pickLocationsScreen:${key}`);
  }

  const [search, setSearch] = useState();

  const [markerPosition, setMarkerPosition] = useState({
    latitude: 22.616086,
    longitude: 88.4454486,
  });
  const [address, setAddress] = useState("");

  const handleMarkerDrag = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerPosition({
      latitude,
      longitude,
    });

    Geocoder.from({
      latitude,
      longitude,
    })
      .then((json) => {
        const addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
      })
      .catch((error) => console.warn(error));
  };

  const pickLocationTouchableHandle = () => {
    const screen =
      id === "1" ? "findPool/findPoolScreen" : "offerPool/offerPoolScreen";
    navigation.navigate(screen, {
      sourceLocation: address
        ? address
        : "2464 Royal Ln. Mesa, New Jersey 45463",
      destinationLocation: address
        ? address
        : "4517 Washington Ave. Manchester,Kentucky 39495",
      key,
    });
  };

  const backAndSearchView = () => {
    return (
      <View style={{ position: "absolute", left: 0, right: 0 }}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.backAndSearchViewStyle,
          }}
        >
          <RNTouchable onPress={() => router.back()}>
            <Ionicons
              name={isRtl ? "arrow-forward-outline" : "arrow-back-outline"}
              size={24}
              color={Colors.black}
            />
          </RNTouchable>

          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginLeft: isRtl ? 0 : Default.fixPadding * 1.1,
              marginRight: isRtl ? Default.fixPadding * 1.1 : 0,
              ...styles.searchViewStyle,
            }}
          >
            <Feather name="search" size={24} color={Colors.grey} />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder={tr("search")}
              placeholderTextColor={Colors.grey}
              selectionColor={Colors.primary}
              style={{
                textAlign: isRtl ? "right" : "left",
                ...styles.searchTextStyle,
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  const mapViewContainer = () => {
    return (
      <MapView
        onPress={(e) => handleMarkerDrag(e)}
        initialRegion={{
          latitude: markerPosition.latitude,
          longitude: markerPosition.longitude,
          latitudeDelta: 0.058641,
          longitudeDelta: 0.059414,
        }}
        style={{
          flex: 1,
        }}
      >
        <Marker
          coordinate={markerPosition}
          draggable
          onDragEnd={(e) => handleMarkerDrag(e)}
        >
          <Image
            source={require("../../assets/images/icons/location.png")}
            style={styles.markerImageStyle}
          />
        </Marker>
      </MapView>
    );
  };

  const pickLocationBottomView = () => {
    return (
      <View style={styles.bottomPositionViewStyle}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.addressViewStyle,
          }}
        >
          <MaterialCommunityIcons
            name="map-marker-circle"
            size={24}
            color={Colors.primary}
          />
          <Text
            numberOfLines={1}
            style={{
              ...styles.addressTextStyle,
              marginLeft: isRtl ? 0 : Default.fixPadding,
              marginRight: isRtl ? Default.fixPadding : 0,
            }}
          >
            {address
              ? address
              : key === "1"
              ? "2464 Royal Ln. Mesa, New Jersey 45463"
              : "4517 Washington Ave. Manchester,Kentucky 39495"}
          </Text>
        </View>
        <CommonButton
          title={tr("pickLocation")}
          onPress={() => pickLocationTouchableHandle()}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MyStatusBar />
      <View
        style={{
          flex: 1,
        }}
      >
        {mapViewContainer()}
        {backAndSearchView()}
        {pickLocationBottomView()}
      </View>
    </View>
  );
};

export default PickLocationsScreen;

const styles = StyleSheet.create({
  backAndSearchViewStyle: {
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 2,
    marginVertical: Default.fixPadding * 1.5,
  },
  bottomPositionViewStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  addressViewStyle: {
    alignItems: "center",
    paddingVertical: Default.fixPadding * 2.2,
    paddingHorizontal: Default.fixPadding * 1.6,
    marginHorizontal: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  addressTextStyle: {
    ...Fonts.Medium14black,
    flex: 1,
    overflow: "hidden",
  },
  searchViewStyle: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Default.fixPadding,
    paddingHorizontal: Default.fixPadding * 1.5,
    borderRadius: 8,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  searchTextStyle: {
    flex: 1,
    ...Fonts.Bold16black,
    marginHorizontal: Default.fixPadding,
  },
  markerImageStyle: {
    resizeMode: "contain",
    width: 32,
    height: 37,
  },
});
