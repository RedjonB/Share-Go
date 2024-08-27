import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation, useLocalSearchParams } from "expo-router";
import Header from "../../components/header";
import CommonButton from "../../components/commonButton";

const SendToBankScreen = () => {
  const { key } = useLocalSearchParams();

  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`sendToBankScreen:${key}`);
  }

  const [transferAmount, setTransferAmount] = useState();

  const imageAndTotalBalance = () => {
    return (
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
    );
  };

  const transferAmountTileAndTextInput = () => {
    return (
      <View
        style={{
          marginHorizontal: Default.fixPadding * 2,
          marginBottom: Default.fixPadding * 2,
        }}
      >
        <Text
          style={{ ...Fonts.Bold16black, textAlign: isRtl ? "right" : "left" }}
        >
          {tr("amountTransfer")}
        </Text>
        <TextInput
          value={transferAmount}
          onChangeText={setTransferAmount}
          keyboardType="number-pad"
          placeholder={tr("enterAmountTransfer")}
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
      <Header title={tr("sendBank")} navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
      >
        {imageAndTotalBalance()}
        {transferAmountTileAndTextInput()}
        <CommonButton
          title={tr("continue")}
          onPress={() =>
            navigation.navigate("bankInfo/bankInfoScreen", { key })
          }
        />
      </ScrollView>
    </View>
  );
};

export default SendToBankScreen;

const styles = StyleSheet.create({
  imageContainerStyle: {
    alignItems: "center",
    marginTop: Default.fixPadding * 0.4,
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 4,
  },
  totalBalanceTextStyle: {
    ...Fonts.Bold16black,
    overflow: "hidden",
    marginTop: Default.fixPadding * 0.5,
  },
  textInputStyle: {
    ...Fonts.SemiBold16black,
    padding: Default.fixPadding * 1.5,
    marginTop: Default.fixPadding,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
