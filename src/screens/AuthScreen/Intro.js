import { View, Text, SafeAreaView, StyleSheet, FlatList, Pressable, Animated } from 'react-native';
import React, { useCallback, useRef, useState } from 'react'
import { black, dim_grey, offWhite, secondary, white } from '../../constants/Color';
import { BOLD, FontSize, REGULAR, SEMIBOLD } from '../../constants/Fonts';
import { pixelSizeHorizontal } from '../../commonComponents/ResponsiveScreen';
import FastImage from 'react-native-fast-image';
import { Intro1, Intro2 } from '../../constants/Images';
import { SCREEN_WIDTH } from '../../constants/ConstantKey';
import Translate from '../../translation/Translate';
import { navigate, resetScreen } from '../../navigations/RootNavigation';

const Intro = () => {

  const scrollRef = useRef(null);

  const [index, setIndex] = useState(0);

  const SliderData = [
    {
      title: 'Top ',
      hash: '#1 ',
      appName: 'Sport App',
      subTitle: 'Lorem Ipsum is simply dummy the printing and typesetting industry',
      image: Intro1
    },
    {
      title: 'Top ',
      hash: '#1 ',
      appName: 'Sport App',
      subTitle: 'Lorem Ipsum is simply dummy the printing and typesetting industry',
      image: Intro2
    },
  ]


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

              <FastImage source={item.image} style={styles.imgStyle} resizeMode='contain' />
              <Text style={styles.textStyle}>{item.title}<Text onPress={() =>{  navigate("RegisterFinal")}} style={styles.hashTextStyle}>{item.hash}</Text><Text style={styles.textStyle}>{item.appName}</Text></Text>
              <Text style={styles.subTextStyle}>{item.subTitle}</Text>
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
  textStyle: {
    fontFamily: BOLD,
    color: black,
    fontSize: FontSize.FS_24,
    marginHorizontal: pixelSizeHorizontal(20),
    marginTop: pixelSizeHorizontal(50)
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
    textAlign:"center",
    marginHorizontal: pixelSizeHorizontal(40),
    marginTop: pixelSizeHorizontal(20)
  },
  imgStyle: {
    width: SCREEN_WIDTH - 70,
    height: SCREEN_WIDTH - 70,
  },
  btnStyle: {
    backgroundColor: black,
    padding: pixelSizeHorizontal(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginHorizontal: pixelSizeHorizontal(40),
    marginBottom: pixelSizeHorizontal(70),
    marginTop: pixelSizeHorizontal(30),
  },
  btnText: {
    fontFamily: SEMIBOLD,
    color: white,
    fontSize: FontSize.FS_22,
  }
});


export default Intro