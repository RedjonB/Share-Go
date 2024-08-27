import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import Header from "../../components/header";
import { Ionicons } from "@expo/vector-icons";
import { RNTouchable } from "../../components/rNTouchable";

const WalletScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`walletScreen:${key}`);
  }

  const walletTransactionList = [
    {
      key: "1",
      title: "Paid to rider",
      name: "Jenny Wilson",
      amount: "$24.00",
      dateAndTime: "11 june , 11:20am",
    },
    {
      key: "2",
      title: "Add to wallet",
      name: "Leslie Alexander",
      amount: "$150.00",
      dateAndTime: "11 june , 10:30am",
    },
    {
      key: "3",
      title: "Paid to rider",
      name: "Guy Hawkins",
      amount: "$24.00",
      dateAndTime: "12 june , 8:10am",
    },
    {
      key: "4",
      title: "Receive from ride taker",
      name: "Jacob Jones",
      amount: "$15.00",
      dateAndTime: "13 june , 9:30pm",
    },
    {
      key: "5",
      title: "Paid to rider",
      name: "Esther Howard",
      amount: "$24.00",
      dateAndTime: "14 june , 5:20pm",
    },
    {
      key: "6",
      title: "Add to wallet",
      name: "Jane Cooper",
      amount: "$150.00",
      dateAndTime: "14 june , 10:20am",
    },
    {
      key: "7",
      title: "Paid to rider",
      name: "Albert Flores",
      amount: "$24.00",
      dateAndTime: "15 june , 10:40am",
    },
    {
      key: "8",
      title: "Paid to rider",
      name: "Ralph Edwards",
      amount: "$24.00",
      dateAndTime: "16 june , 11:20am",
    },
    {
      key: "9",
      title: "Receive from ride taker",
      name: "Savannah Nguyen",
      amount: "$15.00",
      dateAndTime: "17 june , 7:20am",
    },
    {
      key: "10",
      title: "Paid to rider",
      name: "Devon Lane",
      amount: "$24.00",
      dateAndTime: "17 june , 3:20pm",
    },
  ];

  const renderItem = ({ item, index }) => {
    const paidToRider = item.title === "Paid to rider";
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          borderTopWidth: index === 0 ? 0 : 1,
          ...styles.renderItemViewStyle,
        }}
      >
        <View
          style={{
            backgroundColor: paidToRider
              ? Colors.lightRedOpacity50
              : Colors.greenOpacity20,
            ...styles.circleStyle,
          }}
        >
          <Ionicons
            name="wallet-outline"
            size={20}
            color={paidToRider ? Colors.red : Colors.green}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: isRtl ? "flex-end" : "flex-start",
            marginHorizontal: Default.fixPadding,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              overflow: "hidden",
              ...Fonts.SemiBold16black,
              marginBottom: Default.fixPadding * 0.3,
            }}
          >
            {item.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.SemiBold14grey, overflow: "hidden" }}
          >
            {item.name}
          </Text>
        </View>

        <View>
          <Text
            numberOfLines={1}
            style={{
              ...(paidToRider ? Fonts.SemiBold16red : Fonts.SemiBold16green),
              marginBottom: Default.fixPadding * 0.3,
              textAlign: isRtl ? "left" : "right",
              ...styles.amountAndDateTextStyle,
            }}
          >
            {item.amount}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.SemiBold14grey,
              ...styles.amountAndDateTextStyle,
            }}
          >
            {item.dateAndTime}
          </Text>
        </View>
      </View>
    );
  };

  const listHeaderComponent = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.imageContainerStyle,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: isRtl ? "flex-end" : "flex-start",
              marginRight: isRtl ? 0 : Default.fixPadding,
              marginLeft: isRtl ? Default.fixPadding : 0,
            }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold18primary, overflow: "hidden" }}
            >
              $110.00
            </Text>
            <Text numberOfLines={1} style={styles.totalBalanceTextStyle}>
              {tr("totalBalance")}
            </Text>
          </View>
          <Image
            source={require("../../assets/images/wallet.png")}
            style={{ width: 142, height: 142 }}
          />
        </View>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
            marginHorizontal: Default.fixPadding,
          }}
        >
          <RNTouchable
            onPress={() =>
              navigation.navigate("addMoney/addMoneyScreen", { key: "1" })
            }
            style={{ backgroundColor: Colors.primary, ...styles.buttonsStyle }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold16white, overflow: "hidden" }}
            >
              {tr("addMoney")}
            </Text>
          </RNTouchable>
          <RNTouchable
            onPress={() =>
              navigation.navigate("sendToBank/sendToBankScreen", { key: "2" })
            }
            style={{ backgroundColor: Colors.white, ...styles.buttonsStyle }}
          >
            <Text
              numberOfLines={1}
              style={{ ...Fonts.Bold16black, overflow: "hidden" }}
            >
              {tr("sendBank")}
            </Text>
          </RNTouchable>
        </View>

        <Text
          numberOfLines={1}
          style={{
            textAlign: isRtl ? "right" : "left",
            ...styles.recentTransactionTextStyle,
          }}
        >
          {tr("recentTransaction")}
        </Text>
      </View>
    );
  };

  const recentTransactionFlatList = () => {
    return (
      <FlatList
        data={walletTransactionList}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={listHeaderComponent()}
      />
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={tr("wallet")} navigation={navigation} />
        {recentTransactionFlatList()}
      </View>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  imageContainerStyle: {
    alignItems: "center",
    marginTop: Default.fixPadding * 0.5,
    marginBottom: Default.fixPadding,
    marginHorizontal: Default.fixPadding * 2,
  },
  recentTransactionTextStyle: {
    ...Fonts.Bold16black,
    overflow: "hidden",
    marginTop: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 0.5,
    marginHorizontal: Default.fixPadding * 2,
  },
  renderItemViewStyle: {
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.5,
    marginHorizontal: Default.fixPadding * 2,
    borderTopColor: Colors.lightGreyOpacity50,
  },
  circleStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  amountAndDateTextStyle: {
    overflow: "hidden",
    maxWidth: 120,
  },
  totalBalanceTextStyle: {
    ...Fonts.Bold16black,
    overflow: "hidden",
    marginTop: Default.fixPadding * 0.5,
  },
  buttonsStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.3,
    marginHorizontal: Default.fixPadding,
    borderRadius: 5,
    ...Default.shadow,
  },
});
