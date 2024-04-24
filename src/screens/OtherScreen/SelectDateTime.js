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
  Image,
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
import TextInputView from "../../commonComponents/TextInputView";
import {
  ic_activity,
  ic_calender,
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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { HStack, Radio, Stack } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const SelectDateTime = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [Txt, setTxt] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isInvite, setIsInvite] = useState(false);
  const [isFreeAll, setIsFreeAll] = useState(false);
  const [count, setCount] = useState(60);
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState("");
  const [BirthDate, setBirthDate] = useState(null);
  const [Location, setLocation] = useState("");
  const [BirthDateErr, setBirthDateErr] = useState(
    "Please enter Date of Birth"
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useFocusEffect(useCallback(() => {}, []));
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", typeof date);
    setBirthDate(date);
    hideDatePicker();
  };
  const OnPressNext = () => {
    navigate("InvitePeople");
  };
  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={Translate.t("select_date_time")}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => {
              showDatePicker();
            }}
            style={{
              marginTop: pixelSizeHorizontal(15),
              height: widthPixel(48),
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: white,
              borderRadius: 8,
              paddingHorizontal: 14,
            }}
          >
            <Image
              source={ic_calender}
              style={{ width: widthPixel(15), height: widthPixel(15), resizeMode : 'contain' }}
            />
            <View
              style={{
                flex: 1,
                marginLeft: pixelSizeHorizontal(15),
                paddingVertical: pixelSizeHorizontal(12),
              }}
            >
              <Text
                style={{
                  fontFamily: MEDIUM,
                  fontSize: FontSize.FS_16,
                  color: black,
                }}
              >
                {!BirthDate
                  ? Translate.t("select")
                  : moment(BirthDate).format("DD-MM-YY")}
              </Text>
            </View>
          </TouchableOpacity>
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
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {isLoading && <LoadingView />}
    </>
  );
};

const styles = StyleSheet.create({});

export default SelectDateTime;
