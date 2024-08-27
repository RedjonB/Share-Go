import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation } from "expo-router";
import Header from "../../components/header";

const TermsAndConditionScreen = () => {
  const navigation = useNavigation();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`termsAndConditionScreen:${key}`);
  }

  const termsAndCondition = () => {
    return (
      <View
        style={{
          marginTop: Default.fixPadding,
          marginHorizontal: Default.fixPadding * 2,
        }}
      >
        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...styles.textStyle,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem maecenas
          proin nec, turpis iaculiviverramalesuada lacus.Lorem ipsum dolor sit
          amet, consectetuadipiscing elit. Sem maecenas proin nec, turpis
          iaculiviverramassa malesuada lacus.Lorem ipsum dolor
          siamet,consectetur adipiscing elit. Sem maecenas proin turpis
          iaculiviverra massa malesuada lacus.nec, turpis iaculiviverramassal.
        </Text>
        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...styles.textStyle,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem maecenas
          proin nec, turpis iaculiviverramalesuada lacus.Lorem ipsum dolor sit
          amet, consectetuadipiscing elit. Sem maecenas proin nec, turpis
          iaculiviverramassa
        </Text>
        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...styles.textStyle,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem maecenas
          proin nec, turpis iaculiviverramalesuada lacus.Lorem ipsum dolor sit
          amet, consectetuadipiscing elit. Sem maecenas proin nec, turpis
          iaculiviverramassa malesuada lacus.Lorem ipsum dolor
          siamet,consectetur adipiscing elit. Sem maecenas proin turpis
          iaculiviverra massa malesuada lacus.nec, turpis iaculiviverramassal.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem maecenas
          proin nec, turpis iaculiviverramalesuada lacus.Lorem ipsum dolor sit
          amet, consectetuadipiscing elit. Sem maecenas proin nec, turpis
          iaculiviverramassa malesuada lacus.Lorem ipsum dolor
          siamet,consectetur adipiscing elit. Sem maecenas proin turpis
          iaculiviverra massa malesuada lacus.nec, turpis iaculiviverramassal.
        </Text>
        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...styles.textStyle,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem maecenas
          proin nec, turpis iaculiviverramalesuada lacus.Lorem ipsum dolor sit
          amet, consectetuadipiscing elit. Sem maecenas proin nec, turpis
          iaculiviverramassa malesuada lacus.Lorem ipsum dolor
          siamet,consectetur adipiscing elit. Sem maecenas proin turpis
          iaculiviverra massa malesuada lacus.nec, turpis iaculiviverramassal.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem maecenas
          proin nec, turpis iaculiviverramalesuada lacus.Lorem ipsum dolor sit
          amet, consectetuadipiscing elit. Sem maecenas proin nec, turpis
          iaculiviverramassa malesuada lacus.Lorem ipsum dolor
          siamet,consectetur adipiscing elit. Sem maecenas proin turpis
          iaculiviverra massa malesuada lacus.nec, turpis iaculiviverramassal.
        </Text>
        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...styles.textStyle,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem maecenas
          proin nec, turpis iaculiviverramalesuada lacus.Lorem ipsum dolor sit
          amet, consectetuadipiscing elit. Sem maecenas proin nec, turpis
          iaculiviverramassa
        </Text>
        <Text
          style={{
            textAlign: isRtl ? "right" : "left",
            ...styles.textStyle,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem maecenas
          proin nec, turpis iaculiviverramalesuada lacus.Lorem ipsum dolor sit
          amet, consectetuadipiscing elit. Sem maecenas proin nec, turpis
          iaculiviverramassa
        </Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        <Header title={tr("termsAndCondition")} navigation={navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {termsAndCondition()}
        </ScrollView>
      </View>
    </View>
  );
};

export default TermsAndConditionScreen;

const styles = StyleSheet.create({
  textStyle: {
    ...Fonts.Bold14grey,
    marginBottom: Default.fixPadding,
  },
});
