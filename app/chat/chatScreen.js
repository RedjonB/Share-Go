import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import { Colors, Fonts, Default } from "../../constants/styles";
import { useTranslation } from "react-i18next";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { Feather, Ionicons, Octicons } from "@expo/vector-icons";
import { RNTouchable } from "../../components/rNTouchable";
import moment from "moment";

const ChatScreen = () => {
  const navigation = useNavigation();
  const { image, name } = useLocalSearchParams();

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`chatScreen:${key}`);
  }

  const header = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.headerViewStyle,
        }}
      >
        <RNTouchable
          onPress={() => navigation.goBack()}
          style={{
            marginRight: isRtl ? 0 : Default.fixPadding * 1.2,
            marginLeft: isRtl ? Default.fixPadding * 1.2 : 0,
          }}
        >
          <Feather
            name={isRtl ? "arrow-right" : "arrow-left"}
            size={25}
            color={Colors.black}
          />
        </RNTouchable>
        <Image
          source={image}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <View
          style={{
            flex: 1,
            alignItems: isRtl ? "flex-end" : "flex-start",
            marginHorizontal: Default.fixPadding,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              ...Fonts.Bold16primary,
              overflow: "hidden",
              marginBottom: Default.fixPadding * 0.3,
            }}
          >
            {name}
          </Text>
          <Text
            numberOfLines={1}
            style={{ ...Fonts.Bold14grey, overflow: "hidden" }}
          >
            Ride on 25 june 2022
          </Text>
        </View>
      </View>
    );
  };

  const [message, setMessage] = useState();

  const [chatData, setChatData] = useState([
    {
      key: 5,
      txtMsg: "Okay..I will be there on time",
      msgTime: "4:16 PM",
      isMe: false,
    },
    {
      key: 4,
      txtMsg: "I will be around 10 :00am",
      msgTime: "4:16 PM",
      isMe: true,
    },
    {
      key: 3,
      txtMsg: "Hi jenny , what time you reach",
      msgTime: "4:16 PM",
      isMe: false,
    },
    {
      key: 2,
      txtMsg: "Hello, Good morning",
      msgTime: "4:15 PM",
      isMe: true,
    },
    {
      key: 1,
      txtMsg: "Hello, Good morning",
      msgTime: "4:15 PM",
      isMe: false,
    },
  ]);

  const handleMsgSend = () => {
    const currentTime = new Date().toLocaleTimeString();
    const convertedTime = moment(currentTime, "HH:mm:ss").format("hh:mm A");

    let temp = {
      txtMsg: message,
      msgTime: convertedTime,
      isMe: true,
    };

    setChatData((old) => [temp, ...old]);
    setMessage("");
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ marginHorizontal: Default.fixPadding * 2 }}>
        {item.isMe ? (
          <View
            key={index}
            style={{
              justifyContent: "flex-end",
              alignItems: isRtl ? "flex-start" : "flex-end",
              marginBottom: Default.fixPadding * 2,
            }}
          >
            <View
              style={{
                borderBottomLeftRadius: isRtl ? 0 : 10,
                borderBottomRightRadius: isRtl ? 10 : 0,
                ...styles.primaryMsgViewStyle,
              }}
            >
              <Text style={{ ...Fonts.SemiBold15white }}>{item.txtMsg}</Text>

              <Text
                style={{
                  ...Fonts.SemiBold12white,
                  textAlign: "right",
                  marginTop: Default.fixPadding * 0.3,
                }}
              >
                {item.msgTime}
              </Text>
            </View>
          </View>
        ) : (
          <View
            key={index}
            style={{
              alignItems: isRtl ? "flex-end" : "flex-start",
              marginBottom: Default.fixPadding * 3,
              marginTop: Default.fixPadding * 2,
            }}
          >
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
              }}
            >
              <Image
                source={image}
                style={{
                  marginRight: isRtl ? 0 : -2,
                  ...styles.messageCircleImgStyle,
                }}
              />

              <View
                style={{
                  alignSelf: isRtl ? "flex-end" : "flex-start",
                  borderTopLeftRadius: isRtl ? 10 : 0,
                  borderTopRightRadius: isRtl ? 0 : 10,
                  ...styles.whiteMessageViewStyle,
                }}
              >
                <Text style={{ ...Fonts.SemiBold15black }}>{item.txtMsg}</Text>
                <Text
                  style={{
                    ...Fonts.SemiBold12grey,
                    textAlign: "right",
                    marginTop: Default.fixPadding * 0.3,
                  }}
                >
                  {item.msgTime}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  const chatContainer = () => {
    return (
      <FlatList
        inverted
        data={chatData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: Default.fixPadding }}
      />
    );
  };

  const bottomTextInputAndSend = () => {
    return (
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          ...styles.bottomMainViewStyle,
        }}
      >
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginRight: isRtl ? 0 : Default.fixPadding * 1.5,
            marginLeft: isRtl ? Default.fixPadding * 1.5 : 0,
            ...styles.messageTextInputViewStyle,
          }}
        >
          <Octicons name="smiley" size={24} color={Colors.primary} />
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder={tr("typeYourTextHere")}
            placeholderTextColor={Colors.primary}
            selectionColor={Colors.primary}
            style={{
              flex: 1,
              ...Fonts.SemiBold14primary,
              textAlign: isRtl ? "right" : "left",
              marginHorizontal: Default.fixPadding,
            }}
          />
          <Feather name="paperclip" size={20} color={Colors.primary} />
          <Feather
            name="mic"
            size={20}
            color={Colors.primary}
            style={{
              marginLeft: isRtl ? 0 : Default.fixPadding,
              marginRight: isRtl ? Default.fixPadding : 0,
            }}
          />
        </View>
        <TouchableOpacity
          disabled={!message}
          onPress={handleMsgSend}
          style={styles.sendTouchableStyle}
        >
          <Ionicons name="send" size={27} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.regularGrey }}>
      <MyStatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : null}
        style={{ flex: 1 }}
      >
        {header()}
        {chatContainer()}
        {bottomTextInputAndSend()}
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  headerViewStyle: {
    alignItems: "center",
    paddingVertical: Default.fixPadding * 1.6,
    paddingHorizontal: Default.fixPadding * 2,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  sendTouchableStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  messageTextInputViewStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Default.fixPadding,
    height: 52,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 20,
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
  bottomMainViewStyle: {
    alignItems: "center",
    marginTop: Default.fixPadding,
    marginBottom: Default.fixPadding * 2,
    marginHorizontal: Default.fixPadding * 2,
  },
  primaryMsgViewStyle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: Default.fixPadding,
    maxWidth: "70%",
    backgroundColor: Colors.primary,
    ...Default.shadow,
  },
  messageCircleImgStyle: {
    zIndex: 1,
    width: 34,
    height: 34,
    borderRadius: 17,
    marginTop: -Default.fixPadding * 2,
  },
  whiteMessageViewStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: Default.fixPadding,
    maxWidth: "90%",
    backgroundColor: Colors.white,
    ...Default.shadow,
  },
});
