import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";
import Header from "../../components/header";
import Stars from "react-native-stars";
import DashedLine from "react-native-dashed-line";
import { RNTouchable } from "../../components/rNTouchable";

const { width } = Dimensions.get("window");

const AvailablePoolScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`availablePoolScreen:${key}`);
  }

  const findPoolList = [
    {
      key: "1",
      image: require("../../assets/images/users/user1.png"),
      name: "David johanson",
      rating: 5,
      review: "120",
      sourceLocation: "World tarde point, new jersey",
      destinationLocation: "2464 Royal Ln. Mesa, New Jersey 45463",
      totalSeat: 4,
      bookSeat: [1, 2],
      dateAndTime: "10/6/2023, 3PM",
      price: "$15.00",
    },
    {
      key: "2",
      image: require("../../assets/images/users/user2.png"),
      name: "Ronald Richards",
      rating: 4,
      review: "120",
      sourceLocation: "World tarde point, new jersey",
      destinationLocation: "3517 W. Gray St. Utica, Pennsylvania 57867",
      totalSeat: 4,
      bookSeat: [1, 2],
      dateAndTime: "10/6/2023, 3PM",
      price: "$10.00",
    },
    {
      key: "3",
      image: require("../../assets/images/users/user3.png"),
      name: "Leslie Alexander",
      rating: 5,
      review: "120",
      sourceLocation: "Gray St. Utica, Pennsylvania 57867",
      destinationLocation: "6391 Elgin St. Celina, Delaware 10299",
      totalSeat: 4,
      bookSeat: [1, 2],
      dateAndTime: "10/6/2023, 3PM",
      price: "$19.00",
    },
    {
      key: "4",
      image: require("../../assets/images/users/user4.png"),
      name: "Jenny Wilson",
      rating: 5,
      review: "120",
      sourceLocation: "World tarde point, new jersey",
      destinationLocation: "2464 Royal Ln. Mesa, New Jersey 45463",
      totalSeat: 4,
      bookSeat: [1, 2],
      dateAndTime: "10/6/2023, 3PM",
      price: "$14.00",
    },
    {
      key: "5",
      image: require("../../assets/images/users/user5.png"),
      name: "Esthen Howard",
      rating: 5,
      review: "120",
      sourceLocation: "Gray St. Utica, Pennsylvania 57867",
      destinationLocation: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
      totalSeat: 4,
      bookSeat: [1, 2],
      dateAndTime: "10/6/2023, 3PM",
      price: "$12.00",
    },
  ];

  const renderItem = ({ item }) => {
    const totalSeats = Array.from(
      { length: item.totalSeat },
      (_, index) => index + 1
    );

    return (
      <View style={styles.renderItemViewStyle}>
        <RNTouchable
          onPress={() => {
            navigation.navigate("riderProfile/riderProfileScreen", {
              image: item.image,
              name: item.name,
              key: "1",
            });
          }}
          style={{
            paddingVertical: Default.fixPadding * 1.5,
            paddingHorizontal: Default.fixPadding,
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
              }}
            >
              <Image
                source={item.image}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
              <View style={{ flex: 1, marginHorizontal: Default.fixPadding }}>
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.Bold15black,
                      overflow: "hidden",
                      maxWidth: 150,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Octicons
                    name="check-circle-fill"
                    size={14}
                    color={Colors.green}
                    style={{
                      marginLeft: isRtl ? 0 : Default.fixPadding * 0.5,
                      marginRight: isRtl ? Default.fixPadding * 0.5 : 0,
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    alignItems: "center",
                  }}
                >
                  <Stars
                    disabled
                    default={item.rating}
                    count={5}
                    half={false}
                    starSize={14}
                    spacing={3}
                    fullStar={
                      <AntDesign
                        name={"star"}
                        size={14}
                        color={Colors.yellow}
                      />
                    }
                    emptyStar={
                      <AntDesign name={"star"} size={14} color={Colors.nobel} />
                    }
                  />

                  <Text numberOfLines={1} style={styles.reviewTextStyle}>
                    {`(${item.review} ${tr("review")})`}
                  </Text>
                </View>
              </View>
            </View>
            <Text numberOfLines={1} style={styles.priceTextStyle}>
              {item.price}
            </Text>
          </View>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginTop: Default.fixPadding * 1.5,
            }}
          >
            <View
              style={{
                borderColor: Colors.green,
                ...styles.locationCircleViewStyle,
              }}
            />
            <Text
              numberOfLines={1}
              style={{
                ...styles.locationTextStyle,
                textAlign: isRtl ? "right" : "left",
                marginLeft: isRtl ? 0 : Default.fixPadding * 0.5,
                marginRight: isRtl ? Default.fixPadding * 0.5 : 0,
              }}
            >
              {item.sourceLocation}
            </Text>
          </View>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginTop: Default.fixPadding * 0.5,
            }}
          >
            <View
              style={{
                borderColor: Colors.primary,
                ...styles.locationCircleViewStyle,
              }}
            />
            <Text
              numberOfLines={1}
              style={{
                textAlign: isRtl ? "right" : "left",
                marginLeft: isRtl ? 0 : Default.fixPadding * 0.5,
                marginRight: isRtl ? Default.fixPadding * 0.5 : 0,
                ...styles.locationTextStyle,
              }}
            >
              {item.destinationLocation}
            </Text>
          </View>
        </RNTouchable>
        <DashedLine
          dashGap={2.5}
          dashLength={2.5}
          dashThickness={1.5}
          dashColor={Colors.grey}
        />

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            paddingVertical: Default.fixPadding * 1.5,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginRight: isRtl ? 0 : Default.fixPadding,
              marginLeft: isRtl ? Default.fixPadding : 0,
            }}
          >
            <View style={{ maxWidth: 100 }}>
              <FlatList
                horizontal
                inverted={isRtl}
                data={totalSeats}
                keyExtractor={(_, index) => index}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: seatNumber, index }) => {
                  const isBooked = item.bookSeat.includes(seatNumber);
                  return (
                    <View
                      style={{
                        marginRight: isRtl
                          ? index === 0
                            ? Default.fixPadding
                            : 0
                          : Default.fixPadding * 0.4,
                        marginLeft: isRtl
                          ? Default.fixPadding * 0.4
                          : index === 0
                          ? Default.fixPadding
                          : 0,
                        backgroundColor: isBooked
                          ? Colors.primary
                          : Colors.nobel,
                        ...styles.seatListCircleStyle,
                      }}
                    >
                      <Ionicons
                        name="person-outline"
                        size={10}
                        color={Colors.white}
                      />
                    </View>
                  );
                }}
              />
            </View>
            <Text
              numberOfLines={1}
              style={{
                marginLeft: isRtl ? 0 : Default.fixPadding * 0.6,
                marginRight: isRtl ? Default.fixPadding * 0.6 : 0,
                ...styles.seatTextStyle,
              }}
            >{`${item.totalSeat - item.bookSeat.length} ${tr("seat")}`}</Text>
          </View>
          <RNTouchable
            onPress={() => {
              navigation.navigate("riderProfile/riderProfileScreen", {
                image: item.image,
                name: item.name,
                key: "1",
              });
            }}
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginRight: isRtl ? 0 : Default.fixPadding * 0.9,
              marginLeft: isRtl ? Default.fixPadding * 0.9 : 0,
            }}
          >
            <AntDesign name="calendar" size={15} color={Colors.primary} />
            <Text
              numberOfLines={1}
              style={{
                marginLeft: isRtl ? 0 : Default.fixPadding * 0.5,
                marginRight: isRtl ? Default.fixPadding * 0.5 : 0,
                ...styles.dateTimeTextStyle,
              }}
            >
              {item.dateAndTime}
            </Text>
          </RNTouchable>
        </View>
      </View>
    );
  };

  const listHeaderComponent = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          paddingLeft: isRtl ? 0 : Default.fixPadding * 0.9,
          paddingRight: isRtl ? Default.fixPadding * 0.9 : 0,
          ...styles.mainViewLocationStyle,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: isRtl ? "row-reverse" : "row",
            marginRight: isRtl ? 0 : Default.fixPadding * 1.5,
            marginLeft: isRtl ? Default.fixPadding * 1.5 : 0,
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
            <View style={{ paddingBottom: Default.fixPadding * 1.5 }}>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold15grey,
                  overflow: "hidden",
                }}
              >
                World trade point, new jersey
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: Colors.lightGrey,
              }}
            />
            <View style={{ paddingTop: Default.fixPadding * 1.5 }}>
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold15grey,
                  overflow: "hidden",
                }}
              >
                Harvard law school,new jersey
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginRight: isRtl ? 0 : Default.fixPadding * 0.4,
            marginLeft: isRtl ? Default.fixPadding * 0.4 : 0,
          }}
        >
          <AntDesign name="calendar" size={15} color={Colors.primary} />
          <Text numberOfLines={1} style={styles.topDateTimeTextStyle}>
            10/6/2023,
          </Text>
          <Text style={{ ...Fonts.SemiBold14grey, textAlign: "center" }}>
            3PM
          </Text>
        </View>
      </View>
    );
  };

  const backgroundImage = () => {
    return (
      <Image
        source={require("../../assets/images/map.png")}
        style={{ width: width, height: 183, opacity: 0.2 }}
      />
    );
  };

  const poolFlatList = () => {
    return (
      <View style={styles.positionViewStyle}>
        <FlatList
          data={findPoolList}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={listHeaderComponent()}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={tr("findPool")} navigation={navigation} />
        <View style={{ flex: 1 }}>
          {backgroundImage()}
          {poolFlatList()}
        </View>
      </View>
    </View>
  );
};

