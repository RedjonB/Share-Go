import React, { useState, useRef, useCallback } from "react";
import {
  View,
  BackHandler,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  Platform,
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";
import MyStatusBar from "../../components/myStatusBar";
import { Default, Fonts, Colors } from "../../constants/styles";
import SnackbarToast from "../../components/snackbarToast";
import { RNTouchable } from "../../components/rNTouchable";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`onboardingScreen:${key}`);
  }

  const [visibleToast, setVisibleToast] = useState(false);
  const onDismissVisibleToast = () => setVisibleToast(false);

  const [exitApp, setExitApp] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (Platform.OS === "android") {
          setTimeout(() => {
            setExitApp(0);
          }, 2000);

          if (exitApp === 0) {
            setExitApp(exitApp + 1);
            setVisibleToast(true);
          } else if (exitApp === 1) {
            BackHandler.exitApp();
          }
          return true;
        }
      };
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    }, [exitApp])
  );

  const screenBackground = () => {
    return (
      <LinearGradient
        colors={[
          Colors.transparentWhite,
          Colors.primaryOpacity50,
          Colors.white,
        ]}
        style={{
          flex: 1,
        }}
      >
        <View style={{ height: "60%" }} />
        <View style={styles.whiteContainerStyle}>
          <View style={styles.bottomWhiteCircleStyle} />
        </View>
      </LinearGradient>
    );
  };

  const ref = useRef();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };
  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != onboardingSlides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const onboardingSlides = [
    {
      key: "1",
      image: require("../../assets/images/onboarding/image1.png"),
      title: tr("title1"),
      description:
        "Lorem ipsum dolor sit amet consectetur. justo eu dui neque neque. Elementum in velit egtas nisl enim a luctus neque. ",
    },
    {
      key: "2",
      image: require("../../assets/images/onboarding/image2.png"),
      title: tr("title2"),
      description:
        "Lorem ipsum dolor sit amet consectetur. justo eu dui neque neque. Elementum in velit egtas nisl enim a luctus neque. ",
    },
    {
      key: "3",
      image: require("../../assets/images/onboarding/image3.png"),
      title: tr("title3"),
      description:
        "Lorem ipsum dolor sit amet consectetur. justo eu dui neque neque. Elementum in velit egtas nisl enim a luctus neque. ",
    },
  ];

  const renderItemSlides = ({ item }) => {
    return (
      <View style={{ width: width, flex: 1 }}>
        <View style={styles.imageViewStyle}>
          <Image source={item.image} style={styles.imageStyle} />
        </View>
        <View style={styles.titleWrapperStyle}>
          <Text numberOfLines={1} style={styles.titleTextStyle}>
            {item.title}
          </Text>
          <Text numberOfLines={3} style={styles.descriptionTextStyle}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  const listFooterComponent = () => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <RNTouchable
          onPress={() => {
            if (currentSlideIndex == onboardingSlides.length - 1) {
              navigation.navigate("auth/loginScreen");
            } else {
              goToNextSlide();
            }
          }}
          style={styles.arrowTouchableStyle}
        >
          <AntDesign
            name={isRtl ? "arrowleft" : "arrowright"}
            size={30}
            color={Colors.primary}
          />
        </RNTouchable>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            ...styles.dotWrapper,
          }}
        >
          {onboardingSlides.map((_, index) => (
            <View
              key={index}
              style={{
                backgroundColor:
                  currentSlideIndex == index
                    ? Colors.primary
                    : Colors.greyOpacity40,
                ...styles.dotIndicatorStyle,
              }}
            />
          ))}
        </View>
      </View>
    );
  };

  const onboardingFlatList = () => {
    return (
      <FlatList
        ref={ref}
        horizontal
        pagingEnabled
        data={onboardingSlides}
        renderItem={renderItemSlides}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {screenBackground()}
        <View style={styles.positionViewStyle}>
          {onboardingFlatList()}
          {listFooterComponent()}
        </View>
      </View>
      <SnackbarToast
        visible={visibleToast}
        title={tr("tapBack")}
        onDismiss={onDismissVisibleToast}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  whiteContainerStyle: {
    height: "40%",
    alignItems: "center",
    overflow: "hidden",
  },
  bottomWhiteCircleStyle: {
    width: width * 2.3,
    height: 1050,
    borderRadius: 525,
    backgroundColor: Colors.white,
  },
  positionViewStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  imageViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: width * 0.15,
  },
  imageStyle: {
    width: "100%",
    height: width * 0.6,
    resizeMode: "contain",
  },
  titleWrapperStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Default.fixPadding * 3,
  },
  titleTextStyle: {
    ...Fonts.Bold22primary,
    overflow: "hidden",
  },
  descriptionTextStyle: {
    ...Fonts.SemiBold14grey,
    overflow: "hidden",
    textAlign: "center",
    marginTop: Default.fixPadding * 0.5,
  },
  arrowTouchableStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: Default.fixPadding * 2,
    backgroundColor: Colors.white,
    ...Default.shadowPrimary,
  },
  dotWrapper: {
    justifyContent: "center",
    alignItems: "center",
    margin: Default.fixPadding * 2,
  },
  dotIndicatorStyle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: Default.fixPadding * 0.3,
  },
});
