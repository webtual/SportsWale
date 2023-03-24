import { View, Text, SafeAreaView, StyleSheet, FlatList, Image, Pressable, Animated, Dimensions, ScrollView } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { black, disableColor, greenPrimary, offWhite, white } from '../constants/Color';
import { FontSize, SEMIBOLD } from '../constants/Fonts';
import { pixelSizeHorizontal, widthPixel } from '../commonComponents/ResponsiveScreen';
import FastImage from 'react-native-fast-image';
import { Intro1, Intro2, Intro3 } from '../constants/Images';
import { SCREEN_WIDTH } from '../constants/ConstantKey';
import Translate from '../translation/Translate';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import { resetScreen } from '../navigations/RootNavigation';

const Intro = () => {

    const scrollRef = useRef(null);

    const [index, setIndex] = useState(0);

    const SliderData = [
        {
            title: 'Find QR in bag',
            image: Intro1
        },
        {
            title: 'Scan a QR code',
            image: Intro2
        },
        {
            title: 'Earn exciting loyalty points',
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
        setIndex(viewableItems[0].index);
    }, []);

    const _viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };


    // Action Methods
    const btnNextTap = () => {

      resetScreen("Login");
      return

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

                {/* <FlatList
                    ref={scrollRef}
                    data={SliderData}
                    containerStyle={{position:"absolute",bottom:0}}
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
                            <Text style={styles.textStyle}>{item.title}</Text>
                        </View>
                    )}
                />


                <View style={{}}>
                    <ExpandingDot
                        data={SliderData}
                        expandingDotWidth={widthPixel(30)}
                        scrollX={scrollX}
                        // inActiveDotOpacity={0.3}
                        inActiveDotColor={disableColor}
                        activeDotColor={greenPrimary}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 5
                        }}
                        containerStyle={{
                        
                        }}
                        flexStyle={{    position:"absolute",top:5}}
                    />
                </View> */}
 <View style={styles.paginationWrapper}>
          {Array.from(Array(3).keys()).map((key, index) => (
            <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
          ))}
        </View>
<ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            setSliderPage(event);
          }}
        >
          <View style={{ width, height,alignItems:"center",justifyContent:"center",alignSelf:"center" }}>
            <Image source={Intro1} style={styles.imageStyle} />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Nature Imitates Art</Text>
              <Text style={styles.paragraph}>....something like that</Text>
            </View>
          </View>
          <View style={{ width, height,alignItems:"center",justifyContent:"center",alignSelf:"center" }}>
            <Image
              source={Intro2}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>High quality Art work</Text>
              <Text style={styles.paragraph}>... for a fraction of the price</Text>
            </View>
          </View>
          <View style={{ width, height,alignItems:"center",justifyContent:"center",alignSelf:"center" }}>
            <Image
              source={Intro3}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Top Notch Artists</Text>
              <Text style={styles.paragraph}>... all in one place</Text>
            </View>
          </View>
        </ScrollView>
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
        fontFamily: SEMIBOLD,
        color: black,
        fontSize: FontSize.FS_18,
        marginHorizontal: pixelSizeHorizontal(20),
        marginTop: pixelSizeHorizontal(50)
    },
    imgStyle: {
        width: SCREEN_WIDTH - 70,
        height: SCREEN_WIDTH - 70,
    },
    btnStyle: {
        backgroundColor: black,
        padding: pixelSizeHorizontal(10),
        alignItems: 'center',
        justifyContent : 'center',
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
        height: SCREEN_WIDTH - 70,
        width: SCREEN_WIDTH - 70,
      },
      wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
      },
      header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      paragraph: {
        fontSize: 17,
      },
      paginationWrapper: {
        position: 'absolute',
        bottom: 200,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:"red"
      },
      paginationDots: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: '#0898A0',
        marginLeft: 10,
      },
});


export default Intro