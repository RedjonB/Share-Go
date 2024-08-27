import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation, useLocalSearchParams } from "expo-router";
import Header from "../../components/header";
import DashedLine from "react-native-dashed-line";
import CommonButton from "../../components/commonButton";

const AddMoneyScreen = () => {
  const navigation = useNavigation();

  const { key } = useLocalSearchParams();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`addMoneyScreen:${key}`);
  }
  const [addAmount, setAddAmount] = useState();

  const addAmountTitleAndTextInput = () => {
    return (
      <View
        style={{
          marginVertical: Default.fixPadding * 3,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text
          style={{ ...Fonts.Bold16black, textAlign: isRtl ? "right" : "left" }}
        >
          {tr("addAmount")}
        </Text>
        <TextInput
          value={addAmount}
          onChangeText={setAddAmount}
          keyboardType="number-pad"
          placeholder={tr("enterAmountAdd")}
          placeholderTextColor={Colors.grey}
          selectionColor={Colors.primary}
          style={{
            textAlign: isRtl ? "right" : "left",
            ...styles.textInputStyle,
          }}
        />
      </View>
    );
  };

  const dashLine = () => {
    return (
      <DashedLine
        dashGap={2.5}
        dashLength={2.5}
        dashThickness={1.5}
        dashColor={Colors.grey}
      />
    );
  };

  const paymentMethodList = [
    {
      key: "1",
      image: require("../../assets/images/payment/pay1.png"),
      name: "Creditcard",
    },
    {
      key: "2",
      image: require("../../assets/images/payment/pay2.png"),
      name: "Debit card",
    },
    {
      key: "3",
      image: require("../../assets/images/payment/pay3.png"),
      name: "Visa card",
    },
    {
      key: "4",
      image: require("../../assets/images/payment/pay4.png"),
      name: "Paypal",
    },
    {
      key: "5",
      image: require("../../assets/images/payment/pay5.png"),
      name: "Google pay",
    },
  ];

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Creditcard");

  const paymentMethod = () => {
    return (
      <View
        style={{
          marginTop: Default.fixPadding * 3,
        }}
      >
        <Text
          style={{
            ...Fonts.Bold16black,
            textAlign: isRtl ? "right" : "left",
            marginHorizontal: Default.fixPadding * 2,
          }}
        >
          {tr("selectPaymentMethod")}
        </Text>

        <View style={styles.whiteBoxStyle}>
          {paymentMethodList.map((item, index) => {
            const isSelected = selectedPaymentMethod === item.name;
            return (
              <View
                key={index}
                style={{
                  borderTopColor: Colors.lightGrey,
                  borderTopWidth: index === 0 ? 0 : 1,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setSelectedPaymentMethod(item.name)}
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                    ...styles.payTouchableStyle,
                  }}
                >
                  <View style={styles.imageViewStyle}>
                    <Image
                      source={item.image}
                      style={{ width: 26, height: 20, resizeMode: "contain" }}
                    />
                  </View>
                  <Text
                    numberOfLines={1}
                    style={{
                      textAlign: isRtl ? "right" : "left",
                      ...styles.payMethodNameTextStyle,
                    }}
                  >
                    {item.name}
                  </Text>
                  <View
                    style={{
                      borderColor: isSelected ? Colors.primary : Colors.white,
                      ...styles.circleViewStyle,
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  };
  return (
    <View style={{ backgroundColor: Colors.regularGrey, flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={tr("addMoney")} navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          {addAmountTitleAndTextInput()}
          {dashLine()}
          {paymentMethod()}
        </ScrollView>
        <CommonButton
          title={tr("addMoney")}
          onPress={() =>
            navigation.navigate("creditCard/creditCardScreen", { key })
          }
        />
      </View>
    </View>
  );
};

export default AddMoneyScreen;

const styles = StyleSheet.create({
  textInputStyle: {
    ...Fonts.SemiBold16black,
    marginTop: Default.fixPadding,
    padding: Default.fixPadding * 1.5,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  whiteBoxStyle: {
    marginHorizontal: Default.fixPadding * 2,
    marginVertical: Default.fixPadding * 1.5,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  payMethodNameTextStyle: {
    ...Fonts.SemiBold15black,
    flex: 1,
    overflow: "hidden",
    marginHorizontal: Default.fixPadding * 2,
  },
  circleViewStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 8,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  payTouchableStyle: {
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.5,
    paddingHorizontal: Default.fixPadding * 1.2,
  },
  imageViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 27,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.alto,
    backgroundColor: Colors.white,
  },
});
