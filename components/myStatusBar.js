import React from "react";
import { StatusBar, SafeAreaView } from "react-native";
import { Colors } from "../constants/styles";

const MyStatusBar = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary }}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.primary}
        barStyle={"light-content"}
      />
    </SafeAreaView>
  );
};

export default MyStatusBar;
