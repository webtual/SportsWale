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


export default function Payment() {
  const [redeemToggle, setredeemToggle] = useState(false);
  const [amountToggle, setamountToggle] = useState(false);
  const [isGameSuccessModal, setIsGameSuccessModal] = useState(false);

  const [gameSkillIsOn, setGameSkillIsOn] = useState(false);
  const [gameLevel, setGameLevel] = useState(1);

  const [txtInstruction, setTxtInstuction] = useState("");

  const [gameType, setGameType] = useState(0);

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={"Vista Sports Arena"}
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
            <FastImage
              style={{
                width: 20,
                height: 20,
              }}
              source={ic_cricket}
              resizeMode="contain"
            />
            <Text
              style={{
                fontFamily: BOLD,
                fontSize: FontSize.FS_20,
                color: black,
                marginLeft: 10,
              }}
            >
              Box Cricket
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
              Mon 12 Dec,2024 | 07:30AM - 09:00 AM
            </Text>
          </View>
          {/* <View style={{ position: "absolute", right: 10, top: 10 }}>
            <Icon name={"trash-can-outline"} size={28} color={Colors.primary} />
          </View> */}

          <InfoItem
            style={{ marginTop: pixelSizeHorizontal(15) }}
            iconSource={
              <TurfIcon style={{ marginTop: pixelSizeHorizontal(3) }} />
            }
            text="Gokul Ground, Ahmedabad"
          />
          <InfoItem
            iconSource={
              <TurfIcon style={{ marginTop: pixelSizeHorizontal(3) }} />
            }
            text="6 a Side Turf2"
          />
          <InfoItem
            iconSource={
              <CashIcon style={{ marginTop: pixelSizeHorizontal(3) }} />
            }
            text={`${RUPEE} 2,500`}
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
                style={{ flex: 1, width: "100%" }}
                minimumValue={0}
                maximumValue={3}
                step={1}
                lowerLimit={1}
                value={gameLevel}
                thumbTintColor={white}
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
                value=""
                placeholder="200"
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
                value=""
                placeholder="200"
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
                value=""
                placeholder="200"
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
                value=""
                placeholder="200"
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
              {RUPEE}
            </Text>
            <View
              style={{ flex: 1 / 2.5, marginLeft: pixelSizeHorizontal(10) }}
            >
              <TextInputView
                value=""
                placeholder="200"
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
                value=""
                placeholder="200"
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
          style={{ flexDirection: "row", marginVertical: pixelSizeHorizontal(20) }}
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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </Text>
        </View>
      </HeaderView>

      <View style={{ paddingHorizontal: pixelSizeHorizontal(20) }}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.7}
          onPress={() => setIsGameSuccessModal(true)}
        >
          <Text
            style={{
              fontFamily: BOLD,
              fontSize: FontSize.FS_20,
              color: white,
            }}
          >
            {RUPEE} 1500
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
          isCloseBtn={false}
          onClose={() => {setIsGameSuccessModal(false)
            navigate("BokingDetails") }}
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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy.
            </Text>
          </View>
        </CenterModal>
      </View>
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
