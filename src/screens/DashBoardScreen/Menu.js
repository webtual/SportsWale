import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import React from "react";
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
  import FastImage from "react-native-fast-image";
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
  
const MenuTab = () => {

    const MenuArr = [{
        image : "",
        title : "",
        description : "",
        routeName : ""
    }]

  return (
    <ScrollView style={{flex:1}}>
    <View style={{ paddingHorizontal: pixelSizeHorizontal(20), marginTop:pixelSizeVertical(50), paddingBottom : pixelSizeHorizontal(80) }}>
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
        <FastImage
          style={{ width: 75, height: 75, borderRadius: 40 }}
          source={{
            uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
          }}
          resizeMode="cover"
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
          Mike Smith
        </Text>

        <TouchableOpacity>
          <Text
            style={{
              fontFamily: REGULAR,
              fontSize: FontSize.FS_13,
              color: warmGrey,
            }}
          >
            View your Full Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>

    <BasicCard style={{ marginVertical: 10 }}>
      <View style={styles.header}>
        <FastImage
          style={styles.image}
          source={booking}
          resizeMode="cover"
        />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.primaryText}>Booking History</Text>
          <Text style={styles.secondaryText}>
            View Transections & Receipts
          </Text>
        </View>
      </View>

      <View style={styles.header}>
        <FastImage
          style={styles.image}
          source={athlete}
          resizeMode="cover"
        />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.primaryText}>Players</Text>
          <Text style={styles.secondaryText}>View & Manage Players</Text>
        </View>
      </View>

      <View style={styles.header}>
        <FastImage
          style={styles.image}
          source={wallet}
          resizeMode="cover"
        />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.primaryText}>Payments & Wallet</Text>
          <Text style={styles.secondaryText}>Manage Payment Settings</Text>
        </View>
      </View>

      <View style={styles.header}>
        <FastImage
          style={styles.image}
          source={control}
          resizeMode="cover"
        />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.primaryText}>Preference</Text>
          <Text style={styles.secondaryText}>
            Manage Sports, Location, etc
          </Text>
        </View>
      </View>

      <View style={styles.header}>
        <FastImage
          style={styles.image}
          source={ic_gift}
          resizeMode="cover"
        />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.primaryText}>Refer & Earn</Text>
        </View>
      </View>

      <View style={styles.header}>
        <FastImage
          style={styles.image}
          source={goodFeedback}
          resizeMode="cover"
        />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.primaryText}>Rate Us</Text>
        </View>
      </View>

      <View style={styles.header}>
        <FastImage style={styles.image} source={help} resizeMode="cover" />
        <View style={{ marginLeft: 15 }}>
          <Text style={styles.primaryText}>Help & Support</Text>
        </View>
      </View>
    </BasicCard>
  </View>
  </ScrollView>
  )
}


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
      marginTop:5
    },
  });

  
export default MenuTab