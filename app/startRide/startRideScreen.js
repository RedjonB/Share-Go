import React, { useMemo, useRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
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
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

const StartRideScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`startRideScreen:${key}`);
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
      sourceAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
      destinationAddress: "2464 Royal Ln. Mesa, New Jersey 45463",
      name: "Brooklyn Simmons",
      image: require("../../assets/images/users/user1.png"),
      drop: true,
      coordinates: {
        latitude: 22.6115648,
        longitude: 88.4317279,
      },
    },
    {
      key: "3",
      title: `${tr("pickUp")} leslie`,
      sourceAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
      destinationAddress: "2464 Royal Ln. Mesa, New Jersey 45463",
      address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
      name: "Leslie Alexander",
      image: require("../../assets/images/users/user7.png"),
      drop: true,
      coordinates: {
        latitude: 22.6112648,
        longitude: 88.440279,
      },
    },
    {
      key: "4",
      title: `${tr("pickUp")} jenny`,
      sourceAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
      destinationAddress: "2464 Royal Ln. Mesa, New Jersey 45463",
      address: "42km drive",
      name: "Jenny Wilson",
      image: require("../../assets/images/users/user3.png"),
      drop: false,
      coordinates: {
        latitude: 22.6211662,
        longitude: 88.4390113,
      },
    },
    {
      key: "5",
      title: `${tr("pickUp")} robert`,
      sourceAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
      destinationAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
      address: "2464 Royal Ln. Mesa, New Jersey 45463",
      name: "Robert Fox",
      image: require("../../assets/images/users/user5.png"),
      drop: false,
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
        {listOfData.map((item, index) => {
          return item.drop ? null : (
            <Marker coordinate={item.coordinates} key={item.key}>
              {!item.image ? (
                <View
                  style={{
                    borderColor: index === 0 ? Colors.green : Colors.primary,
                    ...styles.markerCircleStyle,
                  }}
                />
              ) : (
                <Image
                  source={item.image}
                  style={{ width: 25, height: 25, borderRadius: 14.5 }}
                />
              )}
            </Marker>
          );
        })}
        <Marker coordinate={{ latitude: 22.6271662, longitude: 88.4440113 }}>
          <View style={styles.kmViewStyle}>
            <Text style={{ ...Fonts.SemiBold13white }}>42 km</Text>
          </View>
        </Marker>

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

  const renderItem = ({ item, index }) => {
    const lastIndex = listOfData.length - 1 === index;
    const firstIndex = index === 0;
    return (
      <>
        {firstIndex || lastIndex ? null : (
          <View
            style={{
              borderTopWidth: index === 1 ? 0 : 1,
              ...styles.borderViewStyle,
            }}
          >
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              <Image
                source={item.image}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
              <Text
                numberOfLines={1}
                style={{
                  textAlign: isRtl ? "right" : "left",
                  ...styles.userNameTextStyle,
                }}
              >
                {item.name}
              </Text>
              <View
                style={{
                  backgroundColor: item.drop ? Colors.green : Colors.primary,
                  ...styles.dropViewStyle,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{ ...Fonts.Bold16white, overflow: "hidden" }}
                >
                  {item.drop ? tr("drop") : tr("pick")}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                marginTop: Default.fixPadding * 1.2,
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
                  dashGap={2.5}
                  dashLength={2.5}
                  dashThickness={1.5}
                  dashColor={Colors.grey}
                  axis="vertical"
                  style={{ height: 10 }}
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
                  alignItems: isRtl ? "flex-end" : "flex-start",
                }}
              >
                <View>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.SemiBold14grey,
                      overflow: "hidden",
                    }}
                  >
                    {item.sourceAddress}
                  </Text>
                </View>

                <View style={{ paddingTop: Default.fixPadding }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.SemiBold14grey,
                      overflow: "hidden",
                    }}
                  >
                    {item.destinationAddress}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </>
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
              ...styles.tripRoadmapTextStyle,
            }}
          >
            {tr("tripRoadmap")}
          </Text>

          <BottomSheetFlatList
            data={listOfData}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: Default.fixPadding * 9 }}
          />
        </View>
      </BottomSheet>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={tr("tripRoadmap")} navigation={navigation} />
        {mapViewAndDirection()}
        {bottomSheetContainer()}
        <View style={{ backgroundColor: Colors.white }}>
          <CommonButton
            title={tr("endRide")}
            onPress={() =>
              navigation.navigate("tripCompleted/tripCompletedScreen")
            }
          />
        </View>
      </View>
    </View>
  );
};

export default StartRideScreen;

const styles = StyleSheet.create({
  markerCircleStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 8,
    backgroundColor: Colors.regularGrey,
  },
  containerStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  handleIndicatorStyle: {
    width: 88,
    height: 2,
    backgroundColor: Colors.lightGrey,
  },
  tripRoadmapTextStyle: {
    ...Fonts.Bold18primary,
    marginHorizontal: Default.fixPadding * 2,
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 0.5,
  },
  borderViewStyle: {
    borderTopColor: Colors.lightGreyOpacity80,
    paddingVertical: Default.fixPadding * 1.5,
    paddingHorizontal: Default.fixPadding * 2,
  },
  userNameTextStyle: {
    flex: 1,
    overflow: "hidden",
    ...Fonts.Bold16black,
    marginHorizontal: Default.fixPadding,
  },
  dropViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 111,
    paddingHorizontal: Default.fixPadding * 0.5,
    paddingVertical: Default.fixPadding,
    borderRadius: 5,
  },
  circleViewStyle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 5,
    backgroundColor: Colors.white,
  },
  kmViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Default.fixPadding * 0.2,
    paddingHorizontal: Default.fixPadding * 0.4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
});
