import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Pressable,
  Animated,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import {
  black,
  dim_grey,
  offWhite,
  secondary,
  white,
} from "../../constants/Color";
import {
  BOLD,
  EXTRABOLD,
  FontSize,
  REGULAR,
  SEMIBOLD,
} from "../../constants/Fonts";
import { pixelSizeHorizontal, widthPixel } from "../../commonComponents/ResponsiveScreen";
import { SCREEN_WIDTH } from "../../constants/ConstantKey";
import Translate from "../../translation/Translate";
import { navigate, resetScreen } from "../../navigations/RootNavigation";
import CommonStyle from "../../commonComponents/CommonStyle";
import IntroSVG from "../../assets/images/IntroSVG";

const Intro = () => {
  const scrollRef = useRef(null);

  const [index, setIndex] = useState(0);

  const SliderData = [
    {
      title: "Top ",
      hash: "#1 ",
      appName: "Sport App",
      subTitle:
        "Find your sports passion in our app",
      image: <IntroSVG height={300} />,
    },
  ];

  const scrollX = React.useRef(new Animated.Value(0)).current;
  const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    setIndex(viewableItems[0].index);
  }, []);

  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  // Action Methods
  const btnNextTap = () => {
    if (index == SliderData.length - 1) {
      resetScreen("Login");
    } else {
      scrollRef.current.scrollToIndex({ animated: true, index: index + 1 });
      setIndex(index + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
        bounces={false}
          ref={scrollRef}
          data={SliderData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          initialScrollIndex={index}
          onViewableItemsChanged={_onViewableItemsChanged}
          viewabilityConfig={_viewabilityConfig}
          decelerationRate={"normal"}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View style={styles.itemView}>
              <View
                style={{
                  flex: 1,
                  marginTop: pixelSizeHorizontal(20),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item?.image}
              </View>

              <Text style={styles.textStyle}>
                {item.title}
                <Text style={styles.hashTextStyle}>{item.hash}</Text>
                <Text style={styles.textStyle}>{item.appName}</Text>
              </Text>
              <Text style={styles.subTextStyle}>{item.subTitle}</Text>
            </View>
          )}
        />
        <Pressable
          onPress={() => btnNextTap()}
          style={[
            CommonStyle.mainBtnStyle,
            {
              marginHorizontal: pixelSizeHorizontal(20),
              marginVertical: pixelSizeHorizontal(30),
            },
          ]}
        >
          <Text style={CommonStyle.mainBtnText}>
            {Translate.t("next")}
            {/* {index == SliderData.length - 1
              ? Translate.t("done")
              : Translate.t("next")} */}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite,
  },
  itemView: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontFamily: EXTRABOLD,
    color: black,
    fontSize: FontSize.FS_24,
    marginHorizontal: pixelSizeHorizontal(20),
    marginTop: pixelSizeHorizontal(50),
  },
  hashTextStyle: {
    fontFamily: BOLD,
    color: secondary,
    fontSize: FontSize.FS_24,
  },
  subTextStyle: {
    fontFamily: REGULAR,
    color: dim_grey,
    fontSize: FontSize.FS_18,
    textAlign: "center",
    marginHorizontal: pixelSizeHorizontal(40),
    marginTop: pixelSizeHorizontal(20),
  },
  imgStyle: {
    width: pixelSizeHorizontal(SCREEN_WIDTH - 70),
    height: pixelSizeHorizontal(SCREEN_WIDTH - 70),
  },
  btnStyle: {
    backgroundColor: black,
    padding: pixelSizeHorizontal(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: widthPixel(40),
    marginHorizontal: pixelSizeHorizontal(40),
  },
  btnText: {
    fontFamily: SEMIBOLD,
    color: white,
    fontSize: FontSize.FS_22,
  },
});

export default Intro;
