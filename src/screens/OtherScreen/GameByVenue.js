import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { goBack } from '../../navigations/RootNavigation';
import { pixelSizeHorizontal, widthPixel } from '../../commonComponents/ResponsiveScreen';
import HeaderView from '../../commonComponents/HeaderView';
import { dim_grey, white } from '../../constants/Color';
import { FontSize, SEMIBOLD } from '../../constants/Fonts';
import GamesCard from '../../commonComponents/GamesCard';
import { SCREEN_WIDTH } from '../../constants/ConstantKey';
import LoadingView from '../../commonComponents/LoadingView';
import { getUniqueListBy } from '../../commonComponents/Utils';
import ApiManager from '../../commonComponents/ApiManager';
import { VENUE_UPCOMING_GAME } from '../../constants/ApiUrl';

const GameByVenue = (props) => {

  const { venueDetail} = props?.route?.params;

  const [isLoading, setIsLoading] = useState(false)

  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(false);


  const [allUpcommingEvents, setAllUpcommingEvents] = useState([])


  useEffect(() => {

    Api_UpcomingList(true, );
  }, [page]);


  const Api_UpcomingList = (isLoad) => {
    setIsLoading?.(isLoad);

    const formData = new FormData();
    formData.append("page", page);
    formData.append("limit", "10");
    formData.append("venue_id", venueDetail.id);

    ApiManager.post(VENUE_UPCOMING_GAME, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_UpcomingList : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          var finalData = response.data.data;

          if (finalData?.current_page >= finalData?.total_pages) {
            setShowMore(false);

            var finalData = [
              ...allUpcommingEvents,
              ...response.data.data.by_venue_events,
            ];
            setAllUpcommingEvents(getUniqueListBy(finalData, "id"));
          } else {
            setShowMore(true);
            var finalData = [
              ...allUpcommingEvents,
              ...response.data.data.by_venue_events,
            ];
            setAllUpcommingEvents(getUniqueListBy(finalData, "id"));
          }
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_UpcomingList Error ", err);
      });
  };

  return (
    <>
    <HeaderView
      HeaderSmall={true}
      title={"Upcomming Events"}
      isBack={true}
      onPress={() => goBack()}
      containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
    >
        <View style={{ flex: 1 }}>

        <FlatList
        style={{ flex: 1 }}
        data={allUpcommingEvents}
        scrollEnabled
        nestedScrollEnabled={true}
        // extraData={props}
        ListHeaderComponent={() => <View style={{ height: widthPixel(12) }} />}
        ListFooterComponent={() =>
          showMore ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginVertical: pixelSizeHorizontal(20),
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => setPage(page + 1)}
              >
                <Text style={[styles.text, { color: secondary }]}>
                  Show more
                </Text>
                <Icon name={"arrow-down"} size={20} color={secondary} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ height: widthPixel(20) }} />
          )
        }
        ItemSeparatorComponent={() => (
          <View style={{ height: widthPixel(12) }} />
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: pixelSizeHorizontal(30),
            }}
          >
            <Text style={[styles.text, { color: dim_grey }]}>
              No record found
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <GamesCard
            cardStyles={{ width: SCREEN_WIDTH - 40 }}
            item={item}
            bookMark={false}
          />
        )}
      />

{isLoading &&<LoadingView/>}

        </View>
        </HeaderView>
        </>
  )
}


const styles = StyleSheet.create({
    cardView: {
      backgroundColor: white,
      borderRadius: widthPixel(20),
      padding: pixelSizeHorizontal(12),
    },
    text: {
      fontFamily: SEMIBOLD,
      fontSize: FontSize.FS_13,
    },
  });

export default GameByVenue