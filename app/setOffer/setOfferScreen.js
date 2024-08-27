import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import Header from "../../components/header";
import { AntDesign, Feather } from "@expo/vector-icons";
import DashedLine from "react-native-dashed-line";
import CommonButton from "../../components/commonButton";
import { BottomSheet } from "react-native-btr";

const { height } = Dimensions.get("window");

const SetOfferScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`setOfferScreen:${key}`);
  }

  const [price, setPrice] = useState(10);
  const [seatOffering, setSeatOffering] = useState();
  const [facilities, setFacilities] = useState();
  const [instruction, setInstruction] = useState();

  const [openYourCarBottomSheet, setOpenYourCarBottomSheet] = useState(false);
  const [selectedCar, setSelectedCar] = useState("Audi A4");
  const [confirmCar, setConfirmCar] = useState();

  const setPriceContainer = () => {
    return (
      <View
        style={{
          marginTop: Default.fixPadding * 2,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text
          style={{ ...Fonts.Bold16black, textAlign: isRtl ? "right" : "left" }}
        >
          {tr("setPrice")}
        </Text>

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingLeft: isRtl ? 0 : Default.fixPadding * 0.9,
            paddingRight: isRtl ? Default.fixPadding * 0.9 : 0,
            ...styles.mainViewLocationStyle,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: isRtl ? "row-reverse" : "row",
              marginRight: isRtl ? 0 : Default.fixPadding * 1.5,
              marginLeft: isRtl ? Default.fixPadding * 1.5 : 0,
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
                dashThickness={1.2}
                dashColor={Colors.black}
                axis="vertical"
                style={{ height: 20, marginVertical: Default.fixPadding * 0.5 }}
              />
              <View
                style={{
                  borderColor: Colors.primary,
                  ...styles.circleViewStyle,
                }}
              />
            </View>
            <View
              style={{ flex: 1, alignItems: isRtl ? "flex-end" : "flex-start" }}
            >
              <View style={{ paddingBottom: Default.fixPadding * 1.2 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.SemiBold14darkGrey,
                    overflow: "hidden",
                  }}
                >
                  6391 Elgin St. Celina,
                </Text>
              </View>

              <View style={{ paddingTop: Default.fixPadding * 1.2 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    ...Fonts.SemiBold14darkGrey,
                    overflow: "hidden",
                  }}
                >
                  2464 Royal Ln. Mesa,
                </Text>
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                alignItems: "center",
                marginRight: isRtl ? 0 : Default.fixPadding * 0.7,
                marginLeft: isRtl ? Default.fixPadding * 0.7 : 0,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (price > 0) {
                    setPrice(price - 1);
                  }
                }}
                style={styles.minusPlusTouchableStyle}
              >
                <AntDesign name="minus" size={18} color={Colors.black} />
              </TouchableOpacity>
              <Text
                style={{
                  ...Fonts.SemiBold16primary,
                  marginHorizontal: Default.fixPadding * 1.5,
                }}
              >
                ${price}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setPrice(price + 1)}
                style={styles.minusPlusTouchableStyle}
              >
                <AntDesign name="plus" size={18} color={Colors.black} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const carList = [
    "Audi A4",
    "Toyota matrix",
    "Bmw",
    "Mercedes Benz",
    "Maruti Suzuki",
    "Ford",
  ];

  const renderItemCar = ({ item, index }) => {
    const isSelected = selectedCar === item;
    return (
      <View
        style={{
          borderTopWidth: index === 0 ? 0 : 1,
          borderTopColor: Colors.lightGreyOpacity50,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSelectedCar(item)}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.bottomSheetCarTouchableStyle,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              textAlign: isRtl ? "right" : "left",
              overflow: "hidden",
              ...Fonts.SemiBold16black,
            }}
          >
            {item}
          </Text>

          <View
            style={{
              borderWidth: isSelected ? 6 : null,
              ...styles.checkCircleViewStyle,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const bottomHeader = () => {
    return (
      <View style={styles.bottomHeaderViewStyle}>
        <Text
          style={{
            ...Fonts.Bold18primary,
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {tr("selectCar")}
        </Text>
      </View>
    );
  };

  const bottomSheetButtons = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.bottomSheetButtonsViewStyle,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setOpenYourCarBottomSheet(false)}
          style={{
            backgroundColor: Colors.white,
            ...styles.bottomSheetButtonStyle,
          }}
        >
          <Text
            numberOfLines={1}
            style={{ ...Fonts.Bold16black, overflow: "hidden" }}
          >
            {tr("cancel")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setConfirmCar(selectedCar);
            setOpenYourCarBottomSheet(false);
          }}
          style={{
            backgroundColor: Colors.primary,
            ...styles.bottomSheetButtonStyle,
          }}
        >
          <Text
            numberOfLines={1}
            style={{ ...Fonts.Bold16white, overflow: "hidden" }}
          >
            {tr("okay")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const bottomSheetWrapper = () => {
    return (
      <BottomSheet
        visible={openYourCarBottomSheet}
        onBackButtonPress={() => setOpenYourCarBottomSheet(false)}
        onBackdropPress={() => setOpenYourCarBottomSheet(false)}
      >
        <View style={styles.bottomSheetMainViewStyle}>
          {bottomHeader()}
          <FlatList
            data={carList}
            renderItem={renderItemCar}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
          />
          {bottomSheetButtons()}
        </View>
      </BottomSheet>
    );
  };

  const yourCarView = () => {
    return (
      <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
        <Text
          style={{ ...Fonts.Bold16black, textAlign: isRtl ? "right" : "left" }}
        >
          {tr("yourCar")}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setOpenYourCarBottomSheet(true)}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.carTouchableStyle,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              ...(confirmCar ? Fonts.SemiBold16black : Fonts.SemiBold16grey),
              flex: 1,
              overflow: "hidden",
              textAlign: isRtl ? "right" : "left",
            }}
          >
            {confirmCar ? confirmCar : tr("selectYourCar")}
          </Text>
          <Feather
            name={openYourCarBottomSheet ? "chevron-up" : "chevron-down"}
            size={24}
            color={Colors.grey}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const seatOfferingAndTitle = () => {
    return (
      <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
        <Text
          style={{ ...Fonts.Bold16black, textAlign: isRtl ? "right" : "left" }}
        >
          {tr("seatOffering")}
        </Text>
        <TextInput
          value={seatOffering}
          onChangeText={setSeatOffering}
          placeholder={tr("enterAvailableSeat")}
          placeholderTextColor={Colors.grey}
          selectionColor={Colors.primary}
          style={{
            textAlign: isRtl ? "right" : "left",
            ...styles.textInputStyle,
          }}
          keyboardType="numeric"
        />
      </View>
    );
  };

  const facilitiesAndTitle = () => {
    return (
      <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
        <Text
          numberOfLines={1}
          style={{
            ...Fonts.Bold16black,
            overflow: "hidden",
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {tr("facilities")}
          <Text style={Fonts.Bold16grey}>{`(${tr("extra")})`}</Text>
        </Text>
        <TextInput
          value={facilities}
          onChangeText={setFacilities}
          placeholder={tr("enterFacilities")}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          placeholderTextColor={Colors.grey}
          selectionColor={Colors.primary}
          style={{
            paddingTop: Default.fixPadding,
            height: 85,
            textAlign: isRtl ? "right" : "left",
            ...styles.textInputStyle,
          }}
        />
      </View>
    );
  };

  const instructionAndTitle = () => {
    return (
      <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
        <Text
          numberOfLines={1}
          style={{
            ...Fonts.Bold16black,
            overflow: "hidden",
            textAlign: isRtl ? "right" : "left",
          }}
        >
          {tr("instruction")}
          <Text style={Fonts.Bold16grey}>{`(${tr("smoking")})`}</Text>
        </Text>
        <TextInput
          value={instruction}
          onChangeText={setInstruction}
          placeholder={tr("enterInstruction")}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          placeholderTextColor={Colors.grey}
          selectionColor={Colors.primary}
          style={{
            paddingTop: Default.fixPadding,
            height: 85,
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
      <View style={{ flex: 1 }}>
        <Header title={tr("offerPool")} navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          {setPriceContainer()}
          {yourCarView()}
          {seatOfferingAndTitle()}
          {facilitiesAndTitle()}
          {instructionAndTitle()}
        </ScrollView>
        <CommonButton
          title={tr("continue")}
          onPress={() =>
            navigation.navigate("successOfferPool/successOfferPoolScreen")
          }
        />
        {bottomSheetWrapper()}
      </View>
    </View>
  );
};

export default SetOfferScreen;

const styles = StyleSheet.create({
  mainViewLocationStyle: {
    alignItems: "center",
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 2,
    paddingVertical: Default.fixPadding * 1.5,
    paddingHorizontal: Default.fixPadding * 0.9,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  circleViewStyle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 5,
    backgroundColor: Colors.white,
  },
  minusPlusTouchableStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  carTouchableStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.4,
    paddingHorizontal: Default.fixPadding * 1.5,
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  textInputStyle: {
    ...Fonts.SemiBold16black,
    padding: Default.fixPadding * 1.5,
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  bottomSheetMainViewStyle: {
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: height / 1.8,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  bottomHeaderViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 2,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  bottomSheetCarTouchableStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.5,
    paddingHorizontal: Default.fixPadding * 2,
  },
  bottomSheetButtonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding,
    marginHorizontal: Default.fixPadding,
    borderRadius: 5,
    ...Default.shadow,
  },
  checkCircleViewStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  bottomSheetButtonsViewStyle: {
    alignItems: "center",
    marginVertical: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding,
  },
});
