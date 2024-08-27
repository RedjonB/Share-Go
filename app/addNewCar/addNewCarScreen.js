import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
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
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import CommonButton from "../../components/commonButton";
import { BottomSheet } from "react-native-btr";

const { height } = Dimensions.get("window");

const AddNewCarScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`addNewCarScreen:${key}`);
  }
  const [chooseOptionBottomSheet, setChooseOptionBottomSheet] = useState(false);
  const [openVehicleTypeBottomSheet, setOpenVehicleTypeBottomSheet] =
    useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState("Hatchbacks");
  const [confirmVehicleType, setConfirmVehicleType] = useState();

  const [vehicleName, setVehicleName] = useState();
  const [vehicleRegNumber, setVehicleRegNumber] = useState();
  const [seatOffering, setSeatOffering] = useState();
  const [facilities, setFacilities] = useState();
  const [instruction, setInstruction] = useState();

  const addVehicleImageContainer = () => {
    return (
      <View style={styles.addVehicleImageContainerStyle}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setChooseOptionBottomSheet(true)}
          style={styles.addImageStyle}
        >
          <Image
            source={require("../../assets/images/icons/camera.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
        <Text style={{ ...Fonts.Bold16black, textAlign: "center" }}>
          {tr("addNewCar")}
        </Text>
      </View>
    );
  };

  const vehicleTypeList = [
    "Benz",
    "Audi",
    "Toyota",
    "Range Rover",
    "Mitsubishi",
    "Fiat",
  ];

  const renderItemVehicleType = ({ item, index }) => {
    const isSelected = selectedVehicleType === item;
    return (
      <View
        style={{
          borderTopWidth: index === 0 ? 0 : 1,
          borderTopColor: Colors.lightGreyOpacity50,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setSelectedVehicleType(item)}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.bottomSheetCarTypeTouchableStyle,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              ...Fonts.SemiBold16black,
              textAlign: isRtl ? "right" : "left",
              overflow: "hidden",
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

  const vehicleTypeBottomSheetHeader = () => {
    return (
      <View style={styles.carTypeBottomHeaderViewStyle}>
        <Text style={{ ...Fonts.Bold18primary }}>{tr("carType")}</Text>
      </View>
    );
  };

  const vehicleTypeBottomSheetButtons = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.bottomSheetButtonWrapperStyle,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setOpenVehicleTypeBottomSheet(false)}
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
          onPress={() => {
            setConfirmVehicleType(selectedVehicleType);
            setOpenVehicleTypeBottomSheet(false);
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
        visible={openVehicleTypeBottomSheet}
        onBackButtonPress={() => setOpenVehicleTypeBottomSheet(false)}
        onBackdropPress={() => setOpenVehicleTypeBottomSheet(false)}
      >
        <View style={styles.bottomSheetMainViewStyle}>
          {vehicleTypeBottomSheetHeader()}
          <FlatList
            data={vehicleTypeList}
            renderItem={renderItemVehicleType}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
          />
          {vehicleTypeBottomSheetButtons()}
        </View>
      </BottomSheet>
    );
  };

  const vehicleTypeContainer = () => {
    return (
      <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
        <Text
          numberOfLines={1}
          style={{
            ...Fonts.Bold16black,
            textAlign: isRtl ? "right" : "left",
            overflow: "hidden",
          }}
        >
          {tr("vehicleType")}
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setOpenVehicleTypeBottomSheet(true)}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingVertical: Default.fixPadding * 1.4,
            ...styles.carTypeTouchableStyle,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              ...(confirmVehicleType
                ? Fonts.SemiBold16black
                : Fonts.SemiBold16grey),
              flex: 1,
              overflow: "hidden",
              textAlign: isRtl ? "right" : "left",
            }}
          >
            {confirmVehicleType ? confirmVehicleType : tr("selectVehicleType")}
          </Text>
          <Feather
            name={openVehicleTypeBottomSheet ? "chevron-up" : "chevron-down"}
            size={24}
            color={Colors.grey}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const vehicleNameAndTitle = () => {
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
          {tr("vehicleName")}
        </Text>
        <TextInput
          value={vehicleName}
          onChangeText={setVehicleName}
          placeholder={tr("enterVehicleName")}
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

  const vehicleRegNumberAndTitle = () => {
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
          {tr("vehicleRegNumber")}
        </Text>
        <TextInput
          value={vehicleRegNumber}
          onChangeText={setVehicleRegNumber}
          placeholder={tr("enterVehicleNumber")}
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

  const seatOfferingAndTitle = () => {
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
          {tr("seatOffering")}
        </Text>
        <TextInput
          value={seatOffering}
          onChangeText={setSeatOffering}
          placeholder={tr("enterAvailableSeat")}
          keyboardType="numeric"
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
          <Text style={{ ...Fonts.Bold16grey }}>{`(${tr(
            "extraLuggage"
          )})`}</Text>
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
            textAlign: isRtl ? "right" : "left",
            paddingTop: Default.fixPadding,
            height: 85,
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
          <Text style={{ ...Fonts.Bold16grey }}>{`(${tr("smoking")})`}</Text>
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
            textAlign: isRtl ? "right" : "left",
            paddingTop: Default.fixPadding,
            height: 85,
            ...styles.textInputStyle,
          }}
        />
      </View>
    );
  };

  const chooseOpenBottomSheetWrapper = () => {
    return (
      <BottomSheet
        visible={chooseOptionBottomSheet}
        onBackButtonPress={() => setChooseOptionBottomSheet(false)}
        onBackdropPress={() => setChooseOptionBottomSheet(false)}
      >
        <View style={styles.chooseOptionBottomSheetStyle}>
          <Text
            style={{
              ...Fonts.SemiBold18black,
              textAlign: "center",
              marginBottom: Default.fixPadding * 2.5,
            }}
          >
            {tr("chooseOption")}
          </Text>
          <TouchableOpacity
            onPress={() => setChooseOptionBottomSheet(false)}
            activeOpacity={0.9}
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginBottom: Default.fixPadding * 1.5,
              alignItems: "center",
            }}
          >
            <View style={styles.cameraGalleryViewStyle}>
              <MaterialCommunityIcons
                name="camera"
                size={24}
                color={Colors.blue}
              />
            </View>
            <Text
              numberOfLines={1}
              style={{
                marginLeft: isRtl ? 0 : Default.fixPadding,
                marginRight: isRtl ? Default.fixPadding : 0,
                textAlign: isRtl ? "right" : "left",
                ...styles.cameraGalleryTextStyle,
              }}
            >
              {tr("camera")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setChooseOptionBottomSheet(false)}
            activeOpacity={0.9}
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              marginBottom: Default.fixPadding * 1.8,
            }}
          >
            <View style={styles.cameraGalleryViewStyle}>
              <MaterialCommunityIcons
                name="image-area"
                size={24}
                color={Colors.lightGreen}
              />
            </View>
            <Text
              numberOfLines={1}
              style={{
                marginLeft: isRtl ? 0 : Default.fixPadding,
                marginRight: isRtl ? Default.fixPadding : 0,
                textAlign: isRtl ? "right" : "left",
                ...styles.cameraGalleryTextStyle,
              }}
            >
              {tr("gallery")}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={tr("addNewCar")} navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          {addVehicleImageContainer()}
          {vehicleTypeContainer()}
          {vehicleNameAndTitle()}
          {vehicleRegNumberAndTitle()}
          {seatOfferingAndTitle()}
          {facilitiesAndTitle()}
          {instructionAndTitle()}
        </ScrollView>
        <CommonButton title={tr("add")} onPress={() => navigation.goBack()} />
        {bottomSheetWrapper()}
        {chooseOpenBottomSheetWrapper()}
      </View>
    </View>
  );
};

export default AddNewCarScreen;

const styles = StyleSheet.create({
  addVehicleImageContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding * 2,
    marginBottom: Default.fixPadding * 4,
  },
  addImageStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 102,
    height: 102,
    borderRadius: 51,
    marginBottom: Default.fixPadding * 1.5,
    backgroundColor: Colors.lightGreyOpacity50,
  },
  carTypeTouchableStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 2,
    paddingHorizontal: Default.fixPadding * 1.5,
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
  bottomSheetCarTypeTouchableStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.5,
    paddingHorizontal: Default.fixPadding * 2,
  },
  carTypeBottomHeaderViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 2,
    backgroundColor: Colors.white,
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
  bottomSheetButtonWrapperStyle: {
    alignItems: "center",
    marginVertical: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding,
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
  textInputStyle: {
    ...Fonts.SemiBold16black,
    padding: Default.fixPadding * 1.5,
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  chooseOptionBottomSheetStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: Default.fixPadding * 1.7,
    paddingHorizontal: Default.fixPadding * 3.5,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  cameraGalleryViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  cameraGalleryTextStyle: {
    flex: 1,
    overflow: "hidden",
    ...Fonts.Medium16black,
  },
});
