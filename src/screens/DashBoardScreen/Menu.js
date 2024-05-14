import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import {
  black,
  black05,
  grey,
  light_grey,
  offWhite,
  primary,
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
  pixelSizeVertical,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import {
  goBack,
  navigate,
  resetScreen,
} from "../../navigations/RootNavigation";
import IconButton from "../../commonComponents/IconButton";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HeaderView from "../../commonComponents/HeaderView";
import BasicCard from "../../commonComponents/BasicCard";
import {
  athlete,
  booking,
  control,
  goodFeedback,
  help,
  ic_gift,
  wallet,
} from "../../constants/Images";
import { Colors } from "../../constants/CustomeColor";
import { useToast } from "native-base";
import { storeUserData, user_data } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import GiftBoxIcon from "../../assets/images/GiftBoxIcon";
import BookingIcon from "../../assets/images/BookingIcon";
import PlayerIcon from "../../assets/images/PlayerIcon";
import WalletIcon from "../../assets/images/WalletIcon";
import PreferenceIcon from "../../assets/images/PreferenceIcon";
import RateUsIcon from "../../assets/images/RateUsIcon";
import HelpSupportIcon from "../../assets/images/HelpSupportIcon";
import LogoutIcon from "../../assets/images/LogoutIcon";
import { removeAllData } from "../../commonComponents/AsyncManager";
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import InAppReview from 'react-native-in-app-review';
import UserDeleteIcon from "../../assets/images/UserDeleteIcon";
import HeartIcon from "../../assets/images/HeartIcon";



const MenuTab = () => {
  const dispatch = useDispatch()
  const toast = useToast();
  const userData = useSelector(user_data);

  const MenuArr = [
    {
      image: <BookingIcon />,
      title: "Booking History",
      description: "View Transections & Receipts",
      routeName: "BookingHistory",
    },
    // {
    //   image: <PlayerIcon />,
    //   title: "Players",
    //   description: "View & Manage Players",
    //   routeName: "",
    // },
    {
      image: <WalletIcon />,
      title: "Payments & Wallet",
      description: "Manage Payment Settings",
      routeName: "PaymentWallet",
    },
    {
      image: <PreferenceIcon />,
      title: "Preference",
      description: "Manage Sports, Location, etc",
      routeName: "Preference",
    },
    {
      image: <HeartIcon />,
      title: "Favourite Venues",
      description: "All venues which you love to play",
      routeName: "FavouriteVenue",
    },
    {
      image: <RateUsIcon />,
      title: "Rate Us",
      description: "",
      routeName: "rate_us",
    },
    {
      image: <HelpSupportIcon />,
      title: "Help & Support",
      description: "",
      routeName: "HelpSupport",
    },
    {
      image: <LogoutIcon width={32} height={32} />,
      title: "Logout",
      description: "",
      routeName: "logout",
    },
    {
      image: <UserDeleteIcon width={32} height={32} />,
      title: "Delete Account",
      description: "",
      routeName: "delete_account",
    },
  ];

  useEffect(() => {
    console.log("userData : ", userData);
  }, []);

  const showRatingAlert = () => {
    if (InAppReview.isAvailable()) {
      // trigger UI InAppreview
      InAppReview.RequestInAppReview()
        .then(hasFlowFinishedSuccessfully => {
          // when return true in android it means user finished or close review flow

          // when return true in ios it means review flow lanuched to user.

          // 1- you have option to do something ex: (navigate Home page) (in android).
          // 2- you have option to do something,
          // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

          // 3- another option:
          if (hasFlowFinishedSuccessfully) {
            // do something for ios
            // do something for android
            
          }

          // for android:
          // The flow has finished. The API does not indicate whether the user
          // reviewed or not, or even whether the review dialog was shown. Thus, no
          // matter the result, we continue our app flow.

          // for ios
          // the flow lanuched successfully, The API does not indicate whether the user
          // reviewed or not, or he/she closed flow yet as android, Thus, no
          // matter the result, we continue our app flow.
        })
        .catch(error => {
          console.log("error : ",error)
          //we continue our app flow.
          // we have some error could happen while lanuching InAppReview,
          // Check table for errors and code number that can return in catch.
        });
    }
  };


  /* Clear all stored data & Logout  */
  const goToLogin = async () => {
    removeAllData(() => {
      resetScreen('Splash')
      dispatch(storeUserData(null))

    }, (error) => {
     // console.log("Remove Data from Async Error : " + error)
    })
  }


  const handleMenuTap = (item) => {
    if (item.routeName == "delete_account") {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Alert",
        textBody: "Are you sure you want to delete account?",
        button: 'Delete',
        onPressButton: ()=> {
            Dialog.hide();
            goToLogin()
           //console.log("Logout successfully")
          },

      })
    } else if (item.routeName == "logout") {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Alert",
        textBody: "Are you sure you want to logout?",
        button: 'Logout',
        onPressButton: ()=> {
            Dialog.hide();
            goToLogin()
           //console.log("Logout successfully")
          },

      })
    }else if(item.routeName == "rate_us"){
      showRatingAlert()
    }
     else {
      navigate(item.routeName);
    }
  };




  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          paddingHorizontal: pixelSizeHorizontal(20),
          marginTop: pixelSizeVertical(50),
          paddingBottom: pixelSizeHorizontal(80),
        }}
      >
        {userData ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 80,
                height: 80,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 45,
                shadowColor: black05,
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.17,
                shadowRadius: 8,
                elevation: 3,
                marginRight: 10,
              }}
            >
              <Image
                style={{ width: 75, height: 75, borderRadius: 40 , resizeMode : 'cover'}}
                source={{
                  uri: userData?.asset_url + userData?.profile,
                }}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: SEMIBOLD,
                  fontSize: FontSize.FS_18,
                  color: black,
                }}
              >
                {userData?.first_name} {userData?.last_name}
              </Text>

              <TouchableOpacity onPress={()=> navigate("Profile")}>
                <Text
                  style={{
                    fontFamily: REGULAR,
                    fontSize: FontSize.FS_13,
                    color: warmGrey,
                  }}
                >
                  View your full profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        <BasicCard style={{ marginVertical: 10 }}>
          <FlatList
            data={MenuArr}
            scrollEnabled={false}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={styles.header}
                  onPress={() => handleMenuTap(item)}
                >
                  <View
                    style={{
                      backgroundColor: offWhite,
                      borderRadius: widthPixel(48),
                      padding: pixelSizeHorizontal(8),
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item?.image && item.image}
                  </View>
                  <View style={{ marginLeft: 15 , flex:1}}>
                    <Text style={[styles.primaryText,]}>{item?.title}</Text>
                    
                    {item?.description && (
                      <Text style={[styles.secondaryText,{flex:1}]}>
                        {item?.description}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </BasicCard>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  image: {
    width: 32,
    height: 32,
  },
  primaryText: {
    fontFamily: BOLD,
    fontSize: FontSize.FS_16,
    color: Colors.black,
  },
  secondaryText: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_14,
    color: Colors.secondaryDarkGrey,
    marginTop: 5,
  },
});

export default MenuTab;
