import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Default, Colors, Fonts } from "../constants/styles";
import { useTranslation } from "react-i18next";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import DashedLine from "react-native-dashed-line";
import { MaterialIcons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";

const { width, height } = Dimensions.get("window");

const DateAndTimeModal = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`dateAndTimeModal:${key}`);
  }
  const today = moment().format("YYYY-MM-DD");

  const [selectedDate, setSelectedDate] = useState(today);

  const originalDate = moment(selectedDate);
  const formattedDate = originalDate.format("DD/MM/YYYY");

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const [selectedHr, setSelectedHr] = useState("11");
  const [selectedMinute, setSelectedMinute] = useState("02");

  const hours = Array.from({ length: 12 }, (_, index) =>
    (index + 1).toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, index) =>
    index.toString().padStart(2, "0")
  );

  const timePeriod = ["AM", "PM"];
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("AM");

  const formattedDateAndTime = `${formattedDate},${selectedHr}:${selectedMinute} ${selectedTimePeriod}`;

  const datPicker = () => {
    return (
      <View
        style={{
          marginTop: Default.fixPadding,
        }}
      >
        <Calendar
          minDate={today}
          current={today}
          firstDay={1}
          hideExtraDays={true}
          renderArrow={(direction) =>
            direction == "left" ? (
              <MaterialIcons
                name="arrow-back-ios"
                color={Colors.extraLightGrey}
                size={15}
              />
            ) : (
              <MaterialIcons
                name="arrow-forward-ios"
                color={Colors.extraLightGrey}
                size={15}
              />
            )
          }
          theme={{
            textSectionTitleColor: Colors.black,
            selectedDayTextColor: Colors.white,
            todayTextColor: Colors.black,
            dayTextColor: Colors.black,
            textDisabledColor: Colors.grey,
            textMonthFontFamily: "Bold",
            textDayHeaderFontFamily: "Bold",
          }}
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: Colors.primary,
            },
          }}
        />
      </View>
    );
  };

  const dashedLineView = () => {
    return (
      <DashedLine
        dashGap={2.5}
        dashLength={2.5}
        dashThickness={1.5}
        dashColor={Colors.grey}
        style={{ marginVertical: Default.fixPadding * 2 }}
      />
    );
  };
  const timePicker = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.timePickerMainViewStyle,
        }}
      >
        <SelectDropdown
          data={hours}
          showsVerticalScrollIndicator={false}
          defaultValueByIndex={10}
          onSelect={(value) => setSelectedHr(value)}
          dropdownStyle={{ height: 200, ...styles.dropdownStyle }}
          renderButton={(selectedItem) => {
            return (
              <View style={styles.timeViewStyle}>
                <Text style={Fonts.SemiBold18black}>{selectedItem}</Text>
              </View>
            );
          }}
          renderItem={(item) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  marginVertical: Default.fixPadding * 0.8,
                }}
              >
                <Text
                  style={{
                    ...Fonts.SemiBold18black,
                    textAlign: isRtl ? "right" : "left",
                  }}
                >
                  {item}
                </Text>
              </View>
            );
          }}
        />
        <Text
          style={{
            ...Fonts.SemiBold28black,
            marginHorizontal: Default.fixPadding,
          }}
        >
          :
        </Text>

        <SelectDropdown
          data={minutes}
          showsVerticalScrollIndicator={false}
          defaultValueByIndex={2}
          onSelect={(value) => setSelectedMinute(value)}
          dropdownStyle={{ height: 200, ...styles.dropdownStyle }}
          renderButton={(selectedItem) => {
            return (
              <View style={styles.timeViewStyle}>
                <Text style={Fonts.SemiBold18black}>{selectedItem}</Text>
              </View>
            );
          }}
          renderItem={(item) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  marginVertical: Default.fixPadding * 0.8,
                }}
              >
                <Text
                  style={{
                    ...Fonts.SemiBold18black,
                    textAlign: isRtl ? "right" : "left",
                  }}
                >
                  {item}
                </Text>
              </View>
            );
          }}
        />

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginLeft: isRtl ? 0 : Default.fixPadding * 2,
            marginRight: isRtl ? Default.fixPadding * 2 : 0,
            ...styles.timePeriodViewStyle,
          }}
        >
          {timePeriod.map((item, index) => {
            const isSelected = selectedTimePeriod === item;
            return (
              <TouchableOpacity
                onPress={() => setSelectedTimePeriod(item)}
                key={index}
                style={{ marginHorizontal: Default.fixPadding * 1.5 }}
              >
                <Text
                  style={{
                    ...(isSelected
                      ? Fonts.SemiBold18primary
                      : Fonts.SemiBold18grey),
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const bottomButtons = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          marginTop: Default.fixPadding * 1.4,
        }}
      >
        <TouchableOpacity
          onPress={() => props.closeModal()}
          style={{
            backgroundColor: Colors.white,
            borderBottomLeftRadius: isRtl ? 0 : 10,
            borderBottomRightRadius: isRtl ? 10 : 0,
            ...styles.buttonStyle,
          }}
        >
          <Text
            numberOfLines={1}
            style={{ ...Fonts.Bold18grey, overflow: "hidden" }}
          >
            {tr("cancel")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.okayButtonHandle(formattedDateAndTime)}
          style={{
            borderBottomRightRadius: isRtl ? 0 : 10,
            borderBottomLeftRadius: isRtl ? 10 : 0,
            backgroundColor: Colors.primary,
            ...styles.buttonStyle,
          }}
        >
          <Text
            numberOfLines={1}
            style={{ ...Fonts.Bold18white, overflow: "hidden" }}
          >
            {tr("okay")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const modalContainer = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.closeModal}
        style={{ flex: 1, backgroundColor: Colors.transparentBlack }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.transparentBlack,
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.modalViewStyle}>
              <TouchableWithoutFeedback>
                <View>
                  <Text
                    style={{
                      ...Fonts.Bold18primary,
                      textAlign: "center",
                      marginVertical: Default.fixPadding,
                    }}
                  >
                    {tr("selectDateTime")}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableWithoutFeedback>
                  <View>
                    {datPicker()}
                    {dashedLineView()}
                    {timePicker()}
                    <Text
                      style={{
                        ...Fonts.SemiBold15grey,
                        textAlign: "center",
                        marginBottom: Default.fixPadding * 1.4,
                      }}
                    >
                      {formattedDateAndTime}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
              {bottomButtons()}
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={props.visible}
      onRequestClose={props.closeModal}
    >
      {modalContainer()}
    </Modal>
  );
};

export default DateAndTimeModal;

const styles = StyleSheet.create({
  modalViewStyle: {
    width: width * 0.9,
    height: height / 1.5,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Default.fixPadding * 1.1,
    ...Default.shadow,
  },
  timePickerMainViewStyle: {
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 2.6,
    marginBottom: Default.fixPadding * 3,
  },
  timeViewStyle: {
    paddingVertical: Default.fixPadding,
    paddingHorizontal: Default.fixPadding * 1.4,
    borderRadius: 5,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  dropdownStyle: {
    width: 60,
    borderRadius: 5,
    backgroundColor: Colors.white,
    paddingVertical: Default.fixPadding * 0.5,
  },
  timePeriodViewStyle: {
    alignItems: "center",
    paddingHorizontal: Default.fixPadding * 0.3,
    paddingVertical: Default.fixPadding,
    borderRadius: 5,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
