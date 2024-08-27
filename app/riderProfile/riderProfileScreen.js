import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation, useLocalSearchParams } from "expo-router";
import Header from "../../components/header";
import Stars from "react-native-stars";
import { RNTouchable } from "../../components/rNTouchable";
import { TabView, SceneMap } from "react-native-tab-view";
import { ProgressBar } from "react-native-paper";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";

const RiderProfileScreen = () => {
  const navigation = useNavigation();
  const { image, name, key } = useLocalSearchParams();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`riderProfileScreen:${key}`);
  }
  const [withdrawRequest, setWithdrawRequest] = useState(false);

  const userDetails = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          margin: Default.fixPadding * 2,
        }}
      >
        <Image
          source={image}
          style={{ width: 75, height: 75, borderRadius: 37.5 }}
        />
        <View
          style={{
            flex: 1,
            alignItems: isRtl ? "flex-end" : "flex-start",
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
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
                maxWidth: 140,
              }}
            >
              {name}
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
              marginVertical: Default.fixPadding * 0.5,
            }}
          >
            <Stars
              disabled
              default={5}
              count={5}
              half={false}
              starSize={14}
              spacing={3}
              fullStar={
                <AntDesign name={"star"} size={14} color={Colors.yellow} />
              }
              emptyStar={
                <AntDesign name={"star"} size={14} color={Colors.nobel} />
              }
            />

            <Text numberOfLines={1} style={styles.reviewTextStyle}>
              (120 review)
            </Text>
          </View>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.Bold15grey, overflow: "hidden" }}
          >
            Join 2018
          </Text>
        </View>
        <Text
          numberOfLines={1}
          style={{ ...Fonts.Bold17primary, overflow: "hidden", maxWidth: 80 }}
        >
          $15.00
        </Text>
      </View>
    );
  };

  const bottomButtonsView = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.bottomButtonsViewStyle,
        }}
      >
        <RNTouchable
          disabled={key === "2"}
          onPress={() =>
            navigation.navigate("chat/chatScreen", { image, name })
          }
          style={styles.chatTouchableStyle}
        >
          <MaterialIcons
            name="chat-bubble-outline"
            size={25}
            color={Colors.white}
          />
        </RNTouchable>
        <RNTouchable
          disabled={key === "2"}
          onPress={() => setWithdrawRequest(true)}
          style={{
            ...styles.requestRideTouchableStyle,
            marginLeft: isRtl ? 0 : Default.fixPadding * 1.5,
            marginRight: isRtl ? Default.fixPadding * 1.5 : 0,
            borderColor: withdrawRequest ? Colors.primary : Colors.transparent,
            backgroundColor: withdrawRequest ? Colors.white : Colors.primary,
            ...(withdrawRequest ? Default.shadowPrimary : Default.shadow),
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              ...(withdrawRequest ? Fonts.Bold18primary : Fonts.Bold18white),
              overflow: "hidden",
            }}
          >
            {key === "2"
              ? tr("callRider")
              : withdrawRequest
              ? tr("withdrawRequest")
              : tr("requestRide")}
          </Text>
        </RNTouchable>
      </View>
    );
  };

  const AboutTab = () => {
    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == "rtl";

    function tr(key) {
      return t(`aboutTab:${key}`);
    }

    const rideInfo = () => {
      return (
        <View>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              ...styles.rideInfoViewStyle,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                textAlign: isRtl ? "right" : "left",
                marginRight: isRtl ? 0 : Default.fixPadding,
                marginLeft: isRtl ? Default.fixPadding : 0,
                ...styles.rideInfoTextStyle,
              }}
            >
              {tr("rideInfo")}
            </Text>
            <RNTouchable
              onPress={() => navigation.navigate("mapView/mapViewScreen")}
            >
              <Text numberOfLines={1} style={styles.viewMapTextStyle}>
                {tr("viewMap")}
              </Text>
            </RNTouchable>
          </View>
          <View style={{ marginVertical: Default.fixPadding * 2 }}>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <View
                style={{
                  borderColor: Colors.green,
                  ...styles.locationCircleStyle,
                }}
              />
              <Text
                numberOfLines={1}
                style={{
                  textAlign: isRtl ? "right" : "left",
                  marginLeft: isRtl ? 0 : Default.fixPadding * 0.5,
                  marginRight: isRtl ? Default.fixPadding * 0.5 : 0,
                  ...styles.addressTextStyle,
                }}
              >
                Washinton sq.park, New Jersey 45463
              </Text>
            </View>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                marginTop: Default.fixPadding * 0.5,
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <View
                style={{
                  borderColor: Colors.primary,
                  ...styles.locationCircleStyle,
                }}
              />
              <Text
                numberOfLines={1}
                style={{
                  textAlign: isRtl ? "right" : "left",
                  marginLeft: isRtl ? 0 : Default.fixPadding * 0.5,
                  marginRight: isRtl ? Default.fixPadding * 0.5 : 0,
                  ...styles.addressTextStyle,
                }}
              >
                2464 Royal Ln. Mesa, New Jersey 45463
              </Text>
            </View>

            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                marginTop: Default.fixPadding * 2,
                marginHorizontal: Default.fixPadding * 1.5,
              }}
            >
              <View style={styles.rideTimeViewStyle}>
                <Text numberOfLines={1} style={styles.rideTimeTextStyle}>
                  {tr("startTime")}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ ...Fonts.Bold14grey, overflow: "hidden" }}
                >
                  24 may,09 :00PM
                </Text>
              </View>

              <View
                style={{
                  borderLeftWidth: 1,
                  borderLeftColor: Colors.lightGrey,
                  borderRightWidth: 1,
                  borderRightColor: Colors.lightGrey,
                  ...styles.rideTimeViewStyle,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    ...styles.rideTimeTextStyle,
                  }}
                >
                  {tr("returnTime")}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ ...Fonts.Bold14grey, overflow: "hidden" }}
                >
                  24 may,09 :00PM
                </Text>
              </View>

              <View style={styles.rideTimeViewStyle}>
                <Text numberOfLines={1} style={styles.rideTimeTextStyle}>
                  {tr("rideWith")}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ ...Fonts.Bold14grey, overflow: "hidden" }}
                >
                  {`249 ${tr("people")}`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    };

    const passengersList = [
      {
        key: "1",
        image: require("../../assets/images/users/user1.png"),
        name: "Cameron Williamson",
        emptySeat: false,
      },
      {
        key: "2",
        image: require("../../assets/images/users/user7.png"),
        name: "Brooklyn Simmons",
        emptySeat: false,
      },
      {
        key: "3",
        emptySeat: true,
      },
      {
        key: "4",
        emptySeat: true,
      },
    ];

    const renderItemPassengers = ({ item, index }) => {
      return (
        <View
          style={{
            marginLeft: isRtl
              ? 0
              : index === 0
              ? Default.fixPadding * 2
              : Default.fixPadding * 4.8,
            marginRight: isRtl
              ? index === 0
                ? Default.fixPadding * 2
                : Default.fixPadding * 4.8
              : 0,
            ...styles.renderItemPassengersViewStyle,
          }}
        >
          {item.emptySeat ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: Colors.lightGrey,
                ...styles.passengersImageStyle,
              }}
            >
              <Ionicons name="person" size={25} color={Colors.white} />
            </View>
          ) : (
            <Image source={item.image} style={styles.passengersImageStyle} />
          )}
          {item.emptySeat ? (
            <Text numberOfLines={2} style={styles.emptySeatTextStyle}>
              {tr("emptySeat")}
            </Text>
          ) : (
            <Text numberOfLines={2} style={styles.emptySeatTextStyle}>
              {item.name}
            </Text>
          )}
        </View>
      );
    };

    const coPassengers = () => {
      return (
        <View>
          <View style={styles.passengersAndVehicleInfoMainViewStyle}>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Bold16primary,
                textAlign: isRtl ? "right" : "left",
                overflow: "hidden",
              }}
            >
              {tr("coPassengers")}
              <Text style={{ ...Fonts.Bold14grey }}>{` (2 ${tr(
                "seatLeft"
              )})`}</Text>
            </Text>
          </View>

          <FlatList
            horizontal
            inverted={isRtl}
            data={passengersList}
            renderItem={renderItemPassengers}
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingRight: Default.fixPadding * 2,
            }}
          />
        </View>
      );
    };

    const vehicleInfo = () => {
      return (
        <View>
          <View style={styles.passengersAndVehicleInfoMainViewStyle}>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Bold16primary,
                textAlign: isRtl ? "right" : "left",
                overflow: "hidden",
              }}
            >
              {tr("vehicleInfo")}
            </Text>
          </View>

          <View
            style={{
              alignItems: isRtl ? "flex-end" : "flex-start",
              margin: Default.fixPadding * 2,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                textAlign: isRtl ? "right" : "left",
                ...styles.commonInfoTextStyle,
              }}
            >
              {tr("vehicleInfo")}
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold14grey, overflow: "hidden" }}
            >{`Audi A4 | Black | NYC 5514`}</Text>
            <View style={{ marginVertical: Default.fixPadding * 2.5 }}>
              <Text
                numberOfLines={1}
                style={{
                  textAlign: isRtl ? "right" : "left",
                  ...styles.commonInfoTextStyle,
                }}
              >
                {tr("facilities")}
              </Text>
              <Text
                numberOfLines={1}
                style={{ ...Fonts.Bold14grey, overflow: "hidden" }}
              >
                AC, Luggage space, music system
              </Text>
            </View>
            <Text numberOfLines={1} style={styles.commonInfoTextStyle}>
              {tr("instruction")}
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold14grey, overflow: "hidden" }}
            >
              Smoking not allowed, pets are allowed
            </Text>
          </View>
        </View>
      );
    };

    return (
      <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {rideInfo()}
          {coPassengers()}
          {vehicleInfo()}
        </ScrollView>
      </View>
    );
  };

  const ReviewTab = () => {
    const { t, i18n } = useTranslation();

    const isRtl = i18n.dir() == "rtl";

    function tr(key) {
      return t(`reviewTab:${key}`);
    }

    const overallRating = () => {
      return (
        <View style={styles.overallRatingViewStyle}>
          <Text style={styles.overallRatingTextStyle}>
            {tr("overallRating")}
          </Text>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              paddingHorizontal: Default.fixPadding * 0.7,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                numberOfLines={1}
                style={{ ...Fonts.SemiBold16black, overflow: "hidden" }}
              >
                4.5
              </Text>
              <View style={{ marginVertical: Default.fixPadding * 0.4 }}>
                <Stars
                  disabled
                  default={4}
                  count={5}
                  spacing={2}
                  half={false}
                  fullStar={
                    <AntDesign
                      name="star"
                      size={12}
                      color={Colors.lightYellow}
                    />
                  }
                  emptyStar={
                    <AntDesign
                      name={"star"}
                      size={12}
                      color={Colors.greyOpacity50}
                    />
                  }
                />
              </View>
              <Text
                numberOfLines={1}
                style={{ ...Fonts.Regular14grey, overflow: "hidden" }}
              >
                (125 review)
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                marginLeft: isRtl ? 0 : Default.fixPadding * 1.7,
                marginRight: isRtl ? Default.fixPadding * 1.7 : 0,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  marginBottom: Default.fixPadding * 0.9,
                }}
              >
                <Text numberOfLines={1} style={styles.ratingStarTextStyle}>
                  5 star
                </Text>

                <View
                  style={{
                    flex: 1,
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                  <ProgressBar
                    progress={0.75}
                    color={Colors.primary}
                    style={{
                      height: 4,
                      backgroundColor: Colors.extraLightAlto,
                    }}
                  />
                </View>
                <Text
                  numberOfLines={1}
                  style={{
                    ...styles.percentageTextStyle,
                    textAlign: isRtl ? "left" : "right",
                  }}
                >
                  75%
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  marginBottom: Default.fixPadding * 0.9,
                }}
              >
                <Text numberOfLines={1} style={styles.ratingStarTextStyle}>
                  4 star
                </Text>

                <View
                  style={{
                    flex: 1,
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                  <ProgressBar
                    progress={0.6}
                    color={Colors.primary}
                    style={{
                      height: 4,
                      backgroundColor: Colors.extraLightAlto,
                    }}
                  />
                </View>

                <Text
                  numberOfLines={1}
                  style={{
                    ...styles.percentageTextStyle,
                    textAlign: isRtl ? "left" : "right",
                  }}
                >
                  60%
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  marginBottom: Default.fixPadding * 0.9,
                }}
              >
                <Text numberOfLines={1} style={styles.ratingStarTextStyle}>
                  3 star
                </Text>

                <View
                  style={{
                    flex: 1,
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                  <ProgressBar
                    progress={0.5}
                    color={Colors.primary}
                    style={{
                      height: 4,
                      backgroundColor: Colors.extraLightAlto,
                    }}
                  />
                </View>

                <Text
                  numberOfLines={1}
                  style={{
                    ...styles.percentageTextStyle,
                    textAlign: isRtl ? "left" : "right",
                  }}
                >
                  50%
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                  marginBottom: Default.fixPadding * 0.9,
                }}
              >
                <Text numberOfLines={1} style={styles.ratingStarTextStyle}>
                  2 star
                </Text>

                <View
                  style={{
                    flex: 1,
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                  <ProgressBar
                    progress={0.2}
                    color={Colors.primary}
                    style={{
                      height: 4,
                      backgroundColor: Colors.extraLightAlto,
                    }}
                  />
                </View>
                <Text
                  numberOfLines={1}
                  style={{
                    ...styles.percentageTextStyle,
                    textAlign: isRtl ? "left" : "right",
                  }}
                >
                  05%
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: isRtl ? "row-reverse" : "row",
                  alignItems: "center",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    marginLeft: isRtl ? 0 : Default.fixPadding * 0.3,
                    marginRight: isRtl ? Default.fixPadding * 0.3 : 0,
                    ...styles.ratingStarTextStyle,
                  }}
                >
                  1 star
                </Text>

                <View
                  style={{
                    flex: 1,
                    marginHorizontal: Default.fixPadding,
                  }}
                >
                  <ProgressBar
                    progress={0.1}
                    color={Colors.primary}
                    style={{
                      height: 4,
                      backgroundColor: Colors.extraLightAlto,
                    }}
                  />
                </View>
                <Text
                  numberOfLines={1}
                  style={{
                    textAlign: isRtl ? "left" : "right",
                    ...styles.percentageTextStyle,
                  }}
                >
                  01%
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    };

    const reviewAndViewAll = () => {
      return (
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.reviewAndViewAllViewStyle,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              textAlign: isRtl ? "right" : "left",
              marginRight: isRtl ? 0 : Default.fixPadding,
              marginLeft: isRtl ? Default.fixPadding : 0,
              ...styles.reviewTitleTextStyle,
            }}
          >
            {tr("review")}
            <Text style={{ ...Fonts.Bold16black }}>({reviewList.length})</Text>
          </Text>
          <RNTouchable
            onPress={() => navigation.navigate("review/reviewScreen")}
          >
            <Text numberOfLines={1} style={styles.viewAllTextStyle}>
              {tr("viewAll")}
            </Text>
          </RNTouchable>
        </View>
      );
    };

    const reviewList = [
      {
        key: "1",
        image: require("../../assets/images/users/user8.png"),
        name: "Cameron Williamson",
        date: "9 June 2023",
        rating: 4,
        review:
          "Lorem ipsum dolor sit aconsectetur Plgpulvinsce lerisque sit diam at ullamccorper exu ut aliqViverra enimcs auctor fusce aliquam convallis. A mattis massa ualiquam acsd. ",
      },
      {
        key: "2",
        image: require("../../assets/images/users/user1.png"),
        name: "Guy Hawkins",
        date: "9 June 2023",
        rating: 5,
        review:
          "Lorem ipsum dolor sit aconsectetur Plgpulvinsce lerisque sit diam at ullamccorper exu ut aliqViverra enimcs auctor fusce aliquam convallis. A mattis massa ualiquam acsd. ",
      },
      {
        key: "3",
        image: require("../../assets/images/users/user2.png"),
        name: "Brooklyn Simmons",
        date: "8 June 2023",
        rating: 3,
        review:
          "Lorem ipsum dolor sit aconsectetur Plgpulvinsce lerisque sit diam at ullamccorper exu ut aliqViverra enimcs auctor fusce aliquam convallis. A mattis massa ualiquam acsd. ",
      },
      {
        key: "4",
        image: require("../../assets/images/users/user5.png"),
        name: "Leslie Alexander",
        date: "8 June 2023",
        rating: 4,
        review:
          "Lorem ipsum dolor sit aconsectetur Plgpulvinsce lerisque sit diam at ullamccorper exu ut aliqViverra enimcs auctor fusce aliquam convallis. A mattis massa ualiquam acsd. ",
      },
      {
        key: "5",
        image: require("../../assets/images/users/user9.png"),
        name: "Albert Flores",
        date: "8 June 2023",
        rating: 5,
        review:
          "Lorem ipsum dolor sit aconsectetur Plgpulvinsce lerisque sit diam at ullamccorper exu ut aliqViverra enimcs auctor fusce aliquam convallis. A mattis massa ualiquam acsd. ",
      },
    ];

    const renderItem = ({ item, index }) => {
      return (
        <View
          style={{
            borderTopWidth: index === 0 ? 0 : 1,
            paddingTop:
              index === 0 ? Default.fixPadding * 1.7 : Default.fixPadding * 2.7,
            ...styles.reviewViewStyle,
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
            }}
          >
            <Image
              source={item.image}
              style={{ width: 45, height: 45, borderRadius: 22.5 }}
            />
            <View
              style={{
                flex: 1,
                alignItems: isRtl ? "flex-end" : "flex-start",
                marginHorizontal: Default.fixPadding,
              }}
            >
              <Text
                numberOfLines={1}
                style={{ ...Fonts.SemiBold16black, overflow: "hidden" }}
              >
                {item.name}
              </Text>
              <View
                style={{
                  alignItems: "flex-start",
                  marginTop: Default.fixPadding * 0.3,
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
                    <AntDesign name={"star"} size={14} color={Colors.yellow} />
                  }
                  emptyStar={
                    <AntDesign
                      name={"star"}
                      size={14}
                      color={Colors.greyOpacity50}
                    />
                  }
                />
              </View>
            </View>
            <Text numberOfLines={1} style={styles.reviewDateTextStyle}>
              {item.date}
            </Text>
          </View>
          <Text
            style={{
              ...Fonts.SemiBold14grey,
              textAlign: isRtl ? "right" : "left",
              marginTop: Default.fixPadding,
            }}
          >
            {item.review}
          </Text>
        </View>
      );
    };
    return (
      <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
        <FlatList
          data={reviewList}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View>
              {overallRating()}
              {reviewAndViewAll()}
            </View>
          )}
        />
      </View>
    );
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "about", title: tr("about") },
    { key: "review", title: tr("review") },
  ]);

  const handleIndexChange = (idx) => setIndex(idx);

  const renderTabBar = (props) => {
    return (
      <View style={{ flexDirection: isRtl ? "row-reverse" : "row" }}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => setIndex(i)}
              style={{
                borderBottomColor: index === i ? Colors.primary : Colors.alto,
                ...styles.tabTouchableStyle,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...(index === i ? Fonts.Bold17primary : Fonts.Bold17grey),
                  overflow: "hidden",
                }}
              >
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderScene = SceneMap({
    about: AboutTab,
    review: ReviewTab,
  });

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <Header title={tr("riderProfile")} navigation={navigation} />
        {userDetails()}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={handleIndexChange}
        />
        {bottomButtonsView()}
      </View>
    </View>
  );
};

