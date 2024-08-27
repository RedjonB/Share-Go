import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { withTranslation } from "react-i18next";
import { LogBox } from "react-native";
import { Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import i18n from "../languages/index"; //don't remove this line

LogBox.ignoreAllLogs();

const MainNavigation = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="onboarding/onboardingScreen"
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="auth/loginScreen"
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="(tabs)" options={{ gestureEnabled: false }} />
          <Stack.Screen name="pickLocations/pickLocationsScreen" />
          <Stack.Screen name="notification/notificationScreen" />
          <Stack.Screen name="availablePool/availablePoolScreen" />
          <Stack.Screen name="riderProfile/riderProfileScreen" />
          <Stack.Screen name="review/reviewScreen" />
          <Stack.Screen name="chat/chatScreen" />
          <Stack.Screen name="mapView/mapViewScreen" />
          <Stack.Screen name="setOffer/setOfferScreen" />
          <Stack.Screen name="successOfferPool/successOfferPoolScreen" />
          <Stack.Screen name="poolRequest/poolRequestScreen" />
          <Stack.Screen name="rideInfo/rideInfoScreen" />
          <Stack.Screen name="startRide/startRideScreen" />
          <Stack.Screen name="tripCompleted/tripCompletedScreen" />
          <Stack.Screen name="wallet/walletScreen" />
          <Stack.Screen name="addMoney/addMoneyScreen" />
          <Stack.Screen name="creditCard/creditCardScreen" />
          <Stack.Screen name="successTransaction/successTransactionScreen" />
          <Stack.Screen name="sendToBank/sendToBankScreen" />
          <Stack.Screen name="bankInfo/bankInfoScreen" />
          <Stack.Screen name="editProfile/editProfileScreen" />
          <Stack.Screen name="myCar/myCarScreen" />
          <Stack.Screen name="addNewCar/addNewCarScreen" />
          <Stack.Screen name="rideHistory/rideHistoryScreen" />
          <Stack.Screen name="language/languageScreen" />
          <Stack.Screen name="termsAndCondition/termsAndConditionScreen" />
          <Stack.Screen name="privacyPolicy/privacyPolicyScreen" />
          <Stack.Screen name="helpSupport/helpSupportScreen" />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const ReloadAppOnLanguageChange = withTranslation("translation", {
  bindI18n: "languageChanged",
  bindStore: false,
})(MainNavigation);

export default function Layout() {
  const [loaded] = useFonts({
    Bold: require("./../assets/fonts/Mulish-Bold.ttf"),
    Regular: require("./../assets/fonts/Mulish-Regular.ttf"),
    SemiBold: require("./../assets/fonts/Mulish-SemiBold.ttf"),
    Medium: require("./../assets/fonts/Mulish-Medium.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return <ReloadAppOnLanguageChange />;
}
