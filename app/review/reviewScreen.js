import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import Header from "../../components/header";
import Stars from "react-native-stars";

const ReviewScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`reviewScreen:${key}`);
  }
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
    {
      key: "6",
      image: require("../../assets/images/users/user4.png"),
      name: "John Williamson",
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
            index === 0 ? Default.fixPadding * 2 : Default.fixPadding * 2.5,
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
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={tr("review")} navigation={navigation} />
        <FlatList
          data={reviewList}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
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
});
