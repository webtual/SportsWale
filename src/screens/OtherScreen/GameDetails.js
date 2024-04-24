import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack, navigate } from "../../navigations/RootNavigation";
import {
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import IconButton from "../../commonComponents/IconButton";
import {
  black,
  border,
  offWhite,
  primary,
  primary_light,
  secondary,
  transparent,
  white,
} from "../../constants/Color";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  BOLD,
  FontSize,
  MEDIUM,
  REGULAR,
  SEMIBOLD,
} from "../../constants/Fonts";
import { useToast, Menu } from "native-base";
import { user_data } from "../../redux/reducers/userReducer";
import { useSelector } from "react-redux";
import LoadingView from "../../commonComponents/LoadingView";
import ApiManager from "../../commonComponents/ApiManager";
import { ADD_QUESTION, GAME_DETAILS } from "../../constants/ApiUrl";
import moment from "moment";
import BasicCard from "../../commonComponents/BasicCard";
import CommonStyle from "../../commonComponents/CommonStyle";
import NavigationIcon from "../../assets/images/NavigationIcon";
import FastImage from "react-native-fast-image";
import InfoItem from "../../commonComponents/InfoItem";
import TurfIcon from "../../assets/images/TurfIcon";
// import {
//   Menu,
//   MenuProvider,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
// } from "react-native-popup-menu";
import DotVerticalIcon from "../../assets/images/DotVerticalIcon";
import { BottomModal } from "../../commonComponents/Popup";
import TextInputView from "../../commonComponents/TextInputView";
import QuestionList from "../../commonComponents/QuestionList";

