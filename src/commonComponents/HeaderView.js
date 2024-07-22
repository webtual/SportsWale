import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  Image,
  RefreshControl,
} from "react-native";
import React from "react";
import {
  black,
  greenPrimary,
  midGreen,
  offWhite,
  primary,
  secondary,
  transparent,
  warmGrey,
  white,
  yellow,
} from "../constants/Color";
import LinearGradient from "react-native-linear-gradient";
import {
  heightPixel,
  pixelSizeHorizontal,
  widthPixel,
} from "./ResponsiveScreen";
import IconButton from "./IconButton";
import { BackImg, headerBackground } from "../constants/Images";
import { BOLD, FontSize, SEMIBOLD } from "../constants/Fonts";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/ConstantKey";

const HeaderView = ({
  title = "",
  isBack = true,
  children,
  titleColor = white,
  onPress = {},
  containerStyle = {},
  scrollContainerStyle = {},
  isScroll = true,
  leftComponent,
  rightComponent,
  isRefreshing = false,
  onRefresh,
  ...props
}) => {
  return (
    <>
      <SafeAreaView
        style={{ flex: 0, backgroundColor: primary }}
      ></SafeAreaView>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={"dark-content"} backgroundColor={primary} />
        <View
          style={[
            styles.headerImgContainer,
            {
              height: props.HeaderSmall ? SCREEN_WIDTH / 4 : SCREEN_WIDTH / 1.8,
            },
          ]}
        >
          <Image
            source={headerBackground}
            style={{
              // flex: 1,
              width:'100%',
              height : '100%',
              borderBottomLeftRadius: 25,
              borderBottomRightRadius: 25,
              resizeMode: "cover",
            }}
          />

          <View style={[styles.headerRowContainer,]}>
            {isBack && (
              <IconButton additionalStyle={styles.btnBack} onPress={onPress}>
                <Icon name={"chevron-left"} size={32} color={titleColor} />
              </IconButton>
            )}

            {leftComponent && leftComponent}

            <View style={{ flex: 1 }}>
              {title && (
                <Text
                  numberOfLines={1}
                  style={[
                    styles.textTitle,
                    {
                      color: titleColor,
                      marginHorizontal: !isBack
                        ? pixelSizeHorizontal(20)
                        : pixelSizeHorizontal(0),
                      fontSize: FontSize.FS_20,
                    },
                  ]}
                >
                  {title}
                </Text>
              )}
            </View>

            {rightComponent && rightComponent}
          </View>
        </View>
        {isScroll ? (
          <ScrollView
            style={styles.container}
            contentContainerStyle={[{ ...scrollContainerStyle }]}
            // bounces={false}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="always"
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={() => {
                  console.log("onRefresh : ", onRefresh);
                  onRefresh == undefined ? {} : onRefresh?.();
                }}
              />
            }
          >
            <View
              style={[styles.mainView, { ...containerStyle }]}
              onStartShouldSetResponder={() => true}
            >
              {children}
            </View>
          </ScrollView>
        ) : (
          <View style={{ flex: 1, }}>
            <View
              style={[
                styles.headerImgContainer,
                {
                  height: props.HeaderSmall
                    ? SCREEN_WIDTH / 4
                    : SCREEN_WIDTH / 1.8,
                },
              ]}
            >
              <Image
                source={headerBackground}
                style={{
                  flex: 1,
                  borderBottomLeftRadius: 25,
                  borderBottomRightRadius: 25,
                  resizeMode: "cover",
                }}
              />

              <View style={styles.headerRowContainer}>
                {isBack && (
                  <IconButton
                    additionalStyle={styles.btnBack}
                    onPress={onPress}
                  >
                    <Icon name={"chevron-left"} size={32} color={titleColor} />
                  </IconButton>
                )}

                {leftComponent && leftComponent}

                <View style={{ flex: 1 }}>
                  {title && (
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.textTitle,
                        {
                          color: titleColor,
                          marginHorizontal: !isBack
                            ? pixelSizeHorizontal(20)
                            : pixelSizeHorizontal(0),
                          fontSize: FontSize.FS_20,
                        },
                      ]}
                    >
                      {title}
                    </Text>
                  )}
                </View>

                {rightComponent && rightComponent}
              </View>
            </View>

            <View
              style={[styles.mainView, { ...containerStyle }]}
              onStartShouldSetResponder={() => true}
            >
              {children}
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  headerRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: pixelSizeHorizontal(20),
    position: "absolute",
    bottom: pixelSizeHorizontal(20),
  },
  headerImgContainer: {
    width: SCREEN_WIDTH,
    backgroundColor: primary,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    // flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: offWhite,
  },
  textTitle: {
    fontFamily: BOLD,
    color: white,
  },
  btnBack: {},
  mainView: {
    width: "100%",
    backgroundColor: offWhite,
  },
});

export default HeaderView;
