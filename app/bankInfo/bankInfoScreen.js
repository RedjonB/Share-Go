import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation, useLocalSearchParams } from "expo-router";
import Header from "../../components/header";
import CommonButton from "../../components/commonButton";

const BankInfoScreen = () => {
  const { key } = useLocalSearchParams();

  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`bankInfoScreen:${key}`);
  }

  const [accountHolderName, setAccountHolderName] = useState();
  const [bankName, setBankName] = useState();
  const [branchCode, setBranchCode] = useState();
  const [accountNumber, setAccountNumber] = useState();

  const accountHolderNameAndTitle = () => {
    return (
      <View
        style={{
          marginTop: Default.fixPadding * 2,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text
          style={{
            ...Fonts.SemiBold16black,
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {tr("accountHolderName")}
        </Text>

        <TextInput
          value={accountHolderName}
          onChangeText={setAccountHolderName}
          placeholder={tr("enterAccountHolderName")}
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

  const bankNameAndTitle = () => {
    return (
      <View
        style={{
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text
          style={{
            ...Fonts.SemiBold16black,
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {tr("bankName")}
        </Text>

        <TextInput
          value={bankName}
          onChangeText={setBankName}
          placeholder={tr("enterBankName")}
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

  const branchCodeAndTitle = () => {
    return (
      <View
        style={{
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text
          style={{
            ...Fonts.SemiBold16black,
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {tr("branchCode")}
        </Text>

        <TextInput
          value={branchCode}
          onChangeText={setBranchCode}
          keyboardType="decimal-pad"
          placeholder={tr("enterBranchCode")}
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

  const accountNumberAndTitle = () => {
    return (
      <View
        style={{
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text
          style={{
            ...Fonts.SemiBold16black,
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {tr("accountNumber")}
        </Text>

        <TextInput
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="decimal-pad"
          placeholder={tr("enterAccountNumber")}
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

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <Header title={tr("bankInformation")} navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        {accountHolderNameAndTitle()}
        {bankNameAndTitle()}
        {branchCodeAndTitle()}
        {accountNumberAndTitle()}
      </ScrollView>

      <CommonButton
        title={`${tr("sendBank")} ($110.00)`}
        onPress={() =>
          navigation.navigate("successTransaction/successTransactionScreen", {
            key,
          })
        }
      />
    </View>
  );
};

export default BankInfoScreen;

const styles = StyleSheet.create({
  textInputStyle: {
    ...Fonts.SemiBold16black,
    paddingHorizontal: Default.fixPadding * 1.4,
    paddingVertical: Default.fixPadding * 1.5,
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
