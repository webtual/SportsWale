import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
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
import CommonStyle from "../../commonComponents/CommonStyle";
import { BOLD, FontSize, MEDIUM, SEMIBOLD } from "../../constants/Fonts";
import CustomPrice from "../../commonComponents/CustomPrice";
import Divider from "../../commonComponents/Divider";
import BookingPolicyIcon from "../../assets/images/BookingPolicyIcon";
import InfoIcon from "../../assets/images/InfoIcon";
import CallSVG from "../../assets/images/CallSVG";
import EditPenIcon from "../../assets/images/EditPenIcon";
import CallIcon2 from "../../assets/images/CallIcon2";
import { useToast } from "native-base";
import { TRANSACTION_DETAILS } from "../../constants/ApiUrl";
import ApiManager from "../../commonComponents/ApiManager";
import LoadingView from "../../commonComponents/LoadingView";
import { user_data } from "../../redux/reducers/userReducer";
import { useSelector } from "react-redux";
import moment from "moment";

const BokingDetails = (props) => {
  const toast = useToast();
  const userData = useSelector(user_data);

  const { transactionId } = props?.route?.params;

  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState(null);


  useEffect(() => {
    Api_Transactions_details(true);
  }, []);

  const Api_Transactions_details = (isLoad) => {

    setIsLoading(isLoad);
    const formData = new FormData();
    formData.append("id", transactionId);

    ApiManager.post(TRANSACTION_DETAILS, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Transactions_details : ", JSON.stringify(response));
        setIsLoading(false);
        
        if (response.data.status === true) {
          var finalData = response.data.data
          finalData["info"] = finalData?.purpose == "JOINING"
          ? finalData?.joining_information
          : finalData?.venue_booked_information;
          setTransactionData(finalData);
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Transactions_details Error ", err);
      });
  };

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

            {transactionData?.qr_image != null ?
            <Image
              source={{
                uri: userData?.asset_url + transactionData?.qr_image,
              }}
              style={{
                height: widthPixel(150),
                width: widthPixel(150),
                alignSelf: "center",
                resizeMode: "contain",
              }}
            /> : null}

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
              {transactionData?.reference_number}
              {/* {"   "}
              <Icon name={"content-copy"} size={20} color={primary} /> */}
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
              {transactionData?.info?.venue_title}
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
              {transactionData?.info?.venue_location}
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
              {transactionData?.info?.display_event_start_time} to {transactionData?.info?.display_event_end_time}{" "}
              | {moment(transactionData?.info?.event_date).format("ddd, DD MMM, YYYY")}
            </Text>
          </BasicCard>

          <BasicCard style={{ marginTop: pixelSizeHorizontal(20) }}>
            {transactionData?.purpose == "VENUE_BOOKED" && (
              <CustomPrice
                label="Venue Price"
                amount={transactionData?.info?.ground_amount}
                labelStyle={{ fontSize: FontSize.FS_16, fontFamily: MEDIUM }}
                amountStyle={{ fontSize: FontSize.FS_16, fontFamily: SEMIBOLD }}
              />
            )}

            {transactionData?.purpose == "JOINING" && (
              <CustomPrice
                label="Game Amount"
                amount={transactionData?.info?.total_amount_per_player}
                labelStyle={{ fontSize: FontSize.FS_16, fontFamily: MEDIUM }}
                amountStyle={{ fontSize: FontSize.FS_16, fontFamily: SEMIBOLD }}
              />
            )}

            <CustomPrice
              label="Convenience Fee"
              amount={transactionData?.info?.service_fees}
              labelStyle={{ fontSize: FontSize.FS_16, fontFamily: MEDIUM }}
              amountStyle={{ fontSize: FontSize.FS_16, fontFamily: SEMIBOLD }}
            />

            {/* <CustomPrice
              label="Discount/Coupon"
              amount={10}
              labelStyle={{ fontSize: FontSize.FS_16, fontFamily: MEDIUM }}
              amountStyle={{ fontSize: FontSize.FS_16, fontFamily: SEMIBOLD }}
            /> */}

            {/* {transactionData?.purpose == "VENUE_BOOKED" && (
              <CustomPrice
                label="Advance Paid"
                amount={10}
                labelStyle={{ fontSize: FontSize.FS_16, fontFamily: MEDIUM }}
                amountStyle={{ fontSize: FontSize.FS_16, fontFamily: SEMIBOLD }}
              />
            )} */}

            <Divider style={{ marginVertical: pixelSizeHorizontal(15) }} />

            <CustomPrice
              label="Total Amount"
              amount={transactionData?.info?.total_payable_amount}
              amountStyle={{
                fontFamily: BOLD,
                color: primary,
              }}
            />
          </BasicCard>

          <BasicCard style={{ marginVertical: pixelSizeHorizontal(20) }}>
            {transactionData?.purpose == "VENUE_BOOKED" && (
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
                  <BookingPolicyIcon height={26} />
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
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: pixelSizeHorizontal(20),
              }}
            >
              <View
                style={{
                  width: widthPixel(48),
                  height: widthPixel(48),
                  borderRadius: widthPixel(48),
                  backgroundColor: offWhite,
                  padding: pixelSizeHorizontal(12),
                }}
              >
                <InfoIcon />
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

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: pixelSizeHorizontal(20),
              }}
            >
              <View
                style={{
                  width: widthPixel(48),
                  height: widthPixel(48),
                  borderRadius: widthPixel(48),
                  backgroundColor: offWhite,
                  padding: pixelSizeHorizontal(12),
                }}
              >
                <EditPenIcon width={26} height={26} />
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
      {isLoading && <LoadingView />}
    </>
  );
};

export default BokingDetails;
