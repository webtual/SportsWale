import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import LoadingView from "../../commonComponents/LoadingView";
import HeaderView from "../../commonComponents/HeaderView";
import {
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import { goBack } from "../../navigations/RootNavigation";
import { UserPlaceholder } from "../../constants/Images";
import { user_data } from "../../redux/reducers/userReducer";
import { useSelector } from "react-redux";
import { RUPEE, SCREEN_WIDTH } from "../../constants/ConstantKey";
import {
  black,
  primary,
  primary_light,
  secondary,
  white,
} from "../../constants/Color";
import { GET_PROFILE } from "../../constants/ApiUrl";
import { useToast } from "native-base";
import ApiManager from "../../commonComponents/ApiManager";
import TextInputView from "../../commonComponents/TextInputView";
import Translate from "../../translation/Translate";
import CommonStyle from "../../commonComponents/CommonStyle";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import moment from "moment";
import NavigationIcon from "../../assets/images/NavigationIcon";
import {
  BOLD,
  FontSize,
  MEDIUM,
  REGULAR,
  SEMIBOLD,
} from "../../constants/Fonts";

export default function UserProfileDetails(props) {
  const refMarker = useRef();
  const toast = useToast();
  const userData = useSelector(user_data);
  const { userId } = props.route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [recent, setRecent] = useState();
  console.log("🚀 ~ UserProfileDetails ~ recent:", recent);
  const [CurrentLatitude, setCurrentLatitude] = useState(0.0);
  const [CurrentLongitude, setCurrentLongitude] = useState(0.0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    Api_Get_Profile(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(
        "use effect call for map pin navigate : ",
        CurrentLatitude,
        " longitude : ",
        CurrentLongitude
      );
      refMarker?.current?.animateToRegion(
        {
          latitude: CurrentLatitude,
          longitude: CurrentLongitude,
          latitudeDelta: 0.006594926458930672,
          longitudeDelta: 0.004564784467220306,
        },
        500
      );
    }, 1000);
  }, [CurrentLatitude, CurrentLongitude]);

  const Api_Get_Profile = (isLoad) => {
    setIsLoading(isLoad);
    ApiManager.get(GET_PROFILE + userId, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Api_Get_Profile : ", JSON.stringify(response));
        setIsLoading(false);

        if (response.data.status === true) {
          var profile_data = response.data.data;
          setProfileData(profile_data);
          setCurrentLatitude(Number(profile_data?.player?.latitude) || 0.0);
          setCurrentLongitude(Number(profile_data?.player?.longitude) || 0.0);
          setRecent(profile_data.recent_played_games);
        } else {
          toast.show({
            description: response.data.message,
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Api_Get_Profile Error ", err);
      });
  };
  return (
    <>
      <HeaderView
        title={`${profileData?.first_name}'s Profile`}
        isBack={true}
        HeaderSmall={true}
        onPress={() => {
          goBack();
        }}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View
          style={{ alignSelf: "center", marginTop: pixelSizeHorizontal(10) }}
        >
          {profileData?.profile ? (
            <Image
              source={{ uri: userData?.asset_url + profileData?.profile }}
              style={styles.image}
            />
          ) : (
            <Image
              source={UserPlaceholder}
              style={[styles.image, { resizeMode: "cover" }]}
            />
          )}
        </View>

        <Text
          style={[
            CommonStyle.inputTitle,
            { marginTop: pixelSizeHorizontal(18) },
          ]}
        >
          {Translate.t("mobile_number")}
        </Text>

        <TextInputView
          containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
          value={profileData?.mobile}
          keyboardType={"number-pad"}
          maxLength={10}
          editable={false}
        />

        <Text
          style={[
            CommonStyle.inputTitle,
            { marginTop: pixelSizeHorizontal(18) },
          ]}
        >
          User name
        </Text>
        <TextInputView
          containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
          value={profileData?.first_name}
          editable={false}
        />

        <Text
          style={[
            CommonStyle.inputTitle,
            { marginTop: pixelSizeHorizontal(18) },
          ]}
        >
          {Translate.t("location")}
        </Text>

        <View style={{ marginTop: pixelSizeHorizontal(10) }}>
          <MapView
            scrollEnabled={false}
            ref={refMarker}
            zoomEnabled={false}
            zoomControlEnabled={false}
            showsUserLocation={false}
            style={{ width: "100%", height: 180 }}
            provider={PROVIDER_GOOGLE}
            followsUserLocation={true}
            showsMyLocationButton={false}
            initialRegion={{
              latitude: CurrentLatitude,
              longitude: CurrentLongitude,
              latitudeDelta: 0.006594926458930672,
              longitudeDelta: 0.004564784467220306,
            }}
            //   onRegionChangeComplete={onRegionChange}
            // onRegionChange={onRegionChange}
          >
            <Marker
              //   key={index}
              tappable={false}
              coordinate={{
                latitude: CurrentLatitude,
                longitude: CurrentLongitude,
              }}
              title={"Your Selected Location"}
              description={profileData?.player.location}
            />
          </MapView>
        </View>

        <TextInputView
          containerStyle={{
            marginTop: pixelSizeHorizontal(10),
            textAlignVertical: "top",
          }}
          multiline={true}
          value={profileData?.player.location}
          editable={false}
        />

        <Text
          style={[
            CommonStyle.inputTitle,
            { marginTop: pixelSizeHorizontal(18) },
          ]}
        >
          {Translate.t("date_of_birth")}
        </Text>

        <TextInputView
          containerStyle={{ marginTop: pixelSizeHorizontal(10) }}
          value={moment(profileData?.dob).format("DD-MM-YYYY")}
          editable={false}
        />

        <Text
          style={[
            CommonStyle.inputTitle,
            { marginTop: pixelSizeHorizontal(18) },
          ]}
        >
          {Translate.t("gender")}
        </Text>

        <View
          style={{
            paddingVertical: pixelSizeHorizontal(8),
            paddingHorizontal: pixelSizeHorizontal(24),
            borderRadius: pixelSizeHorizontal(25),
            marginTop: pixelSizeHorizontal(18),
            backgroundColor: primary,
            alignSelf: "flex-start",
          }}
        >
          <Text
            style={[
              CommonStyle.textInputStyle,
              {
                color: white,
              },
            ]}
          >
            {profileData?.gender === 1
              ? "Male"
              : profileData?.gender === 2
              ? "Female"
              : profileData?.gender === 3
              ? "Other"
              : "Unknown"}
          </Text>
        </View>

        {recent && recent.length > 0 && (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  CommonStyle.inputTitle,
                  { marginTop: pixelSizeHorizontal(18) },
                ]}
              >
                Recently Played Games
              </Text>
            </View>

            <FlatList
              style={{ flex: 1, paddingHorizontal: pixelSizeHorizontal(5) }}
              data={showAll ? recent : recent.slice(0, 1)}
              scrollEnabled
              nestedScrollEnabled={true}
              ItemSeparatorComponent={() => (
                <View style={{ height: widthPixel(12) }} />
              )}
              renderItem={({ item }) => {
                var info =
                  item?.purpose == "JOINING"
                    ? item?.joining_information
                    : item?.venue_booked_information;
                return (
                  <View style={[styles.cardView, CommonStyle.shadow]}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          flex: 1,
                        }}
                      >
                        <View
                          style={{
                            height: widthPixel(30),
                            width: widthPixel(30),
                            borderRadius: widthPixel(15),
                            backgroundColor: primary_light,
                            padding: pixelSizeHorizontal(5),
                          }}
                        >
                          <Image
                            source={{
                              uri: userData?.asset_url + info.game_image,
                            }}
                            style={{ flex: 1, resizeMode: "contain" }}
                          />
                        </View>
                        <Text
                          style={[
                            styles.titleText,
                            { marginHorizontal: pixelSizeHorizontal(10) },
                          ]}
                        >
                          {info.game_title}
                        </Text>
                        <Text style={[styles.descriptionText]}>
                          {info.venue_ground_title}
                        </Text>
                      </View>

                      <Text style={[styles.titleText]}>
                        {RUPEE}
                        {item?.amount}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: pixelSizeHorizontal(10),
                      }}
                    >
                      <NavigationIcon
                        width={widthPixel(20)}
                        height={widthPixel(20)}
                      />
                      <Text
                        style={[
                          {
                            marginLeft: pixelSizeHorizontal(10),
                            flex: 1,
                            fontFamily: MEDIUM,
                            fontSize: FontSize.FS_12,
                            color: black,
                          },
                        ]}
                      >
                        {info.venue_location}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: pixelSizeHorizontal(10),
                        flex: 1,
                        borderWidth: 1,
                        borderColor: primary_light,
                        borderRadius: widthPixel(5),
                        paddingVertical: pixelSizeHorizontal(7),
                        paddingHorizontal: pixelSizeHorizontal(14),
                        flexWrap: "wrap",
                      }}
                    >
                      <Text
                        style={[
                          styles.descriptionText,
                          { fontSize: FontSize.FS_14 },
                        ]}
                      >
                        {moment(info.event_date).format("ddd, DD MMM, YYYY")} |{" "}
                        {info.display_event_start_time} to{" "}
                        {info.display_event_end_time}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: pixelSizeHorizontal(16),
                        flex: 1,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: primary_light,
                          borderRadius: widthPixel(5),
                          paddingVertical: pixelSizeHorizontal(8),
                          paddingHorizontal: pixelSizeHorizontal(5),
                        }}
                      >
                        <Text style={[styles.descriptionText]}>
                          <Text style={{ color: primary }}>Booking ID : </Text>
                          {item?.reference_number}
                        </Text>
                      </View>

                      <View style={{ flex: 1 }}>
                        <Text
                          style={[
                            {
                              fontSize: FontSize.FS_10,
                              fontFamily: REGULAR,
                              color: black,
                              textAlign: "right",
                            },
                          ]}
                        >
                          Booked on :{" "}
                          {moment(item?.created_at).format("DD MMM YYYY")}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />

            {recent.length > 1 && (
              <TouchableOpacity onPress={() => setShowAll(!showAll)}>
                <Text
                  style={{
                    fontFamily: SEMIBOLD,
                    fontSize: FontSize.FS_13,
                    color: secondary,
                    textAlign: "center",
                    marginVertical: pixelSizeHorizontal(18),
                  }}
                >
                  {showAll ? "Show less" : "Show All"}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </HeaderView>
      {isLoading && <LoadingView />}
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: widthPixel(SCREEN_WIDTH / 3),
    height: widthPixel(SCREEN_WIDTH / 3),
    borderRadius: widthPixel(SCREEN_WIDTH / 3),
    borderColor: white,
    borderWidth: 5,
  },
  cardView: {
    backgroundColor: white,
    borderRadius: widthPixel(20),
    padding: pixelSizeHorizontal(12),
    // marginVertical: pixelSizeHorizontal(18),
  },
  titleText: {
    fontFamily: BOLD,
    fontSize: FontSize.FS_16,
    color: black,
    // flex: 1,
  },
  descriptionText: {
    fontFamily: SEMIBOLD,
    fontSize: FontSize.FS_12,
    color: black,
    // flex: 1,
  },
});
