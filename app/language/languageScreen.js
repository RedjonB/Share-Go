import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import Header from "../../components/header";
import CommonButton from "../../components/commonButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`languageScreen:${key}`);
  }

  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.resolvedLanguage
  );

  async function onChangeLang(lang) {
    i18n.changeLanguage(lang);
    try {
      await AsyncStorage.setItem("@APP:languageCode", lang);
    } catch (error) {
      alert("something went wrong");
    }
  }

  const onDisableHandler = i18n.language === selectedLanguage;

  const languageList = [
    {
      key: "1",
      name: "English",
      lang: "en",
    },
    {
      key: "2",
      name: "Italiano",
      lang: "it",
    },
    {
      key: "3",
      name: "Shqip",
      lang: "al",
    },
  ];

  const renderItem = ({ item }) => {
    const selected = selectedLanguage === item.lang;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setSelectedLanguage(item.lang)}
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.mainTouchableOpacityStyle,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            ...Fonts.SemiBold16black,
            overflow: "hidden",
          }}
        >
          {item.name}
        </Text>
        <View
          style={{
            borderColor: selected ? Colors.primary : Colors.white,
            ...styles.circleViewStyle,
          }}
        ></View>
      </TouchableOpacity>
    );
  };

  const languageFlatLit = () => {
    return (
      <FlatList
        data={languageList}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: Default.fixPadding * 2 }}
      />
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={tr("language")} navigation={navigation} />
        {languageFlatLit()}

        <CommonButton
          disabled={onDisableHandler}
          title={tr("update")}
          onPress={() => {
            onChangeLang(selectedLanguage);
            navigation.pop();
          }}
        />
      </View>
    </View>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  mainTouchableOpacityStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Default.fixPadding * 2,
    paddingVertical: Default.fixPadding * 1.3,
    marginBottom: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding * 2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  circleViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 8,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
