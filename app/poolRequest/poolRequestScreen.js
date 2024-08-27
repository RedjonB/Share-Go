import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import Header from "../../components/header";
import DashedLine from "react-native-dashed-line";
import { RNTouchable } from "../../components/rNTouchable";

const PoolRequestScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`poolRequestScreen:${key}`);
  }

  const poolRequestList = [
    {
      key: "1",
      image: require("../../assets/images/users/user15.png"),
      name: "Jenny wilsom",
      sourceLocation: "6391 Elgin St. Celina, ",
      destinationLocation: "2464 Royal Ln. Mesa, ",
      price: "$13.50",
      seat: "1",
    },
    {
      key: "2",
      image: require("../../assets/images/users/user20.png"),
      name: "Cameron Williamson",
      sourceLocation: "6391 Elgin St. Celina, ",
      destinationLocation: "Gray St. Utica, Pennsylvania",
      price: "$20.50",
      seat: "2",
    },
    {
      key: "3",
      image: require("../../assets/images/users/user3.png"),
      name: "Cameron Williamson",
      sourceLocation: "Gray St. Utica, Pennsylvania..",
      destinationLocation: "2464 Royal Ln. Mesa, ",
      price: "$10.50",
      seat: "1",
    },
    {
      key: "4",
      image: require("../../assets/images/users/user2.png"),
      name: "Robert Fox",
      sourceLocation: "6391 Elgin St. Celina, ",
      destinationLocation: " Ranchview Dr. Richardson",
      price: "$12.50",
      seat: "1",
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.renderItemViewStyle}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <Image
            source={item.image}
            style={{ width: 65, height: 65, borderRadius: 32.5 }}
          />
          <View
            style={{
              flex: 1,
              alignItems: isRtl ? "flex-end" : "flex-start",
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold16black, overflow: "hidden" }}
            >
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                marginTop: Default.fixPadding * 0.8,
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
                  style={{ height: 10 }}
                />
                <View
                  style={{
                    borderColor: Colors.primary,
                    ...styles.circleViewStyle,
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <View>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.SemiBold12grey,
                      overflow: "hidden",
                      textAlign: isRtl ? "right" : "left",
                    }}
                  >
                    {item.sourceLocation}
                  </Text>
                </View>

                <View style={{ paddingTop: Default.fixPadding }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      ...Fonts.SemiBold12grey,
                      overflow: "hidden",
                      textAlign: isRtl ? "right" : "left",
                    }}
                  >
                    {item.destinationLocation}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.Bold16primary,
                marginBottom: Default.fixPadding * 0.2,
                ...styles.commonTextStyle,
              }}
            >
              {item.price}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold14grey,
                ...styles.commonTextStyle,
              }}
            >{`${item.seat} ${tr("seat")}`}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            marginTop: Default.fixPadding * 2,
          }}
        >
          <View
            style={{ backgroundColor: Colors.white, ...styles.buttonStyle }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold16primary, overflow: "hidden" }}
            >
              {tr("decline")}
            </Text>
          </View>
          <RNTouchable
            onPress={() => navigation.navigate("rideInfo/rideInfoScreen")}
            style={{
              marginLeft: isRtl ? 0 : Default.fixPadding * 2.4,
              marginRight: isRtl ? Default.fixPadding * 2.4 : 0,
              backgroundColor: Colors.primary,
              ...styles.buttonStyle,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold16white, overflow: "hidden" }}
            >
              {tr("accept")}
            </Text>
          </RNTouchable>
        </View>
      </View>
    );
  };

  const poolRequestFlatList = () => {
    return (
      <FlatList
        data={poolRequestList}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: Default.fixPadding * 2 }}
      />
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={tr("poolTakerRequest")} navigation={navigation} />
        {poolRequestFlatList()}
      </View>
    </View>
  );
};

export default PoolRequestScreen;

const styles = StyleSheet.create({
  renderItemViewStyle: {
    paddingVertical: Default.fixPadding * 1.4,
    paddingHorizontal: Default.fixPadding * 1.5,
    marginBottom: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding,
    borderRadius: 5,
    ...Default.shadow,
  },
  circleViewStyle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 5,
    backgroundColor: Colors.white,
  },
  commonTextStyle: {
    overflow: "hidden",
    maxWidth: 60,
  },
});
