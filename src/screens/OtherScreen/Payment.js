import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack, navigate } from "../../navigations/RootNavigation";
import { Colors } from "../../constants/CustomeColor";
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
import FastImage from "react-native-fast-image";
import {
  ic_cricket,
  ic_football,
  ic_note,
  ic_secure_shield,
} from "../../constants/Images";
import BasicCard from "../../commonComponents/BasicCard";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import InfoItem from "../../commonComponents/InfoItem";
import CustomPrice from "../../commonComponents/CustomPrice";
import ToggleSwitch from "toggle-switch-react-native";

export default function Payment() {

  const [redeemToggle , setredeemToggle]=useState(false);
  const[amountToggle , setamountToggle]=useState(false);

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={Translate.t("select_slot")}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            alignItems: "center",
          }}
        >
          <FastImage
            style={{
              width: 20,
              height: 20,
            }}
            source={ic_cricket}
            resizeMode="cover"
          />
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_18,
              color: Colors.black,
              marginLeft: 10,
            }}
          >
            Box Cricket
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_13,
              color: Colors.black,
            }}
          >
            Mon 12 Dec,2024 |
          </Text>
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_13,
              color: Colors.black,
            }}
          >
            07:30AM - 09:00 AM
          </Text>
        </View>

        <BasicCard style={{ marginVertical: 10 }}>
          <View style={{ position: "absolute", right: 10, top: 10 }}>
            <Icon name={"trash-can-outline"} size={28} color={Colors.primary} />
          </View>

          <InfoItem iconSource={ic_football} text="6 a Side Turf2" />
          <InfoItem iconSource={ic_note} text="INR 2,500" />
          <InfoItem iconSource={ic_secure_shield} text="Fitness Cover" />
        </BasicCard>

        <CustomPrice
          label="Ground Price"
          iconName="information-outline"
          amount={1000}
        />

        <CustomPrice
          label="Convinevce Price"
          iconName="information-outline"
          amount={1000}
        />

        <ToggleSwitch
          isOn={redeemToggle}
          onColor="green"
          offColor="red"
          label="Reedem Point"
          labelStyle={{
            fontFamily: BOLD,
            fontSize: FontSize.FS_15,
            color: Colors.black,
          }}
          size="medium"
          onToggle={(isOn) => setredeemToggle(!redeemToggle)}
        />

        <BasicCard>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: SEMIBOLD,
                fontSize: FontSize.FS_16,
                color: Colors.black,
              }}
            >
              Apply Coupon
            </Text>
            <Icon name={"chevron-right"} size={28} color={Colors.black} />
          </TouchableOpacity>
        </BasicCard>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
            marginTop:15
          }}
        >
          <Text
            style={{
              fontFamily: BOLD,
              fontSize: FontSize.FS_16,
              color: Colors.black,
            }}
          >
            Total Amount
          </Text>
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_15,
              color: Colors.secondary,
            }}
          >
            INR 25000
          </Text>
        </View>

        <BasicCard style={{ marginVertical: 10 }}>
          <ToggleSwitch
            isOn={amountToggle}
            onColor="green"
            offColor="red"
            label="Pay Full Amount"
            labelStyle={{
              fontFamily: BOLD,
              fontSize: FontSize.FS_15,
              color: Colors.black,
            }}
            size="medium"
            onToggle={(isOn) => setamountToggle(!amountToggle)}
          />

          <CustomPrice label="Advance Payable" amount={1000} />

          <CustomPrice label="To be paid at Venue" amount={1000} />
        </BasicCard>

        <View>
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_16,
              color: Colors.black,
              marginVertical: 10,
            }}
          >
            Booking Policy's
          </Text>
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_12,
              color: Colors.black05,
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </Text>
        </View>
      </HeaderView>

      <View style={{ paddingHorizontal: pixelSizeHorizontal(40) }}>
        <TouchableOpacity style={styles.btn}>
          <Text
            style={{
              fontFamily: BOLD,
              fontSize: FontSize.FS_15,
              color: Colors.white,
            }}
          >
            INR 1500
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontFamily: BOLD,
                fontSize: FontSize.FS_14,
                color: Colors.white,
              }}
            >
              Proceed to Pay
            </Text>
            <Icon name={"chevron-right"} size={28} color={Colors.white} />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.secondary,
    borderWidth: 0,
    marginHorizontal: pixelSizeHorizontal(10),
    borderRadius: widthPixel(35),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    padding: pixelSizeHorizontal(10),
    paddingHorizontal: pixelSizeHorizontal(15),
  },
});
