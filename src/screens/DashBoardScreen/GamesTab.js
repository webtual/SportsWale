import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { navigate } from "../../navigations/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import { Input, useToast } from "native-base";
import { storeCurrentLocation } from "../../redux/reducers/userReducer";
import MapPinIcon from "../../assets/images/MapPinIcon";
import CommonStyle from "../../commonComponents/CommonStyle";
import { black, offWhite, primary, white } from "../../constants/Color";
import {
  pixelSizeHorizontal,
  widthPixel,
} from "../../commonComponents/ResponsiveScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconButton from "../../commonComponents/IconButton";
import ChatIcon from "../../assets/images/ChatIcon";
import BellIcon from "../../assets/images/BellIcon";
import Geocoder from "react-native-geocoding";
import { FontSize, MEDIUM } from "../../constants/Fonts";
import TopTabs from "./TopTabs";
import LoadingView from "../../commonComponents/LoadingView";


const GamesTab = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  //  const userData = (state) => state.userRedux.user_data
  const userData = useSelector((state) => state.userRedux.user_data);

  const userReduxData = useSelector((state) => state.userRedux);

  const [txtCity, setTxtCity] = useState("");

  const [CurrentLatitude, setCurrentLatitude] = useState(
    userReduxData.lat || 0.0
  );
  const [CurrentLongitude, setCurrentLongitude] = useState(
    userReduxData.long || 0.0
  );

  useEffect(() => {
    getaddressFromLatLong(CurrentLatitude, CurrentLongitude);

    return () => {
      
    }
  }, []);


  const getaddressFromLatLong = async (lat, long) => {
    Geocoder.from(lat, long)
      .then((json) => {
        var addressComponent = json.results?.[0];
        console.log("address comp : ", JSON.stringify(addressComponent));
        if (addressComponent) {
          var filtered_data = addressComponent?.address_components?.filter(
            (address) =>
              address?.types.includes("locality") ||
              address?.types.includes("administrative_area_level_3")
          );
          console.log("filtered address data : ", filtered_data);
          setTxtCity(filtered_data?.[0]?.long_name);
        }
      })
      .catch((error) => console.warn("Geocoder error", error));
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        StackScreen={true}
        title=""
        isBack={false}
       // isScroll={false}
        titleColor={white}
        containerStyle={{flex : 1}}
        leftComponent={
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() =>
              navigate("LocationGoggle", {
                title: "Search City",
                googlePlaceProps: {
                  filterReverseGeocodingByTypes: [
                    "locality",
                    "administrative_area_level_3",
                  ],
                },
                onSelectPlace: (place_detail) => {
                  console.log("place_detail : ", place_detail);
                  setTxtCity(place_detail?.name);

                  dispatch(
                    storeCurrentLocation({
                      lat: place_detail?.geometry?.location?.lat,
                      long: place_detail?.geometry?.location?.lng,
                    })
                  );
                  setCurrentLatitude(place_detail?.geometry?.location?.lat);
                  setCurrentLongitude(place_detail?.geometry?.location?.lng);
                },
              })
            }
          >
            <MapPinIcon />
            <Text
              style={[
                CommonStyle.regularText,
                { color: white, marginLeft: pixelSizeHorizontal(5) },
              ]}
            >
              {txtCity}
            </Text>
            <Icon name={"chevron-down"} size={24} color={white} />
          </TouchableOpacity>
        }
        rightComponent={
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <IconButton
              additionalStyle={{ marginRight: pixelSizeHorizontal(18) }}
              onPress={() => {}}
            >
              <ChatIcon />
            </IconButton> */}
            <IconButton onPress={() => {}}>
              <BellIcon />
            </IconButton>
            {userData && (
              <IconButton
                additionalStyle={{ marginLeft: pixelSizeHorizontal(18) }}
                onPress={() => navigate("Profile")}
              >
                <Image
                  source={{ uri: userData?.asset_url + userData?.profile }}
                  style={{
                    width: widthPixel(40),
                    height: widthPixel(40),
                    borderRadius: widthPixel(20),
                    borderWidth: 1,
                    borderColor: white,
                  }}
                />
              </IconButton>
            )}
          </View>
        }
      >
        <View
          style={{  
              flex:1,
              marginBottom: pixelSizeHorizontal(80),
            // marginHorizontal: pixelSizeHorizontal(20),
          }}
        >
          <TopTabs setIsLoading={setIsLoading}/>
        </View>
      </HeaderView>
      {isLoading && <LoadingView />}
    </>
  );
};

export default GamesTab;
