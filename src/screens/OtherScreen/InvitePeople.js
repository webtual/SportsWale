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
  Share,
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
  light_grey_02,
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
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import {
  goBack,
  navigate,
  resetScreen,
} from "../../navigations/RootNavigation";
import HeaderView from "../../commonComponents/HeaderView";
import LoadingView from "../../commonComponents/LoadingView";
import TextInputView from "../../commonComponents/TextInputView";
import {
  ic_activity,
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
import ReferIcon from "../../assets/images/ReferIcon";
import { ANDROID_APP_LINK, IOS_APP_LINK, SCREEN_WIDTH } from "../../constants/ConstantKey";

const InvitePeople = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
 

  // Action Methods 
	const btnReferTap = () => {
        var message = `Check this out amazing app Sports Vale, Download & join to this app.\n\n Download app now:\nPlay Store Link : ${ANDROID_APP_LINK}\niPhone App Link : ${IOS_APP_LINK}` 
   
			const result = Share.share({
                title: "Sports Vale",
                message: message,
                // url: Platform.OS == 'ios' ? IOS_APP_LINK : ANDROID_APP_LINK
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
		
	}


  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={Translate.t("invite_people")}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ alignSelf: "center" }}>
            <ReferIcon width={SCREEN_WIDTH / 1.2} height={SCREEN_WIDTH / 1.2} />
          </View>

          <Text
            style={{
              textAlign: "center",
              flexDirection: "row",
              fontSize: FontSize.FS_20,
              fontFamily: BOLD,
              color: black,
            }}
          >
            Invite Your Friends To Shop On
            <Text style={{ color: secondary, fontFamily: BOLD }}>
              {" "}
              Sports Vale
            </Text>
          </Text>

          <Text
            style={{
              marginVertical: 12,
              textAlign: "center",
              flexDirection: "row",
              fontSize: FontSize.FS_16,
              fontFamily: SEMIBOLD,
              color: dim_grey,
            }}
          >
            Refer to your friend to join with top leading Sports app.
          </Text>

          <TouchableOpacity
            onPress={() => {
                btnReferTap();
            }}
            style={CommonStyle.mainBtnStyle}
          >
            <Text style={CommonStyle.mainBtnText}>Refer Now</Text>
          </TouchableOpacity>
        </View>
      </HeaderView>
      {isLoading && <LoadingView />}
    </>
  );
};

const styles = StyleSheet.create({});

export default InvitePeople;
