import { View, Text, ScrollView, Platform, PermissionsAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack } from "../../navigations/RootNavigation";
import { pixelSizeHorizontal } from "../../commonComponents/ResponsiveScreen";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../../constants/ConstantKey";
import Geolocation from "@react-native-community/geolocation";


navigator.geolocation = require("@react-native-community/geolocation");

const LocationGoggle = (props) => {
  const { googlePlaceProps, title, onSelectPlace } = props?.route?.params ?? {};

  const [CurrentLatitude, setCurrentLatitude] = useState(0.0);
  const [CurrentLongitude, setCurrentLongitude] = useState(0.0);

  useEffect(() =>{
    requestLocationPermission()
  },[])

  const requestLocationPermission = async () => {
    if (Platform.OS === "ios") {
      getOneTimeLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Access Required",
            message: "This App needs to Access your location",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
          console.log("====================================");
          console.log("Permission Granted");
          console.log("====================================");
        } else {
          console.log("====================================");
          console.log("Permission Denied");
          console.log("====================================");
        }
      } catch (err) {
        // Api_GetContacts(true);
        console.warn(err);
      }
    }
  };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        // console.log('====================================');
        // console.log('Current Location is : ' + JSON.stringify(position));
        // console.log('====================================');

        setCurrentLatitude(position.coords.latitude);
        setCurrentLongitude(position.coords.longitude);

      },
      (error) => {
        console.log("Geolocation error : ", error.message);
      },
      {
        // enableHighAccuracy: false,
        timeout: 200000,
        // maximumAge: 3600000,
      }
    );
  };

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={title ? title : "Search"}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ marginVertical: pixelSizeHorizontal(10) }}>
          <GooglePlacesAutocomplete
            styles={{ flex: 1 }}
            keyboardShouldPersistTaps="always"
            autoFocus={true}
            placeholder={title ? title : "Search"}
            keepResultsAfterBlur
            fetchDetails={true}
            listViewDisplayed={true}
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
            }}
            predefinedPlaces={[{
              description: 'Current Location',
              geometry: { location: { lat: CurrentLatitude, lng: CurrentLongitude } },
            }]}
            textInputProps={{ onBlur: () => {} }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data);
              console.log(details)
              onSelectPlace?.(details);
              goBack();
            }}
            {...googlePlaceProps}
          />
        </View>
      </HeaderView>
    </>
  );
};

export default LocationGoggle;
