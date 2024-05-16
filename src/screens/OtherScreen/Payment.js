import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderView from "../../commonComponents/HeaderView";
import {
  goBack,
  navigate,
  popToTop,
  resetScreen,
} from "../../navigations/RootNavigation";
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
import {
  black,
  dim_grey,
  placeholderGrey,
  primary,
  primary_light,
  secondary,
  white,
} from "../../constants/Color";
import { RUPEE } from "../../constants/ConstantKey";
import { CenterModal } from "../../commonComponents/Popup";
import UserThumbsUpIcon from "../../assets/images/UserThumbsUpIcon";
import TurfIcon from "../../assets/images/TurfIcon";
import CashIcon from "../../assets/images/CashIcon";
import CommonStyle from "../../commonComponents/CommonStyle";
import IdeaIcon from "../../assets/images/IdeaIcon";
import Slider from "@react-native-community/slider";
import TextInputView from "../../commonComponents/TextInputView";
import { user_data } from "../../redux/reducers/userReducer";
import { useSelector } from "react-redux";
import moment from "moment";
import { useToast } from "native-base";
import ApiManager from "../../commonComponents/ApiManager";
import { CREATE_GAME } from "../../constants/ApiUrl";
import LoadingView from "../../commonComponents/LoadingView";

export default function Payment(props) {
  const toast = useToast();

  const userData = useSelector(user_data);
  const { venueDetail, selectedSlots } = props?.route?.params;

  const [isLoading, setIsLoading] = useState(false);

  const [redeemToggle, setredeemToggle] = useState(false);
  const [amountToggle, setamountToggle] = useState(false);
  const [isGameSuccessModal, setIsGameSuccessModal] = useState(false);

  const [gameSkillIsOn, setGameSkillIsOn] = useState(false);
  const [gameLevel, setGameLevel] = useState(1);

  const [txtTotalPlayer, setTxtTotalPlayer] = useState("");
  const [txtCostPerPlayer, setTxtCostPerPlayer] = useState("");

  const [txtInstruction, setTxtInstuction] = useState("");

  const [gameType, setGameType] = useState(0);

  useEffect(() => {
    console.log("selectedSlots : ", selectedSlots);
  }, []);

  const Api_Book_Venue = (isLoad) => {
    setIsLoading(isLoad);

    var convenienceCharge =
      (venueDetail?.advance_amount * venueDetail?.convenience_fee_percentage) /
      100;

    const formData = new FormData();
    formData.append("venue_id", venueDetail?.id);
    formData.append("venue_ground_title", selectedSlots?.ground?.ground_title);
    formData.append(
      "venue_ground_id",
      selectedSlots?.time?.[0]?.venue_ground_id
    );
    formData.append("venue_game_id", selectedSlots?.time?.[0]?.venue_game_id);
    formData.append("venue_time_slot_id", selectedSlots?.time?.[0]?.id);
    formData.append(
      "book_date",
      moment(selectedSlots?.date).format("DD-MM-YYYY")
    );
    formData.append("book_start_time", selectedSlots?.time?.[0]?.time_start);
    formData.append("book_end_time", selectedSlots?.time?.[0]?.time_end);
    formData.append("game_skill_level_flag", gameSkillIsOn ? 1 : 0);
    formData.append(
      "game_skill_level",
      gameLevel == 1 ? "Beginner" : gameLevel == 2 ? "Intermediate" : "Advance"
    );
    formData.append("cost_per_player_amount", txtCostPerPlayer);
    formData.append("total_player", txtTotalPlayer);
    formData.append("instructions", txtInstruction);
    formData.append("ground_amount", venueDetail?.advance_amount);
    formData.append("total_payable_amount", calTotalPayableAmount());
    formData.append("payment_ref_id", "pay_001");
    formData.append("transaction_order_number", "pay_001");
    formData.append("is_public", gameType);

    formData.append("total_amount", venueDetail?.advance_amount);
    formData.append("convenience_fees", convenienceCharge);

    ApiManager.post(CREATE_GAME, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Book_Venue : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          setTransactionId(response?.data?.data?.transactions.id);

          toast.show({
            description: response.data.message,
          });
          setIsGameSuccessModal(true);
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Book_Venue Error ", err);
      });
  };

  const calTotalAmount = () => {
    console.log("Total Payable : ", txtCostPerPlayer * txtTotalPlayer);
    var amount = txtCostPerPlayer * txtTotalPlayer;
    return amount == NaN ? 0 : String(amount);
  };

  const calTotalPayableAmount = () => {
    var venueAmount = parseFloat(venueDetail?.advance_amount);
    var convenienceCharge =
      (venueDetail?.advance_amount * venueDetail?.convenience_fee_percentage) /
      100;

    return String(venueAmount + convenienceCharge);
  };

  const btnProcessTopPayTap = () => {
    if (txtCostPerPlayer == "" || txtTotalPlayer == "") {
      toast.show({
        description: "please ente cost per player and total players",
      });
    } else {
      Api_Book_Venue(true);
    }
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={venueDetail?.title || ""}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <BasicCard style={{ marginVertical: 10 }}>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
                tintColor: secondary,
              }}
              source={{
                uri: userData?.asset_url + selectedSlots?.sport?.game_image,
              }}
            />
            <Text
              style={{
                fontFamily: BOLD,
                fontSize: FontSize.FS_20,
                color: black,
                marginLeft: 10,
              }}
            >
              {selectedSlots?.sport?.game_title}
            </Text>
          </View>

          <View style={{}}>
            <Text
              style={{
                fontFamily: MEDIUM,
                fontSize: FontSize.FS_16,
                color: black,
              }}
            >
              {selectedSlots?.time[0]?.display_time_start} to{" "}
              {selectedSlots?.time[0]?.display_time_end}
            </Text>
          </View>

          <InfoItem
            style={{ marginTop: pixelSizeHorizontal(15) }}
            iconSource={
              <TurfIcon style={{ marginTop: pixelSizeHorizontal(3) }} />
            }
            text={venueDetail?.title}
          />
          <InfoItem
            iconSource={
              <TurfIcon style={{ marginTop: pixelSizeHorizontal(3) }} />
            }
            text={selectedSlots?.ground?.ground_title}
          />
          <InfoItem
            iconSource={
              <CashIcon style={{ marginTop: pixelSizeHorizontal(3) }} />
            }
            text={`${RUPEE} ${venueDetail?.advance_amount}`}
          />
          {/* <InfoItem iconSource={ic_secure_shield} text="Fitness Cover" /> */}
        </BasicCard>

        <View
          style={[
            styles.cardView,
            CommonStyle.shadow,
            { flexDirection: "column" },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IdeaIcon />
            <View
              style={{ flex: 1, marginHorizontal: pixelSizeHorizontal(12) }}
            >
              <Text style={styles.cardTitle}>Game Skill</Text>
            </View>
            <ToggleSwitch
              isOn={gameSkillIsOn}
              onColor={secondary}
              offColor={placeholderGrey}
              size="medium"
              onToggle={(isOn) => {
                setGameSkillIsOn(isOn);
                setGameLevel(1);
              }}
            />
          </View>

          {gameSkillIsOn && (
            <>
              <Slider
                style={{
                  flex: 1,
                  width: "100%",
                  marginTop: pixelSizeHorizontal(20),
                }}
                minimumValue={0}
                maximumValue={3}
                step={1}
                lowerLimit={1}
                value={gameLevel}
                thumbTintColor={Platform.OS == "ios" ? white : primary}
                minimumTrackTintColor={primary}
                maximumTrackTintColor={primary_light}
                onValueChange={setGameLevel}
              />
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardDescription}>Beginner</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    borderRightWidth: 3,
                    borderLeftWidth: 3,
                    borderRightColor: primary_light,
                    borderLeftColor: primary_light,
                  }}
                >
                  <Text style={styles.cardDescription}>Intermediate</Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Text style={styles.cardDescription}>Advance</Text>
                </View>
              </View>
            </>
          )}
        </View>

        <View style={{ marginTop: pixelSizeHorizontal(15) }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardDescription, { color: black }]}>
                Venue Cost
              </Text>
            </View>
            <Text style={[styles.cardTitle, { fontSize: FontSize.FS_18 }]}>
              {RUPEE}
            </Text>
            <View
              style={{ flex: 1 / 2.5, marginLeft: pixelSizeHorizontal(10) }}
            >
              <TextInputView
                value={venueDetail?.advance_amount}
                placeholder="00"
                editable={false}
                onChangeText={() => {}}
                maxLength={7}
                keyboardType={"number-pad"}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: pixelSizeHorizontal(10),
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardDescription, { color: black }]}>
                Total Player (Including Creator)
              </Text>
            </View>

            <View
              style={{ flex: 1 / 2.5, marginLeft: pixelSizeHorizontal(20) }}
            >
              <TextInputView
                value={txtTotalPlayer}
                placeholder=""
                onChangeText={setTxtTotalPlayer}
                maxLength={7}
                keyboardType={"number-pad"}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: pixelSizeHorizontal(10),
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardDescription, { color: black }]}>
                Cost Per Player
              </Text>
            </View>
            <Text style={[styles.cardTitle, { fontSize: FontSize.FS_18 }]}>
              {RUPEE}
            </Text>
            <View
              style={{ flex: 1 / 2.5, marginLeft: pixelSizeHorizontal(10) }}
            >
              <TextInputView
                value={txtCostPerPlayer}
                placeholder="00"
                onChangeText={setTxtCostPerPlayer}
                maxLength={7}
                keyboardType={"number-pad"}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: pixelSizeHorizontal(10),
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardDescription, { color: black }]}>
                Total Amount
              </Text>
            </View>
            <Text style={[styles.cardTitle, { fontSize: FontSize.FS_18 }]}>
              {RUPEE}
            </Text>
            <View
              style={{ flex: 1 / 2.5, marginLeft: pixelSizeHorizontal(10) }}
            >
              <TextInputView
                value={calTotalAmount()}
                editable={false}
                placeholder="00"
                onChangeText={() => {}}
                maxLength={7}
                keyboardType={"number-pad"}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: pixelSizeHorizontal(10),
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardDescription, { color: black }]}>
                Convenience Charge
              </Text>
            </View>
            <Text style={[styles.cardTitle, { fontSize: FontSize.FS_18 }]}>
              % {venueDetail?.convenience_fee_percentage} = {RUPEE}
            </Text>
            <View
              style={{ flex: 1 / 2.5, marginLeft: pixelSizeHorizontal(10) }}
            >
              <TextInputView
                value={String(
                  (venueDetail?.advance_amount *
                    venueDetail?.convenience_fee_percentage) /
                    100
                )}
                editable={false}
                placeholder="00"
                onChangeText={() => {}}
                maxLength={7}
                keyboardType={"number-pad"}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: pixelSizeHorizontal(10),
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  {
                    fontFamily: SEMIBOLD,
                    fontSize: FontSize.FS_16,
                    color: black,
                  },
                ]}
              >
                You Have To Pay
              </Text>
            </View>
            <Text style={[styles.cardTitle, { fontSize: FontSize.FS_18 }]}>
              {RUPEE}
            </Text>
            <View
              style={{ flex: 1 / 2.5, marginLeft: pixelSizeHorizontal(10) }}
            >
              <TextInputView
                value={calTotalPayableAmount()}
                placeholder="00"
                editable={false}
                onChangeText={() => {}}
                maxLength={7}
                keyboardType={"number-pad"}
                textFieldStyle={{
                  fontFamily: BOLD,
                  color: black,
                  fontSize: FontSize.FS_18,
                }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: pixelSizeHorizontal(20),
          }}
        >
          <TouchableOpacity
            style={[
              styles.iconBtnContainer,
              { backgroundColor: gameType == 0 ? secondary : primary_light },
            ]}
            onPress={() => setGameType(0)}
          >
            <Icon
              name={"web"}
              size={20}
              color={gameType == 0 ? white : black}
            />
            <Text
              style={[
                styles.iconBtnText,
                { color: gameType == 0 ? white : black },
              ]}
            >
              Public
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.iconBtnContainer,
              {
                marginLeft: pixelSizeHorizontal(20),
                backgroundColor: gameType == 1 ? secondary : primary_light,
              },
            ]}
            onPress={() => setGameType(1)}
          >
            <Icon
              name={"lock-outline"}
              size={20}
              color={gameType == 1 ? white : black}
            />
            <Text
              style={[
                styles.iconBtnText,
                { color: gameType == 1 ? white : black },
              ]}
            >
              invite only
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={[
            {
              fontFamily: SEMIBOLD,
              color: black,
              fontSize: FontSize.FS_14,
              marginTop: pixelSizeHorizontal(12),
            },
          ]}
        >
          Instructions (optional)
        </Text>
        <TextInputView
          containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
          textFieldStyle={{ minHeight: widthPixel(100) }}
          onChangeText={(text) => {
            setTxtInstuction(text);
          }}
          value={txtInstruction}
          placeholder={"Instructions (optional)"}
          error={""}
          multiline={true}
          textAlignVertical="top"
          blurOnSubmit={true}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
        />

        <View>
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_14,
              color: black,
              marginVertical: pixelSizeHorizontal(10),
            }}
          >
            Booking Policy's
          </Text>
          <Text
            style={{
              fontFamily: REGULAR,
              fontSize: FontSize.FS_12,
              color: black,
            }}
          >
            {venueDetail?.booking_policy}
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontFamily: SEMIBOLD,
              fontSize: FontSize.FS_14,
              color: black,
              marginVertical: pixelSizeHorizontal(15),
            }}
          >
            Cancellation Policy's
          </Text>
          <Text
            style={{
              fontFamily: REGULAR,
              fontSize: FontSize.FS_12,
              color: black,
            }}
          >
            {venueDetail?.cancellation_policy}
          </Text>
        </View>
      </HeaderView>

      <View style={{ paddingHorizontal: pixelSizeHorizontal(20) }}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.7}
          onPress={() => btnProcessTopPayTap()}
        >
          <Text
            style={{
              fontFamily: BOLD,
              fontSize: FontSize.FS_20,
              color: white,
            }}
          >
            {RUPEE} {calTotalPayableAmount()}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontFamily: BOLD,
                fontSize: FontSize.FS_16,
                color: white,
              }}
            >
              Proceed to Pay
            </Text>
            <Icon name={"chevron-right"} size={28} color={white} />
          </View>
        </TouchableOpacity>

        <CenterModal
          isVisible={isGameSuccessModal}
          isCloseBtn={true}
          onClose={() => {
            setIsGameSuccessModal(false);

            setTimeout(() => {
              Promise.all([resetScreen("Dashboard")]).then(() =>
                navigate("BokingDetails", { transactionId: transactionId })
              );
            }, 1000);
          }}
        >
          <View style={{ alignItems: "center" }}>
            <UserThumbsUpIcon />
            <Text
              style={{
                marginTop: pixelSizeHorizontal(12),
                textAlign: "center",
                fontFamily: BOLD,
                fontSize: FontSize.FS_18,
                color: black,
              }}
            >
              See you at the match!
            </Text>
            <Text
              style={{
                marginTop: pixelSizeHorizontal(12),
                textAlign: "center",
                fontFamily: REGULAR,
                fontSize: FontSize.FS_10,
                color: black,
              }}
            >
              Game has been created, please react to the location on time.
            </Text>
          </View>
        </CenterModal>
      </View>

      {isLoading && <LoadingView />}
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: secondary,
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
  cardView: {
    backgroundColor: white,
    borderRadius: widthPixel(12),
    flexDirection: "row",
    padding: pixelSizeHorizontal(17),
    alignItems: "center",
    marginTop: pixelSizeHorizontal(5),
  },
  cardTitle: {
    fontFamily: BOLD,
    fontSize: FontSize.FS_14,
    color: black,
  },
  cardDescription: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_12,
    color: dim_grey,
  },
  iconBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: pixelSizeHorizontal(10),
    flex: 1,
    borderRadius: widthPixel(5),
    backgroundColor: secondary,
    justifyContent: "center",
  },
  iconBtnText: {
    fontFamily: SEMIBOLD,
    color: black,
    fontSize: FontSize.FS_16,
    marginLeft: pixelSizeHorizontal(12),
    textTransform: "uppercase",
  },
});