export default RiderProfileScreen;

const styles = StyleSheet.create({
  reviewTextStyle: {
    ...Fonts.Bold14grey,
    overflow: "hidden",
    maxWidth: 100,
  },
  tabTouchableStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: Default.fixPadding,
    borderBottomWidth: 2,
  },
  rideInfoViewStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Default.fixPadding,
    paddingHorizontal: Default.fixPadding * 2,
    backgroundColor: Colors.lightAlto,
  },
  rideInfoTextStyle: {
    flex: 1,
    overflow: "hidden",
    ...Fonts.Bold16primary,
  },
  locationCircleStyle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 4,
    backgroundColor: Colors.regularGrey,
  },
  addressTextStyle: {
    flex: 1,
    overflow: "hidden",
    ...Fonts.Medium14black,
  },
  rideTimeTextStyle: {
    overflow: "hidden",
    ...Fonts.Bold15darkGrey,
    marginBottom: Default.fixPadding * 0.5,
  },
  rideTimeViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Default.fixPadding * 0.5,
  },
  passengersAndVehicleInfoMainViewStyle: {
    paddingVertical: Default.fixPadding,
    paddingHorizontal: Default.fixPadding * 2,
    backgroundColor: Colors.lightAlto,
  },
  passengersImageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  emptySeatTextStyle: {
    overflow: "hidden",
    textAlign: "center",
    ...Fonts.SemiBold13black,
  },
  commonInfoTextStyle: {
    overflow: "hidden",
    ...Fonts.Bold14black,
    marginBottom: Default.fixPadding * 0.5,
  },
  bottomButtonsViewStyle: {
    alignItems: "center",
    marginVertical: Default.fixPadding * 2.2,
    marginHorizontal: Default.fixPadding * 2,
  },
  chatTouchableStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    ...Default.shadow,
  },
  requestRideTouchableStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.4,
    borderRadius: 10,
    borderWidth: 1,
  },
  reviewViewStyle: {
    marginHorizontal: Default.fixPadding * 2,
    borderTopColor: Colors.lightGrey,
    paddingBottom: Default.fixPadding * 2.7,
  },
  reviewDateTextStyle: {
    ...Fonts.SemiBold14grey,
    overflow: "hidden",
    maxWidth: 100,
  },
  reviewTitleTextStyle: {
    ...Fonts.Bold17black,
    overflow: "hidden",
    flex: 1,
  },
  reviewAndViewAllViewStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 2,
  },
  viewAllTextStyle: {
    ...Fonts.Bold14primary,
    overflow: "hidden",
    maxWidth: 80,
  },
  percentageTextStyle: {
    ...Fonts.SemiBold14grey,
    overflow: "hidden",
    maxWidth: 40,
  },
  ratingStarTextStyle: {
    ...Fonts.SemiBold14grey,
    overflow: "hidden",
    maxWidth: 45,
  },
  overallRatingViewStyle: {
    margin: Default.fixPadding * 2,
    paddingVertical: Default.fixPadding * 1.3,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  overallRatingTextStyle: {
    ...Fonts.Bold16black,
    textAlign: "center",
    marginBottom: Default.fixPadding * 1.7,
  },
  viewMapTextStyle: {
    ...Fonts.Bold15green,
    overflow: "hidden",
    maxWidth: 100,
  },
  renderItemPassengersViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 50,
    marginVertical: Default.fixPadding * 2,
  },
});
