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
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import { goBack, navigate } from "../../navigations/RootNavigation";
import HeaderView from "../../commonComponents/HeaderView";
import LoadingView from "../../commonComponents/LoadingView";
import FastImage from "react-native-fast-image";
import TextInputView from "../../commonComponents/TextInputView";
import { ic_mobile, ic_user } from "../../constants/Images";
import { Formik } from "formik";
import * as Yup from "yup";
import { Log } from "../../commonComponents/Log";
import { useFocusEffect } from "@react-navigation/native";
import CommonStyle from "../../commonComponents/CommonStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CreateActivity = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [Sport, setSport] = useState("");
  useFocusEffect(useCallback(() => {}, []));

  const IntrestData = [
    {
      id: 1,
      SportName: "Cricket",
      SportImage: "cricket",
    },
    {
      id: 2,
      SportName: "Football",
      SportImage: "soccer",
    },
    {
      id: 3,
      SportName: "Cycling",
      SportImage: "bike",
    },
    {
      id: 4,
      SportName: "Baseball",
      SportImage: "baseball",
    },
    {
      id: 5,
      SportName: "Swimming",
      SportImage: "swim",
    },
    {
      id: 6,
      SportName: "Tennis",
      SportImage: "tennis",
    },
    {
      id: 7,
      SportName: "Volley ball",
      SportImage: "volleyball",
    },

    {
      id: 8,
      SportName: "Basketball",
      SportImage: "basketball",
    },
    {
      id: 9,
      SportName: "Water polo",
      SportImage: "water-polo",
    },
  ];

  const SelectIntrest = (item) => {
    setSport(item);
  };

  const checkExists = (item) => {
    if (Sport.id === item.id) {
      return true;
    } else {
      return false;
    }
  };
  const OnPressNext = () => {
    navigate("EnterActivityName", { SportData: Sport });
  };
  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={Translate.t("create_activity")}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_20,
              color: black,
              margin: 5,
            }}
          >
            {Translate.t("select_sport")}
          </Text>

          <FlatList
            data={IntrestData}
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              // justifyContent:"center",
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  alignItems: "center",
                  marginVertical: 14,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => SelectIntrest(item)}
                  style={{
                    backgroundColor:
                      checkExists(item) == true ? primary : primary_light,
                    marginHorizontal: 10,
                    width: 60,
                    height: 60,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                    justifyContent: "center",
                    borderRadius: 50,
                  }}
                >
                  <Icon
                    name={item.SportImage}
                    size={42}
                    color={checkExists(item) == true ? white : primary}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: SEMIBOLD,
                    fontSize: FontSize.FS_14,
                    color: black,
                    marginVertical: 5,
                  }}
                >
                  {item.SportName}
                </Text>
              </View>
            )}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              OnPressNext();
            }}
            style={CommonStyle.mainBtnStyle}
          >
            <Text style={CommonStyle.mainBtnText}>{Translate.t("next")}</Text>
          </TouchableOpacity>
        </View>
      </HeaderView>
      {isLoading && <LoadingView />}
    </>
  );
};

export default CreateActivity;
