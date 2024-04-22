import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack } from "../../navigations/RootNavigation";
import { pixelSizeHorizontal } from "../../commonComponents/ResponsiveScreen";
import TextInputView from "../../commonComponents/TextInputView";
import { BOLD, FontSize, MEDIUM, SEMIBOLD } from "../../constants/Fonts";
import { black, dim_grey, primary, white } from "../../constants/Color";
import CommonStyle from "../../commonComponents/CommonStyle";
import Translate from "../../translation/Translate";
import AttachIcon from "../../assets/images/AttachIcon";
import ImageCropPicker from "react-native-image-crop-picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FastImage from "react-native-fast-image";

export default function WriteUs() {
  const [description, setDescription] = useState("");

  const [screenshot, SetScreenshot] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const UploadImage = (setFieldValue) => {
    Alert.alert("Upload Picture", "Upload your profile picture", [
      {
        text: "Gallery",
        onPress: () => {
          setIsLoading(true);
          ImageCropPicker.openPicker({
            freeStyleCropEnabled: true,
            cropping: true,
            mediaType: "photo",
            includeBase64: false,
            compressImageQuality: 0.8,
            multiple: true,
          })
            .then((images) => {
              // console.log("Selected Image  " + JSON.stringify(images))
              SetScreenshot([...screenshot, ...images]);
              setIsLoading(false);
            })
            .catch((error) => {
              setIsLoading(false);
              console.log(error);
            });
        },
      },
      {
        text: "Camera",
        onPress: () => {
          setIsLoading(true);
          ImagePicker.openCamera({
            cropping: true,
            mediaType: "photo",
            includeBase64: false,
            freeStyleCropEnabled: true,
            compressImageQuality: 0.8,
            multiple: true,
          })
            .then((images) => {
              console.log("Selected Image : " + JSON.stringify(images));
              setIsLoading(false);
              SetScreenshot([...screenshot, ...images]);
            })
            .catch((error) => {
              setIsLoading(false);
              console.log(error);
            });
        },
        style: "default",
      },
      {
        text: "Cancel",
        onPress: () => {},
        style: "destructive",
      },
    ]);
  };
  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={"Write to us"}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: BOLD,
              fontSize: FontSize.FS_18,
              marginVertical: pixelSizeHorizontal(10),
              color: black,
            }}
          >
            Write Your Problem
          </Text>
          <TextInputView
            textAlignVertical="top"
            placeholder="Describe your problem"
            multiline
            maxLength={200}
            numberOfLines={7}
            onChangeText={(text) => {
              setDescription(text);
            }}
            value={description}
          />
          <Text
            style={{
              fontFamily: MEDIUM,
              fontSize: FontSize.FS_12,
              textAlign: "right",
              color: black,
            }}
          >
            {description.length}/200
          </Text>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              UploadImage();
            }}
          >
            <AttachIcon />
            <Text
              style={{
                marginLeft: 10,
                fontFamily: SEMIBOLD,
                fontSize: FontSize.FS_14,
                color: black,
                textDecorationLine: "underline",
              }}
            >
              Attach Screenshot(Optional)
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginVertical: pixelSizeHorizontal(10),
            }}
          >
            {screenshot?.map((image, index) => {
              return (
                <TouchableOpacity
                  style={{
                    marginRight: 15,
                    marginBottom: 10,
                    borderWidth: 2,
                    padding: 8,
                    borderRadius: 10,
                    borderColor: dim_grey,
                  }}
                  onPress={() => {}}
                >
                  <FastImage
                    source={{ uri: image.path }}
                    style={{ width: 50, height: 50 }}
                  />
                  <TouchableOpacity
                    style={{
                      backgroundColor: primary,
                      position: "absolute",
                      borderRadius: 20,
                      right: -8,
                      top: -5,
                    }}
                    onPress={() => {
                      handleRemoveImage(image, index);
                    }}
                  >
                    <Icon name={"close"} size={20} color={white} />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              btnDoneTap();
            }}
            style={[
              CommonStyle.mainBtnStyle,
              {
                margin: pixelSizeHorizontal(20),
                marginTop: pixelSizeHorizontal(30),
              },
            ]}
          >
            <Text style={CommonStyle.mainBtnText}>{Translate.t("send")}</Text>
          </TouchableOpacity>
        </View>
      </HeaderView>
    </>
  );
}

const styles = StyleSheet.create({});
