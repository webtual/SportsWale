import { View, Text } from "react-native";
import React from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { black, offWhite, primary, white } from "../../constants/Color";
import { goBack } from "../../navigations/RootNavigation";
import {
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import IconButton from "../../commonComponents/IconButton";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BasicCard from "../../commonComponents/BasicCard";
import FastImage from "react-native-fast-image";
import CommonStyle from "../../commonComponents/CommonStyle";
import { BOLD, FontSize, MEDIUM, SEMIBOLD } from "../../constants/Fonts";
import CustomPrice from "../../commonComponents/CustomPrice";
import Divider from "../../commonComponents/Divider";
import BookingPolicyIcon from "../../assets/images/BookingPolicyIcon";
import InfoIcon from "../../assets/images/InfoIcon";
import CallSVG from "../../assets/images/CallSVG";
import EditPenIcon from "../../assets/images/EditPenIcon";
import CallIcon2 from "../../assets/images/CallIcon2";

const BokingDetails = () => {
  return (
    <>
      <HeaderView
        HeaderSmall={true}
        StackScreen={true}
        title=""
        isBack={true}
        titleColor={white}
        onPress={() => goBack()}
        rightComponent={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconButton onPress={() => {}}>
              <Feather name={"mail"} size={20} color={white} />
            </IconButton>
            <IconButton
              onPress={() => {}}
              additionalStyle={{ marginHorizontal: pixelSizeHorizontal(18) }}
            >
              <Feather name={"share-2"} size={20} color={white} />
            </IconButton>

            <IconButton onPress={() => {}}>
              <Feather name={"download"} size={20} color={white} />
            </IconButton>
          </View>
        }
      >
        <View
          style={{
            flex: 1,
            marginHorizontal: pixelSizeHorizontal(20),
          }}
        >
          <BasicCard style={{ marginTop: pixelSizeHorizontal(20) }}>
            <FastImage
              source={{
                uri: "https://media.istockphoto.com/id/828088276/vector/qr-code-illustration.jpg?s=612x612&w=0&k=20&c=FnA7agr57XpFi081ZT5sEmxhLytMBlK4vzdQxt8A70M=",
              }}
              style={{
                height: widthPixel(150),
                width: widthPixel(150),
                alignSelf: "center",
              }}
              resizeMode="contain"
            />

            <Text
              style={[
                CommonStyle.titleText,
                { marginTop: pixelSizeHorizontal(20), textAlign: "center" },
              ]}
            >
              Booking ID
            </Text>
            <Text
              style={[
                CommonStyle.titleText,
                {
                  marginTop: pixelSizeHorizontal(5),
                  textAlign: "center",
                  color: primary,
                },
              ]}
            >
              SPTWL052508{"   "}
              <Icon name={"content-copy"} size={20} color={primary} />
            </Text>

            <Text
              style={[
                CommonStyle.inputTitle,
                {
                  fontFamily: BOLD,
                  textAlign: "center",
                  marginTop: pixelSizeHorizontal(20),
                },
              ]}
            >
              Universal Football Game
            </Text>
            <Text
              style={[
                CommonStyle.oneLinerText,
                {
                  color: black,
                  textAlign: "center",
                  marginTop: pixelSizeHorizontal(5),
                },
              ]}
            >
              Gokul Sports Arena, Ahmedabad
            </Text>
            <Text
              style={[
                CommonStyle.titleText,
                {
                  fontSize: FontSize.FS_14,
                  textAlign: "center",
                  marginTop: pixelSizeHorizontal(5),
                },
              ]}
            >
              26th January 2024 | 07:30 AM - 09:00 AM
            </Text>
          </BasicCard>

          <BasicCard style={{ marginTop: pixelSizeHorizontal(20) }}>
            <CustomPrice
              label="Venue Price"
              amount={1000}
              labelStyle={{ fontSize: FontSize.FS_16, fontFamily: MEDIUM }}
              amountStyle={{ fontSize: FontSize.FS_16, fontFamily: SEMIBOLD }}
            />
            <CustomPrice
              label="Convenience Fee"
              amount={10}
              labelStyle={{ fontSize: FontSize.FS_16, fontFamily: MEDIUM }}
              amountStyle={{ fontSize: FontSize.FS_16, fontFamily: SEMIBOLD }}
            />

            <Divider style={{ marginVertical: pixelSizeHorizontal(15) }} />

            <CustomPrice
              label="Total Amount"
              amount={1100}
              amountStyle={{
                fontFamily: BOLD,
                color: primary,
              }}
            />
          </BasicCard>

          <BasicCard style={{ marginVertical: pixelSizeHorizontal(20) }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: widthPixel(48),
                  height: widthPixel(48),
                  borderRadius: widthPixel(48),
                  backgroundColor: offWhite,
                  padding: pixelSizeHorizontal(12),
                }}
              >
                <BookingPolicyIcon height={26}/>
              </View>
              <Text
                style={[
                  CommonStyle.modalHeaderText,
                  {
                    fontSize: FontSize.FS_16,
                    flex: 1,
                    marginHorizontal: pixelSizeHorizontal(10),
                  },
                ]}
              >
                Booking Policies
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", marginTop : pixelSizeHorizontal(20) }}>
              <View
                style={{
                  width: widthPixel(48),
                  height: widthPixel(48),
                  borderRadius: widthPixel(48),
                  backgroundColor: offWhite,
                  padding: pixelSizeHorizontal(12),
                }}
              >
                <InfoIcon/>
              </View>
              <Text
                style={[
                  CommonStyle.modalHeaderText,
                  {
                    fontSize: FontSize.FS_16,
                    flex: 1,
                    marginHorizontal: pixelSizeHorizontal(10),
                  },
                ]}
              >
                View Game Details
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", marginTop : pixelSizeHorizontal(20) }}>
              <View
                style={{
                  width: widthPixel(48),
                  height: widthPixel(48),
                  borderRadius: widthPixel(48),
                  backgroundColor: offWhite,
                  padding: pixelSizeHorizontal(12),
                }}
              >
                <CallIcon2/>
              </View>
              <Text
                style={[
                  CommonStyle.modalHeaderText,
                  {
                    fontSize: FontSize.FS_16,
                    flex: 1,
                    marginHorizontal: pixelSizeHorizontal(10),
                  },
                ]}
              >
               Get in touch
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", marginTop : pixelSizeHorizontal(20) }}>
              <View
                style={{
                  width: widthPixel(48),
                  height: widthPixel(48),
                  borderRadius: widthPixel(48),
                  backgroundColor: offWhite,
                  padding: pixelSizeHorizontal(12),
                }}
              >
                <EditPenIcon width={26} height={26}/>
              </View>
              <Text
                style={[
                  CommonStyle.modalHeaderText,
                  {
                    fontSize: FontSize.FS_16,
                    flex: 1,
                    marginHorizontal: pixelSizeHorizontal(10),
                  },
                ]}
              >
               Write to us
              </Text>
            </View>
          </BasicCard>
        </View>
      </HeaderView>
    </>
  );
};

export default BokingDetails;
