import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  FlatList,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  black,
  light_grey,
  primary,
  primary_light,
  secondary,
  warmGrey,
  white,
  grey,
  transparent,
  secondary_dark_grey,
  black05,
  border,
  dim_grey,
} from "../../constants/Color";

import Translate from "../../translation/Translate";
import {
  BOLD,
  FontSize,
  MEDIUM,
  REGULAR,
  SEMIBOLD,
} from "../../constants/Fonts";
import {
  heightPixel,
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import { goBack, navigate } from "../../navigations/RootNavigation";
import HeaderView from "../../commonComponents/HeaderView";
import LoadingView from "../../commonComponents/LoadingView";
import FastImage from "react-native-fast-image";
import TextInputView from "../../commonComponents/TextInputView";
import {
  ic_activity,
  ic_calender,
  ic_clock,
  ic_coin,
  ic_location,
  ic_mobile,
  ic_user,
} from "../../constants/Images";
import { Formik } from "formik";
import * as Yup from "yup";
import { Log } from "../../commonComponents/Log";
import { useFocusEffect } from "@react-navigation/native";
import CommonStyle from "../../commonComponents/CommonStyle";
import Icon from "react-native-vector-icons/Feather";
import { HStack, Radio, Stack, useToast } from "native-base";
import { SCREEN_WIDTH } from "../../constants/ConstantKey";
import moment from "moment";
import Divider from "../../commonComponents/Divider";
import VenuesCard from "../../commonComponents/VenuesCard";
import ApiManager from "../../commonComponents/ApiManager";
import { GET_ALL_VENUES } from "../../constants/ApiUrl";
import { useSelector } from "react-redux";
import { getUniqueListBy } from "../../commonComponents/Utils";

const SelectVenue = ({}) => {
  const toast = useToast()
  const userReduxData = useSelector((state) => state.userRedux);


  const [isLoading, setIsLoading] = useState(false);
  const [Txt, setTxt] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isInvite, setIsInvite] = useState(false);
  const [isFreeAll, setIsFreeAll] = useState(false);

  const [page, setPage] = useState(1);

  const [txtSearch, setTxtSearch] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [allVenues, setAllVenues] = useState([]);


  useFocusEffect(useCallback(() => {}, []));


  useEffect(() => {
    console.log("effecr call");
    Api_GetAllVenue(true);
  }, [page]);

  const Api_GetAllVenue = (isLoad) => {
    setIsLoading(isLoad);

    const formData = new FormData();
    formData.append("page", page);
    formData.append("limit", "10");
    formData.append("latitude", userReduxData.lat);
    formData.append("longitude", userReduxData.long);

    formData.append("favourites", 0);
    formData.append("keyword", txtSearch);

    ApiManager.post(GET_ALL_VENUES, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_GetAllVenue : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          var finalData = response.data.data;

          if (finalData?.current_page >= finalData?.total_pages) {
            setShowMore(false);

            var finalData = [
              ...allVenues,
              ...response.data.data.near_by_venues,
            ];
            setAllVenues(getUniqueListBy(finalData, "id"));
          } else {
            setShowMore(true);
            var finalData = [
              ...allVenues,
              ...response.data.data.near_by_venues,
            ];
            setAllVenues(getUniqueListBy(finalData, "id"));
          }
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_GetAllVenue Error ", err);
      });
  };

  
  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={"Select Venue/Location"}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ marginTop: 10, flex: 1 }} onStartShouldSetResponder={() => true}>

        <TextInputView
            icon={<Icon name={"search"} size={20} color={secondary} />}
            onChangeText={(text) => setTxtSearch(text)}
            value={txtSearch}
            placeholder={"Search venue"}
            clearButtonMode="while-editing"
          />

          <FlatList
            contentContainerStyle={{ paddingBottom: 15 }}
            bounces={false}
            data={allVenues}
            nestedScrollEnabled={true}
            onStartShouldSetResponder={() => true}
            ListHeaderComponent={() => (
              <View style={{ height: widthPixel(12) }} />
            )}
            ListFooterComponent={() =>
              showMore && (
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
              <View style={{marginHorizontal : pixelSizeHorizontal(5)}} onStartShouldSetResponder={() => true}>
              <VenuesCard
                item={item}
                styles={{ flex: 1 }}
                isShowFavourite={false}
                btnFavouriteTap={() => {
                  console.log("favorite");
                  Api_Favorite_Venue(true, item);
                }}
              />
              </View>
            )}
          />
        </View>
      </HeaderView>
      {isLoading && <LoadingView />}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_13,
  },
});

export default SelectVenue;
