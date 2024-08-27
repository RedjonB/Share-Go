import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import MyStatusBar from "../../../components/myStatusBar";
import { useTranslation } from "react-i18next";
import { Colors, Default, Fonts } from "../../../constants/styles";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { RNTouchable } from "../../../components/rNTouchable";
import DashedLine from "react-native-dashed-line";
import { useNavigation } from "expo-router";
import { TabView, SceneMap } from "react-native-tab-view";
import { useFocusEffect } from "@react-navigation/native";

const MyTripScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`myTripScreen:${key}`);
  }
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setRoutes([
        { key: "myPool", title: tr("myPool") },
        { key: "requestPool", title: tr("requestPool") },
      ]);
    }, [])
  );

  const handleIndexChange = (idx) => setIndex(idx);

  const MyPool = () => {
    const myPoolList = [
      {
        key: "1",
        image: require("../../../assets/images/users/user11.png"),
        name: "Hawkins",
        date: "Today",
        time: "10 :30 pm",
        sourceLocation: "6391 Elgin St. Celina,",
        destinationLocation: "2464 Royal Ln. Mesa, ",
      },
      {
        key: "2",
        image: require("../../../assets/images/users/user12.png"),
        name: "Wilson",
        date: "22 June ",
        time: "10 :30 pm",
        sourceLocation: "6391 Elgin St. Celina,",
        destinationLocation: "2464 Royal Ln. Mesa, ",
      },
      {
        key: "3",
        image: require("../../../assets/images/users/user13.png"),
        name: "Elenora",
        date: "23 June",
        time: "10 :30 pm",
        sourceLocation: "6391 Elgin St. Celina,",
        destinationLocation: "2464 Royal Ln. Mesa, ",
      },
      {
        key: "4",
        image: require("../../../assets/images/users/user14.png"),
        name: "Jacob",
        date: "24 June ",
        time: "10 :30 pm",
        sourceLocation: "6391 Elgin St. Celina,",
        destinationLocation: "2464 Royal Ln. Mesa, ",
      },
      {
        key: "5",
        image: require("../../../assets/images/users/user15.png"),
        name: "Jenny",
        date: "25 June ",
        time: "10 :30 pm",
        sourceLocation: "6391 Elgin St. Celina,",
        destinationLocation: "2464 Royal Ln. Mesa, ",
      },
      {
        key: "6",
        image: require("../../../assets/images/users/user16.png"),
        name: "Sojit",
        date: "26 june",
        time: "10 :30 pm",
        sourceLocation: "6391 Elgin St. Celina,",
        destinationLocation: "2464 Royal Ln. Mesa, ",
      },
    ];

    const renderItem = ({ item }) => {
      return (
        <RNTouchable
          onPress={() =>
            navigation.navigate("riderProfile/riderProfileScreen", {
              image: item.image,
              name: item.name,
              key: "2",
            })
          }
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.renderItemMyPoolTouchableStyle,
          }}
        >
          <View style={{ alignItems: "center", width: 42 }}>
            <View
              style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
            >
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
              marginRight: isRtl
                ? Default.fixPadding * 2.4
                : Default.fixPadding,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                overflow: "hidden",
                ...Fonts.SemiBold14black,
                marginBottom: Default.fixPadding * 0.6,
              }}
            >{`${item.date} | ${item.time}`}</Text>
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
                style={{
                  flex: 1,
                  alignItems: isRtl ? "flex-end" : "flex-start",
                }}
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
          <View style={styles.poolInfoViewStyle}>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold15white, overflow: "hidden" }}
            >
              {tr("poolInfo")}
            </Text>
          </View>
        </RNTouchable>
      );
    };
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={myPoolList}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: Default.fixPadding * 0.7 }}
        />
      </View>
    );
  };

  const RequestForPool = () => {
    const requestForPoolList = [
      {
        key: "1",
        date: "Today",
        time: "10 :30 pm",
        sourceLocation: "6391 Elgin St. Celina,",
        destinationLocation: "2464 Royal Ln. Mesa,",
        requests: "2",
        images: [
          {
            key: "1",
            image: require("../../../assets/images/users/user15.png"),
          },

          {
            key: "2",
            image: require("../../../assets/images/users/user17.png"),
          },
          {
            key: "3",
            image: require("../../../assets/images/users/user19.png"),
          },
          {
            key: "4",
            image: require("../../../assets/images/users/user18.png"),
          },
        ],
      },
      {
        key: "2",
        date: "22 june",
        time: "10 :30 pm",
        sourceLocation: "6391 Elgin St. Celina,",
        destinationLocation: "2464 Royal Ln. Mesa,",
        requests: "4",
        images: [
          {
            key: "1",
            image: require("../../../assets/images/users/user11.png"),
          },
          {
            key: "2",
            image: require("../../../assets/images/users/user16.png"),
          },
          { key: "3" },
          { key: "4" },
        ],
      },
      {
        key: "3",
        date: "23 june",
        time: "10 :30 pm",
        sourceLocation: "6391 Elgin St. Celina,",
        destinationLocation: "2464 Royal Ln. Mesa,",
        requests: "4",
        images: [
          {
            key: "1",
            image: require("../../../assets/images/users/user20.png"),
          },
          {
            key: "2",
            image: require("../../../assets/images/users/user3.png"),
          },
          {
            key: "3",
            image: require("../../../assets/images/users/user7.png"),
          },
          { key: "4" },
        ],
      },
      {
        key: "4",
        date: "24 june",
        time: "10 :30 pm",
        sourceLocation: "6391 Elgin St. Celina,",
        destinationLocation: "2464 Royal Ln. Mesa,",
        requests: "4",
        images: [
          {
            key: "1",
            image: require("../../../assets/images/users/user14.png"),
          },
          { key: "2" },
          { key: "3" },
          { key: "4" },
        ],
      },
    ];

    const renderItem = ({ item }) => {
      return (
        <RNTouchable
          onPress={() => navigation.navigate("rideInfo/rideInfoScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            ...styles.renderItemRequestPoolStyle,
          }}
        >
          <View>
            <FlatList
              numColumns={2}
              data={item.images}
              keyExtractor={(item) => item.key}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      marginTop:
                        index === 0 || index === 1
                          ? 0
                          : Default.fixPadding * 0.5,
                      marginLeft: isRtl ? 0 : Default.fixPadding,
                      marginRight: isRtl ? Default.fixPadding : 0,
                    }}
                  >
                    {item.image ? (
                      <Image
                        source={item.image}
                        style={{ width: 30, height: 30, borderRadius: 15 }}
                      />
                    ) : (
                      <View style={styles.userLightGreyViewStyle}>
                        <FontAwesome
                          name="user"
                          size={18}
                          color={Colors.white}
                        />
                      </View>
                    )}
                  </View>
                );
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: isRtl ? "flex-end" : "flex-start",
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                overflow: "hidden",
                ...Fonts.SemiBold14black,
                marginBottom: Default.fixPadding * 0.6,
              }}
            >{`${item.date} | ${item.time}`}</Text>
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
              <View style={{ flex: 1 }}>
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
          <RNTouchable
            onPress={() => navigation.navigate("poolRequest/poolRequestScreen")}
            style={{
              marginRight: isRtl ? 0 : Default.fixPadding,
              marginLeft: isRtl ? Default.fixPadding : 0,
              ...styles.requestTouchableStyle,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold15white, overflow: "hidden" }}
            >
              {`${tr("requests")}(${item.requests})`}
            </Text>
          </RNTouchable>
        </RNTouchable>
      );
    };
    return (
      <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
        <FlatList
          data={requestForPoolList}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: Default.fixPadding * 0.7 }}
        />
      </View>
    );
  };

  const renderScene = SceneMap({
    myPool: MyPool,
    requestPool: RequestForPool,
  });

  const renderTabBar = (props) => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          marginHorizontal: Default.fixPadding * 0.5,
        }}
      >
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => setIndex(i)}
              style={styles.tabTouchableStyle}
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

  const header = () => {
    return (
      <View style={styles.headerViewStyle}>
        <Text style={{ ...Fonts.Bold18primary }}>{tr("myTrip")}</Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={handleIndexChange}
        />
      </View>
    </View>
  );
};

export default MyTripScreen;

const styles = StyleSheet.create({
  headerViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 2.1,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  tabTouchableStyle: {
    flexShrink: 1,
    marginHorizontal: Default.fixPadding * 1.5,
    marginTop: Default.fixPadding * 1.5,
    marginBottom: Default.fixPadding * 0.8,
  },
  renderItemMyPoolTouchableStyle: {
    alignItems: "center",
    padding: Default.fixPadding * 0.9,
    marginBottom: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  poolInfoViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 78,
    paddingVertical: Default.fixPadding * 0.6,
    paddingHorizontal: Default.fixPadding * 0.3,
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
  renderItemRequestPoolStyle: {
    paddingVertical: Default.fixPadding,
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 2.8,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  requestTouchableStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 110,
    paddingVertical: Default.fixPadding * 0.8,
    paddingHorizontal: Default.fixPadding * 0.3,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    ...Default.shadow,
  },
  userLightGreyViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.lightGrey,
  },
});