export default AvailablePoolScreen;

const styles = StyleSheet.create({
  mainViewLocationStyle: {
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.4,
    margin: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  topDateTimeTextStyle: {
    ...Fonts.SemiBold14grey,
    textAlign: "center",
    marginTop: Default.fixPadding * 0.5,
  },
  circleViewStyle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 5,
    backgroundColor: Colors.white,
  },
  positionViewStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  renderItemViewStyle: {
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  priceTextStyle: {
    ...Fonts.Bold16primary,
    overflow: "hidden",
    maxWidth: 70,
  },
  reviewTextStyle: {
    ...Fonts.SemiBold14grey,
    overflow: "hidden",
    maxWidth: 100,
  },
  locationCircleViewStyle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 4,
    backgroundColor: Colors.white,
  },
  locationTextStyle: {
    ...Fonts.SemiBold14darkGrey,
    flex: 1,
    overflow: "hidden",
  },
  dateTimeTextStyle: {
    ...Fonts.SemiBold14grey,
    overflow: "hidden",
    maxWidth: 130,
  },
  seatTextStyle: {
    ...Fonts.SemiBold14grey,
    overflow: "hidden",
    maxWidth: 70,
  },
  seatListCircleStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 16,
    height: 16,
    borderRadius: 8,
    marginTop: Default.fixPadding * 0.2,
  },
});