const GameDetails = (props) => {
  const toast = useToast();

  const { game_data } = props?.route?.params;

  const userData = useSelector(user_data);

  const [isLoading, setIsLoading] = useState(false);

  const [gameDetails, setGameDetails] = useState(null);
  const [isOpenQuestion, setOpenQuestion] = useState(false);

  const [txtQuestion, setTxtQuestion] = useState("");

  useEffect(() => {
    Api_Get_Game_Details(true);
  }, []);

  const Api_Get_Game_Details = (isLoad) => {
    setIsLoading(isLoad);
    const formData = new FormData();
    formData.append("venue_user_game_id", game_data?.id);

    ApiManager.post(GAME_DETAILS, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Get_Game_Details : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          setGameDetails(response.data.data);
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Get_Game_Details Error ", err);
      });
  };

  const Api_Add_Question = (isLoad) => {
    setIsLoading(isLoad);
    const formData = new FormData();
    formData.append("venue_user_game_id", game_data?.id);
    formData.append("venue_id", game_data?.venue_id);
    formData.append("question", txtQuestion);

    ApiManager.post(ADD_QUESTION, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Add_Question : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          toast.show({
            description: response.data.message,
          });
          setTxtQuestion("");
          setOpenQuestion(false);
          Api_Get_Game_Details(true);
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Add_Question Error ", err);
      });
  };

  const filterGameHost = () => {
    var host = gameDetails?.game_participants?.filter(
      (users) => users?.user_id == gameDetails?.user_id
    );
    return host?.[0] || null;
  };

  const btnJoinGameTap = () => {
    navigate("PayJoin", { game_details: gameDetails });
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={""}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
        rightComponent={
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            <IconButton additionalStyle={{}} onPress={() => {}}>
              <Icon name={"share-variant"} size={24} color={white} />
            </IconButton>
            <Menu
              closeOnSelect={false}
              // placement="bottom right" 
              style={{}}
              onOpen={() => console.log("opened")}
              onClose={() => console.log("closed")}
              trigger={(triggerProps) => {
                return (
                  <Pressable {...triggerProps} style={{ marginLeft: 15 }}>
                    <Icon name={"dots-vertical"} size={24} color={white} />
                  </Pressable>
                );
              }}
            >
              <Menu.Item _text={{fontFamily:MEDIUM , fontSize:FontSize.FS_14, color:black}}>Edit Game</Menu.Item>
              <Menu.Item _text={{fontFamily:MEDIUM , fontSize:FontSize.FS_14, color:black}}>Delete Game</Menu.Item>
            </Menu>
          </View>
        }
      >
        {gameDetails && (
          <View style={{}}>
            {/* <Text
              style={[
                styles.titletext,
                {
                  fontSize: FontSize.FS_20,
                  marginTop: pixelSizeHorizontal(20),
                },
              ]}
            >
              {gameDetails?.game_title}
            </Text>

            <Text
              style={[
                {
                  fontSize: FontSize.FS_16,
                  fontFamily: MEDIUM,
                  color: black,
                  marginTop: pixelSizeHorizontal(12),
                },
              ]}
            >
              {moment(gameDetails?.event_date).format("DD MMM, YYYY")} |{" "}
              {gameDetails?.event_start_time} - {gameDetails?.event_end_time}
            </Text> */}

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
                  tintColor={secondary}
                  source={{
                    uri: userData?.asset_url + gameDetails?.game_image,
                  }}
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
                  {gameDetails?.game_title}
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
                  {moment(gameDetails?.event_date).format("DD MMM, YYYY")} |{" "}
                  {gameDetails?.display_event_start_time} -{" "}
                  {gameDetails?.display_event_end_time}
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
                text={gameDetails?.venue_title}
              />
              <InfoItem
                iconSource={
                  <TurfIcon style={{ marginTop: pixelSizeHorizontal(3) }} />
                }
                text={gameDetails?.venue_ground_title}
              />
            </BasicCard>

            <View
              style={[
                styles.card,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginVertical: pixelSizeHorizontal(10),
                },
                CommonStyle.shadow,
              ]}
            >
              <NavigationIcon width={widthPixel(20)} height={widthPixel(20)} />
              <Text
                style={{
                  fontFamily: MEDIUM,
                  fontSize: FontSize.FS_13,
                  color: black,
                  marginLeft: 8,
                  flex: 1,
                }}
              >
                {gameDetails?.venue_location}
              </Text>
            </View>

            <View
              style={[
                styles.card,
                { marginTop: pixelSizeHorizontal(10) },
                CommonStyle.shadow,
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[styles.titletext, { flex: 1 }]}>
                  Players ({gameDetails?.total_join_players})
                </Text>

                <Text
                  style={{
                    color: black,
                    fontSize: FontSize.FS_12,
                    fontFamily: MEDIUM,
                    marginRight: pixelSizeHorizontal(12),
                  }}
                >
                  See All
                </Text>
                <IconButton
                  additionalStyle={{
                    backgroundColor: primary,
                    alignItems: "center",
                    justifyContent: "center",
                    padding: pixelSizeHorizontal(5),
                    borderRadius: widthPixel(50),
                  }}
                  onPress={() => {
                    navigate("AllPlayers", {
                      gameDetails: gameDetails,
                      players: gameDetails?.game_participants,
                    });
                  }}
                >
                  <Icon name={"chevron-right"} size={25} color={white} />
                </IconButton>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: pixelSizeHorizontal(12),
                }}
              >
                <FastImage
                  source={{
                    uri: userData?.asset_url + filterGameHost()?.profile,
                  }}
                  style={{
                    width: widthPixel(52),
                    height: widthPixel(52),
                    borderRadius: widthPixel(52),
                    borderWidth: pixelSizeHorizontal(2),
                    borderColor: white,
                  }}
                  resizeMode="cover"
                />

                <Text
                  style={[
                    {
                      color: black,
                      fontSize: FontSize.FS_14,
                      fontFamily: BOLD,
                      flex: 1,
                      marginHorizontal: pixelSizeHorizontal(5),
                    },
                  ]}
                >
                  {filterGameHost()?.name}
                </Text>
                <View
                  style={[
                    styles.badgeView,
                    {
                      backgroundColor: primary_light,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: primary,
                      fontSize: FontSize.FS_10,
                      fontFamily: SEMIBOLD,
                    }}
                  >
                    Host
                  </Text>
                </View>

                {filterGameHost()?.skill && (
                  <View
                    style={[
                      styles.badgeView,
                      {
                        backgroundColor: offWhite,
                        marginLeft: pixelSizeHorizontal(5),
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: black,
                        fontSize: FontSize.FS_10,
                        fontFamily: SEMIBOLD,
                      }}
                    >
                      {filterGameHost()?.skill}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {gameDetails?.instructions && (
              <>
                <View
                  style={[
                    styles.card,
                    {
                      marginTop: pixelSizeHorizontal(20),
                      flexDirection: "row",
                    },
                    CommonStyle.shadow,
                  ]}
                >
                  <Icon name={"information"} size={25} color={primary} />
                  <Text
                    style={[
                      styles.titletext,
                      { marginLeft: pixelSizeHorizontal(12) },
                    ]}
                  >
                    Instructions
                  </Text>
                </View>

                <View
                  style={[
                    styles.card,
                    { marginVertical: pixelSizeHorizontal(5) },
                    CommonStyle.shadow,
                  ]}
                >
                  <Text
                    style={{
                      fontSize: FontSize.FS_12,
                      color: black,
                      fontFamily: REGULAR,
                    }}
                  >
                    {gameDetails?.instructions}
                  </Text>
                </View>
              </>
            )}

            <View
              style={[
                styles.card,
                { marginVertical: pixelSizeHorizontal(20) },
                CommonStyle.shadow,
              ]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[styles.titletext, { flex: 1 }]}>
                  Questions ({gameDetails?.questions.length})
                </Text>

                {gameDetails?.questions.length > 1 ? (
                  <>
                    <Text
                      style={{
                        color: black,
                        fontSize: FontSize.FS_12,
                        fontFamily: MEDIUM,
                        marginRight: pixelSizeHorizontal(12),
                      }}
                    >
                      See All
                    </Text>
                    <IconButton
                      additionalStyle={{
                        backgroundColor: primary,
                        alignItems: "center",
                        justifyContent: "center",
                        padding: pixelSizeHorizontal(5),
                        borderRadius: widthPixel(50),
                      }}
                      onPress={() => {
                        navigate("AllQuestions", { game_data: gameDetails });
                      }}
                    >
                      <Icon name={"chevron-right"} size={25} color={white} />
                    </IconButton>
                  </>
                ) : null}
              </View>

              {gameDetails?.questions.length > 0 ? (
                <View style={{ marginVertical: pixelSizeHorizontal(20) }}>
                  <Text style={[styles.questionText]}>
                    <Text style={{ fontFamily: SEMIBOLD }}>Q. </Text>
                    {gameDetails?.questions?.[0]?.question}
                  </Text>
                  {gameDetails?.questions?.[0]?.answer ? (
                    <Text
                      style={[
                        styles.questionText,
                        { marginTop: pixelSizeHorizontal(5) },
                      ]}
                    >
                      <Text style={{ fontFamily: SEMIBOLD }}>A.</Text>
                      {gameDetails?.questions?.[0]?.answer}
                    </Text>
                  ) : null}
                </View>
              ) : (
                <Text
                  style={[
                    CommonStyle.titleText,
                    { marginTop: pixelSizeVertical(20), textAlign: "center" },
                  ]}
                >
                  No Questions Yet!
                </Text>
              )}

              {/* <QuestionList
                gameDetails={gameDetails}
              /> */}

              <TouchableOpacity
                style={[
                  CommonStyle.mainBtnStyle,
                  {
                    backgroundColor: transparent,
                    borderWidth: 1,
                    borderColor: black,
                    marginHorizontal: pixelSizeHorizontal(20),
                    marginVertical: pixelSizeHorizontal(20),
                  },
                ]}
                onPress={() => setOpenQuestion(true)}
              >
                <Text style={[CommonStyle.mainBtnText, { color: black }]}>
                  Ask Questions
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </HeaderView>
      {/* {userData?.id == gameDetails?.user_id ? <></>: */}
      {gameDetails?.spot_left != 0 ? (
        <TouchableOpacity
          style={[
            CommonStyle.mainBtnStyle,
            {
              marginHorizontal: pixelSizeHorizontal(20),
              marginBottom: pixelSizeHorizontal(20),
            },
          ]}
          onPress={() => btnJoinGameTap()}
        >
          <Text style={CommonStyle.mainBtnText}>Join Game</Text>
        </TouchableOpacity>
      ) : null}

      <BottomModal
        isVisible={isOpenQuestion}
        title={"Your Question"}
        onClose={() => setOpenQuestion(false)}
      >
        <View
          style={{ padding: pixelSizeHorizontal(15), backgroundColor: white }}
        >
          <Text style={[styles.questionText]}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy.
          </Text>

          <View style={{ marginVertical: pixelSizeHorizontal(12) }}>
            <TextInputView
              style={{
                minHeight: 100,
                width: "100%",
                backgroundColor: white,
                borderColor: border,
              }}
              placeholder="Write a review (Optional)"
              multiline
              textAlignVertical='top'
              value={txtQuestion}
              onChangeText={(text) => {
                setTxtQuestion(text);
              }}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              blurOnSubmit={true}
            />
          </View>

          <TouchableOpacity
            style={[CommonStyle.mainBtnStyle]}
            onPress={() => Api_Add_Question(true)}
          >
            <Text style={CommonStyle.mainBtnText}>Ask Question</Text>
          </TouchableOpacity>
        </View>
      </BottomModal>

      {isLoading && <LoadingView />}
    </>
  );
};

const styles = StyleSheet.create({
  titletext: {
    fontSize: FontSize.FS_18,
    fontFamily: BOLD,
    color: black,
  },
  card: {
    backgroundColor: white,
    borderRadius: widthPixel(12),
    padding: pixelSizeHorizontal(12),
  },
  badgeView: {
    paddingVertical: pixelSizeHorizontal(5),
    paddingHorizontal: pixelSizeHorizontal(15),
    borderRadius: 5,
  },
  questionText: {
    fontSize: FontSize.FS_12,
    fontFamily: REGULAR,
    color: black,
  },
});
export default GameDetails;
