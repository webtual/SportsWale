import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack } from "../../navigations/RootNavigation";
import {
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import CommonStyle from "../../commonComponents/CommonStyle";
import { BOLD, FontSize, REGULAR, SEMIBOLD } from "../../constants/Fonts";
import {
  black,
  border,
  dim_grey,
  secondary,
  white,
} from "../../constants/Color";
import moment from "moment";
import IconButton from "../../commonComponents/IconButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ApiManager from "../../commonComponents/ApiManager";
import { DELETE_QUESTION, UPDATE_QUESTION } from "../../constants/ApiUrl";
import { useToast } from "native-base";
import LoadingView from "../../commonComponents/LoadingView";
import { BottomModal } from "../../commonComponents/Popup";
import TextInputView from "../../commonComponents/TextInputView";

const AllQuestions = (props) => {
  const { game_data } = props?.route?.params;
  const { returnBack } = props.route.params;

  const toast = useToast();

  const [questions, setQuestions] = useState(game_data.questions);
  const [isLoading, setIsLoading] = useState(false);
  const [txtReply, setTxtReply] = useState("");
  const [isOpenReply, setIsOpenReply] = useState(false);
  const [replyId, setReplyId] = useState(null);

  const handleBackPress = () => {
    returnBack(), goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    // Don't forget to remove the event listener when the component is unmounted
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  });

  const Api_delete_question = (isLoad, questionId) => {
    setIsLoading(isLoad);
    ApiManager.delete(DELETE_QUESTION + questionId, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_delete_question : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          const remove_question = questions.filter((q) => q.id !== questionId);
          setQuestions(remove_question);
          toast.show({
            description: response.data.message,
          });
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_delete_question Error ", err);
      });
  };

  const Api_update_question = (isLoad) => {
    setIsLoading(isLoad);
    const formData = new FormData();
    formData.append("answer", txtReply);

    ApiManager.put(UPDATE_QUESTION + replyId, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_update_question : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          const Answer = questions.map((question) => {
            if (question.id === replyId) {
              return {
                ...question,
                answer: txtReply,
              };
            }
            return question;
          });

          setQuestions(Answer);
          setIsOpenReply(false);
          setTxtReply("");
          setReplyId(null)
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Join_Game Error ", err);
      });
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={""}
        isBack={true}
        onPress={() => {
          returnBack(), goBack();
        }}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={[
              styles.card,
              {
                marginVertical: pixelSizeHorizontal(20),
              },
              CommonStyle.shadow,
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.titletext, { flex: 1 }]}>
                Questions ({questions?.length})
              </Text>
            </View>

            <FlatList
              data={questions}
              scrollEnabled={false}
              ListHeaderComponent={<View style={{ height: widthPixel(12) }} />}
              ListFooterComponent={<View style={{ height: widthPixel(12) }} />}
              ItemSeparatorComponent={
                <View style={{ height: widthPixel(12) }} />
              }
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={[styles.questionText]}
                        adjustsFontSizeToFit={true}
                      >
                        <Text style={{ fontFamily: SEMIBOLD }}>Q. </Text>
                        {item?.question}
                      </Text>
                      {item?.can_i_delete_question && (
                        <IconButton
                          additionalStyle={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onPress={() => {
                            Api_delete_question(true, item?.id);
                          }}
                        >
                          <Icon name={"delete"} size={22} color={secondary} />
                        </IconButton>
                      )}
                      {item?.can_i_update_answer && (
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderRadius: 5,
                            height: widthPixel(25),
                          }}
                          onPress={() => {
                            setReplyId(item.id);
                            setIsOpenReply(true);
                          }}
                        >
                          <Text style={[styles.questionText]}>Reply</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                    {item?.answer ? (
                      <Text
                        style={[
                          styles.questionText,
                          { marginTop: pixelSizeHorizontal(5) },
                        ]}
                      >
                        <Text style={{ fontFamily: SEMIBOLD }}>A.</Text>
                        {item?.answer}
                      </Text>
                    ) : null}
                    <Text
                      style={[
                        styles.questionText,
                        { textAlign: "right", color: dim_grey },
                      ]}
                    >
                      {moment
                        .utc(item?.created_at)
                        .local()
                        .startOf("seconds")
                        .fromNow()}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </HeaderView>

      <BottomModal
        isVisible={isOpenReply}
        title={"Reply Answer"}
        onClose={() => setIsOpenReply(false)}
      >
        <View
          style={{ padding: pixelSizeHorizontal(15), backgroundColor: white }}
        >
          <View style={{ marginVertical: pixelSizeHorizontal(12) }}>
            <TextInputView
              style={{
                minHeight: 100,
                width: "100%",
                backgroundColor: white,
                borderColor: border,
              }}
              placeholder="Write a Reply (Optional)"
              multiline
              textAlignVertical="top"
              value={txtReply}
              onChangeText={(text) => {
                setTxtReply(text);
              }}
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              blurOnSubmit={true}
            />
          </View>

          <TouchableOpacity
            style={[CommonStyle.mainBtnStyle]}
            onPress={() => {
              Api_update_question(true);
            }}
          >
            <Text style={CommonStyle.mainBtnText}>Send</Text>
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
  questionText: {
    flex: 3,
    fontSize: FontSize.FS_12,
    fontFamily: REGULAR,
    color: black,
  },
});
export default AllQuestions;
