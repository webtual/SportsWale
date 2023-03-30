import { View, Text, SafeAreaView, StyleSheet, FlatList, Image, Pressable, Animated, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { black, disableColor, greenPrimary, offWhite, primary, secondary, secondary_dark_grey, secondary_grey, white, yellow } from '../constants/Color';
import { BOLD, FontSize, MEDIUM, REGULAR, SEMIBOLD } from '../constants/Fonts';
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen';
import FastImage from 'react-native-fast-image';
import { Intro1, Intro2, Intro3 } from '../constants/Images';
import { SCREEN_WIDTH } from '../constants/ConstantKey';
import Translate from '../translation/Translate';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import { navigate, resetScreen } from '../navigations/RootNavigation';

const Intro = () => {

  const scrollRef = useRef(null);

  const [index, setIndex] = useState(0);

  const SliderData = [
    {
      title: 'PLAY',
      desc: 'Discover amazing playgrounds near by your location and join the matches',
      image: Intro1
    },
    {
      title: 'CREATE',
      desc: 'Create activity to get players nearby location!!!',
      image: Intro2

    },
    {
      title: 'BOOK',
      desc: 'Connect to the turf game you love!!!',
      image: Intro3
    },
  ]

  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { width, height } = Dimensions.get('window');

  const setSliderPage = (event) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const { currentPage: pageIndex } = sliderState;
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    console.log("viewableItems",viewableItems)
    // setIndex(viewableItems[0].index);
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
        <View style={styles.paginationWrapper}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1, flexDirection: 'row', }}>
              {SliderData.map((item, inx) => (
                <View
                  key={inx}
                  style={[
                    styles.dotView,
                    { backgroundColor: secondary },
                    { borderColor: inx == index ? primary : secondary_grey },
                  ]}></View>
              ))}
            </View>
            <TouchableOpacity onPress={() => navigate("Dashboard")}
              style={{ marginHorizontal: 24 }}><Text style={{ fontSize: 16, fontFamily: MEDIUM, color: primary }}>Skip</Text></TouchableOpacity>
          </View>
        </View>
        <FlatList
          style={{ top: 70 }}
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
          decelerationRate={'normal'}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View style={styles.itemView}>

              <FastImage source={item.image} style={styles.imageStyle} resizeMode='contain' />
              <Text style={styles.header}>{item.title}</Text>
              <Text style={styles.paragraph}>{item.desc}</Text>
            </View>
          )}
        />
        <Pressable
          onPress={() => btnNextTap()}
          style={styles.btnStyle}>
          <Text style={styles.btnText}>{index == SliderData.length - 1 ? Translate.t("done") : Translate.t("next")}</Text>

        </Pressable>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite
  },
  itemView: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    backgroundColor: primary,
    padding: pixelSizeHorizontal(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: widthPixel(8),
    marginHorizontal: pixelSizeHorizontal(40),
    marginVertical: pixelSizeHorizontal(70),
  },
  btnText: {
    fontFamily: SEMIBOLD,
    color: white,
    fontSize: FontSize.FS_22,
    textTransform: 'uppercase',
  },
  imageStyle: {
    height: SCREEN_WIDTH - 80,
    width: SCREEN_WIDTH - 80,
    marginTop: 25
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  header: {
    fontSize: 30,
    fontFamily: BOLD,
    marginBottom: 20,
    color: black
  },
  paragraph: {
    textAlign: "center",
    fontSize: 17,
    fontFamily: REGULAR,
    marginBottom: 20,
    color: primary,
    marginHorizontal: 24
  },
  paginationWrapper: {
    position: 'absolute',
    top: 10,
    left: 14,
    right: 0,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  dotView: {
    width: 16,
    height: 16,
    borderRadius: 20,
    backgroundColor: primary,
    borderWidth: 2,
    marginLeft: 10,
  },

});


export default Intro