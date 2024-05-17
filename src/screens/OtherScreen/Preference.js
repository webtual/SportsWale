import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack, navigate } from "../../navigations/RootNavigation";
import {
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import CommonStyle from "../../commonComponents/CommonStyle";
import { BOLD, FontSize } from "../../constants/Fonts";
import {
  black,
  dim_grey,
  placeholderGrey,
  secondary,
  white,
} from "../../constants/Color";
import BallsIcon from "../../assets/images/BallsIcon";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MapPinIcon from "../../assets/images/MapPinIcon";
import LocationIcon from "../../assets/images/LocationIcon";
import NotificationIcon from "../../assets/images/NotificationIcon";
import ToggleSwitch from "toggle-switch-react-native";
import { useToast } from "native-base";

const Preference = () => {
  const toast = useToast();

  const [isNotification, setIsNotification] = useState(false);

  const btnSportsTap = () => {
    navigate("MySports");
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={"Settings"}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={[
              CommonStyle.titleText,
              { fontSize: FontSize.FS_16, marginTop: pixelSizeHorizontal(20) },
            ]}
          >
            Preferences
          </Text>

          <TouchableOpacity
            style={[styles.cardView, {}]}
            onPress={() => btnSportsTap()}
          >
            <BallsIcon />
            <Text
              style={[
                styles.titleText,
                { marginHorizontal: pixelSizeHorizontal(20), flex: 1 },
              ]}
            >
              Sports
            </Text>

            <Icon name={"chevron-right"} size={25} color={dim_grey} />
          </TouchableOpacity>

          {/* <TouchableOpacity style={[styles.cardView,{}]}>
                <LocationIcon />
                <Text style={[styles.titleText,{marginHorizontal : pixelSizeHorizontal(20), flex:1}]}>
                    Location
                </Text>

                <Icon name={'chevron-right'} size={25} color={dim_grey}/>
            </TouchableOpacity> */}

          <View style={[styles.cardView, {}]}>
            <NotificationIcon />
            <Text
              style={[
                styles.titleText,
                { marginHorizontal: pixelSizeHorizontal(20), flex: 1 },
              ]}
            >
              Notifications
            </Text>

            <ToggleSwitch
              isOn={isNotification}
              onColor={secondary}
              offColor={placeholderGrey}
              size="medium"
              onToggle={(isOn) => {
                setIsNotification(isOn);
              }}
            />
            {/* <Icon name={'chevron-right'} size={25} color={dim_grey}/> */}
          </View>
        </View>
      </HeaderView>
    </>
  );
};

const styles = StyleSheet.create({
  cardView: {
    borderRadius: widthPixel(12),
    flexDirection: "row",
    backgroundColor: white,
    padding: pixelSizeHorizontal(15),
    alignItems: "center",
    marginTop: pixelSizeHorizontal(12),
  },
  titleText: {
    fontFamily: BOLD,
    fontSize: FontSize.FS_14,
    color: black,
  },
});

export default Preference;
