import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import Header from "../../components/header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CommonButton from "../../components/commonButton";
import { SwipeListView } from "react-native-swipe-list-view";
import SnackbarToast from "../../components/snackbarToast";

const MyCarScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`myCarScreen:${key}`);
  }
  const [removeToast, setRemoveToast] = useState(false);
  const onDismiss = () => setRemoveToast(false);

  const myCarList = [
    {
      key: "1",
      image: require("../../assets/images/car1.png"),
      name: "Audi A4",
      other: "Sedan",
      color: "Black",
      other2: "NYC 5514",
      seat: "4",
    },
    {
      key: "2",
      image: require("../../assets/images/car2.png"),
      name: "Toyota Matrix",
      other: "Hatchbacks",
      color: "Blue",
      other2: "NYC 5514",
      seat: "4",
    },
  ];

  const [myCarData, setMyCarData] = useState(
    myCarList.map((item, index) => ({
      key: `${index}`,
      image: item.image,
      name: item.name,
      other: item.other,
      color: item.color,
      other2: item.other2,
      seat: item.seat,
    }))
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...myCarData];
    const prevIndex = myCarData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setMyCarData(newData);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: Colors.regularGrey }}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingRight: isRtl ? 0 : Default.fixPadding * 0.4,
            paddingLeft: isRtl ? Default.fixPadding * 0.4 : 0,
            ...styles.renderItemViewStyle,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: isRtl ? "flex-end" : "flex-start",
              marginHorizontal: Default.fixPadding,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold15primary, overflow: "hidden" }}
            >
              {item.name}
            </Text>

            <Text
              numberOfLines={1}
              style={{
                ...Fonts.SemiBold15black,
                overflow: "hidden",
                marginVertical: Default.fixPadding * 0.3,
              }}
            >
              {item.other}
              <Text style={{ color: Colors.grey }}>{` | `}</Text>
              {item.color}
              <Text style={{ color: Colors.grey }}>{` | `}</Text>
              {item.other2}
            </Text>
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold15grey, overflow: "hidden" }}
            >
              {`${item.seat} ${tr("seat")}`}
            </Text>
          </View>
          <Image
            source={item.image}
            style={{ width: 113, height: 55.7, resizeMode: "contain" }}
          />
        </View>
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <TouchableOpacity
        style={{
          right: isRtl ? null : 0,
          ...styles.backRightBtnRight,
        }}
        onPress={() => {
          deleteRow(rowMap, data.item.key);
          setRemoveToast(true);
        }}
      >
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={24}
          color={Colors.white}
        />
      </TouchableOpacity>
    );
  };

  const emptyMyCar = () => {
    return (
      <View style={styles.emptyViewStyle}>
        <MaterialCommunityIcons name="car" size={48} color={Colors.grey} />
        <Text style={styles.emptyTextStyle}>{tr("carNotAdded")}</Text>
      </View>
    );
  };

  const myCarSwipeListView = () => {
    return (
      <SwipeListView
        data={myCarData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={isRtl ? 0 : -51}
        leftOpenValue={isRtl ? 51 : 0}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: Default.fixPadding * 2 }}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={tr("myCar")} navigation={navigation} />
        {myCarData.length === 0 ? emptyMyCar() : myCarSwipeListView()}

        <CommonButton
          title={tr("addNewCar")}
          onPress={() => navigation.navigate("addNewCar/addNewCarScreen")}
        />
        <SnackbarToast
          title={tr("removed")}
          visible={removeToast}
          onDismiss={onDismiss}
        />
      </View>
    </View>
  );
};

export default MyCarScreen;

const styles = StyleSheet.create({
  renderItemViewStyle: {
    alignItems: "center",
    marginBottom: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding * 2,
    paddingVertical: Default.fixPadding * 0.8,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  backRightBtnRight: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 49,
    marginBottom: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.red,
  },
  emptyViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 2,
  },
  emptyTextStyle: {
    textAlign: "center",
    ...Fonts.Bold18grey,
    marginTop: Default.fixPadding * 0.3,
  },
});
