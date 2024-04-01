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
import React, { useCallback, useState } from "react";
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
import { HStack, Radio, Stack } from "native-base";
import { SCREEN_WIDTH } from "../../constants/ConstantKey";
import moment from "moment";
import Divider from "../../commonComponents/Divider";

const SelectVenue = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [Txt, setTxt] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isInvite, setIsInvite] = useState(false);
  const [isFreeAll, setIsFreeAll] = useState(false);

  const [txtSearch, setTxtSearch] = useState("");


  useFocusEffect(useCallback(() => {}, []));
  const VenuesData = [
    {
      image:
        "https://content.jdmagicbox.com/comp/delhi/s4/011pxx11.xx11.151026131555.u2s4/catalogue/t-n-memorial-cricket-academy-nyay-khand-1-indirapuram-delhi-cricket-coaching-classes-g3hscbmrj5.jpg",
      venueName: "Ahemedabad cricket ground",
      venueAddress: "Ahemedabad",
      rating: "5.0",
    },
    {
      image:
        "https://media.hudle.in/venues/e5438e14-eef5-4ef7-8d40-2893200604b0/photo/91577a635c28585de0603a74f2bd7cf2014f27c4",
      venueName: "Vikramnagar Football Ground",
      venueAddress: "Ranip",
      rating: "5.0",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROJF5wMaNyC_atpMCOVJhDT-BuOFLkQ_4qpA&usqp=CAU",
      venueName: "ACC cricket ground",
      venueAddress: "Thaltej",
      rating: "5.0",
    },
    {
      image:
        "https://media.istockphoto.com/id/1130905980/photo/universal-grass-stadium-illuminated-by-spotlights-and-empty-green-grass-playground.jpg?b=1&s=170667a&w=0&k=20&c=7t-jHN-NyuCMH2S9BwUGmQBjbMZaRCykeG86n1PYaD0=",
      venueName: "Colosseum Ahmedabad",
      venueAddress: "Prahald nagar",
      rating: "5.0",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR355I7R0GFo-MLsVRZ0NPICjpTVSRG1T8gyQ&usqp=CAU",
      venueName: "Ahemedabad cricket ground",
      venueAddress: "Ghatlodia",
      rating: "5.0",
    },
    {
      image:
        "https://i1.wp.com/cricketgraph.com/wp-content/uploads/2017/06/LOGO-2.jpg?fit=613%2C341&ssl=1",
      venueName: "Kankaria Football Ground (Maninagar)",
      venueAddress: "Nikol",
      rating: "5.0",
    },
    {
      image:
        "https://content.jdmagicbox.com/comp/delhi/s4/011pxx11.xx11.151026131555.u2s4/catalogue/t-n-memorial-cricket-academy-nyay-khand-1-indirapuram-delhi-cricket-coaching-classes-g3hscbmrj5.jpg",
      venueName: "Ahemedabad cricket ground",
      venueAddress: "Naroda",
      rating: "5.0",
    },
    {
      image:
        "https://cdn3.mycity4kids.com/images/article-images/mobile-web/details/img-20160912-57d683c46cf11.jpg",
      venueName: "Table Tennis Association of Ahmedabad",
      venueAddress: "Bodakdev",
      rating: "5.0",
    },
  ];
  const OnPressNext = () => {
    navigate("SelectSlot");
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
        <View style={{ marginTop: 10, flex: 1 }}>

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
            data={VenuesData}
            ItemSeparatorComponent={() => (
              <Divider/>
            )}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  paddingVertical: pixelSizeHorizontal(12),
                  alignItems: "center",
                  flex:1,
                }}
              >
                <Icon name={"map-pin"} size={20} color={black} />
                <Text
                  style={{
                    fontFamily: MEDIUM,
                    fontSize: FontSize.FS_16,
                    color: black,
                    marginHorizontal: pixelSizeHorizontal(8),
                    flex:1
                  }}
                >
                  {item.venueName}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </HeaderView>
      {isLoading && <LoadingView />}
    </>
  );
};

const styles = StyleSheet.create({});

export default SelectVenue;
