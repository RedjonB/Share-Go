import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation, useLocalSearchParams } from "expo-router";
import Header from "../../components/header";
import CommonButton from "../../components/commonButton";
import CreditCard from "react-native-credit-card-ui";
import * as cardValidator from "card-validator";

const { width } = Dimensions.get("window");

const CreditCardScreen = () => {
  const navigation = useNavigation();
  const { key } = useLocalSearchParams();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`creditCardScreen:${key}`);
  }

  const [focused, setFocused] = useState("name");
  const [backspaceRemove, setBackspaceRemove] = useState(false);

  const [name, setName] = useState("");
  const [isValidName, setIsValidName] = useState(true);

  const [number, setNumber] = useState("");
  const [isValidNumber, setIsValidNumber] = useState(true);

  const [cvvCode, setCvvCode] = useState("");
  const [isValidCvv, setIsValidCvv] = useState(true);

  const [expiryDate, setExpiryDate] = useState("");
  const [isValidExpiry, setIsValidExpiry] = useState(true);

  const handleExpiryDate = (text) => {
    let textTemp = text;
    if (textTemp[0] !== "1" && textTemp[0] !== "0") {
      textTemp = "";
    }
    if (textTemp.length === 2) {
      if (
        parseInt(textTemp.substring(0, 2)) > 12 ||
        parseInt(textTemp.substring(0, 2)) == 0
      ) {
        textTemp = textTemp[0];
      } else if (text.length === 2 && !backspaceRemove) {
        textTemp += "/";
        setBackspaceRemove(true);
      } else if (text.length === 2 && backspaceRemove) {
        textTemp = textTemp[0];
        setBackspaceRemove(false);
      } else {
        textTemp = textTemp[0];
      }
    }
    setExpiryDate(textTemp);
    let expireDateValidation = cardValidator.expirationDate(textTemp);
    setIsValidExpiry(expireDateValidation.isValid);
  };

  const [cardType, setCardType] = useState("mastercard");

  const getCardType = (number) => {
    const visaRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercardRegEx = /^5[1-5][0-9]{14}$/;
    const amexRegEx = /^3[47][0-9]{13}$/;
    const discoverRegEx = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

    if (visaRegEx.test(number)) return "visa";
    if (mastercardRegEx.test(number)) return "mastercard";
    if (amexRegEx.test(number)) return "amex";
    if (discoverRegEx.test(number)) return "discover";
    return "mastercard";
  };

  const handleCardNumberChange = (value) => {
    let formattedText = value.split(" ").join("");
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp(".{1,4}", "g")).join(" ");
    }
    setCardType(getCardType(value));
    if (formattedText.length === 19) {
      var numberValidation = cardValidator.number(value);
      setIsValidNumber(numberValidation.isValid);
    } else {
      setIsValidNumber(false);
    }
    setNumber(formattedText);
  };

  const formattedNumber = number.replace(/\s/g, "");

  const creditCard = () => {
    return (
      <CreditCard
        type={cardType}
        imageFront={require("../../assets/images/card.png")}
        imageBack={require("../../assets/images/card.png")}
        shiny={false}
        bar={true}
        flip={false}
        focused={focused}
        width={width * 0.9}
        height={220}
        number={formattedNumber}
        name={name}
        expiry={expiryDate}
        cvc={cvvCode}
        style={{
          marginVertical: Default.fixPadding * 2,
          alignSelf: "center",
        }}
      />
    );
  };

  const allTextInput = () => {
    return (
      <View
        style={{
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text
          style={{
            ...Fonts.SemiBold16grey,
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {tr("nameCard")}
        </Text>

        <TextInput
          value={name}
          onChangeText={(text) => {
            setFocused("name");
            setName(text);
            let nameValidation = cardValidator.cardholderName(text);
            setIsValidName(nameValidation.isValid);
          }}
          placeholder={tr("enterName")}
          placeholderTextColor={Colors.grey}
          selectionColor={Colors.primary}
          style={{
            ...(isValidName ? Fonts.SemiBold16black : Fonts.SemiBold16red),
            textAlign: isRtl ? "right" : "left",
            marginBottom: Default.fixPadding * 2,
            ...styles.textInput,
          }}
        />
        <Text
          style={{
            ...Fonts.SemiBold16grey,
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {tr("cardNumber")}
        </Text>

        <TextInput
          maxLength={19}
          value={number}
          onChangeText={(text) => {
            setFocused("number");
            handleCardNumberChange(text);
          }}
          keyboardType={"number-pad"}
          placeholder={tr("enterNumber")}
          placeholderTextColor={Colors.grey}
          selectionColor={Colors.primary}
          style={{
            ...(isValidNumber ? Fonts.SemiBold16black : Fonts.SemiBold16red),
            textAlign: isRtl ? "right" : "left",
            marginBottom: Default.fixPadding * 2,
            ...styles.textInput,
          }}
        />

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginBottom: Default.fixPadding * 1.5,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                ...Fonts.SemiBold16grey,
                textAlign: isRtl ? "right" : "left",
              }}
            >
              {tr("expireDate")}
            </Text>

            <TextInput
              maxLength={5}
              value={expiryDate}
              keyboardType="decimal-pad"
              onChangeText={(text) => {
                setFocused("expiry");
                handleExpiryDate(text);
              }}
              selectionColor={Colors.primary}
              placeholder={tr("expireDate")}
              placeholderTextColor={Colors.grey}
              style={{
                ...(isValidExpiry
                  ? Fonts.SemiBold16black
                  : Fonts.SemiBold16red),
                textAlign: isRtl ? "right" : "left",
                marginRight: isRtl ? 0 : Default.fixPadding * 2,
                marginLeft: isRtl ? Default.fixPadding * 2 : 0,
                ...styles.textInput,
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                ...Fonts.SemiBold16grey,
                textAlign: isRtl ? "right" : "left",
              }}
            >
              CVV
            </Text>

            <TextInput
              maxLength={3}
              value={cvvCode}
              secureTextEntry={true}
              keyboardType="number-pad"
              onChangeText={(text) => {
                setFocused("cvc");
                setCvvCode(text);
                if (text.length === 3) {
                  var cvvValidation = cardValidator.cvv(text);
                  setIsValidCvv(cvvValidation.isValid);
                } else {
                  setIsValidCvv(false);
                }
              }}
              selectionColor={Colors.primary}
              placeholder={`CVV`}
              placeholderTextColor={Colors.grey}
              style={{
                ...(isValidCvv ? Fonts.SemiBold16black : Fonts.SemiBold16red),
                textAlign: isRtl ? "right" : "left",
                ...styles.textInput,
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={"Credit card"} navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          {creditCard()}
          {allTextInput()}
        </ScrollView>
        <CommonButton
          title={tr("continue")}
          onPress={() =>
            navigation.navigate("successTransaction/successTransactionScreen", {
              key,
            })
          }
        />
      </View>
    </View>
  );
};

export default CreditCardScreen;

const styles = StyleSheet.create({
  textInput: {
    padding: Default.fixPadding * 1.5,
    marginTop: Default.fixPadding * 0.9,
    borderRadius: 5,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
