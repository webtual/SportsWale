import { View, Text } from "react-native";
import React from "react";
import HeaderView from "../../commonComponents/HeaderView";
import { goBack } from "../../navigations/RootNavigation";
import { pixelSizeHorizontal } from "../../commonComponents/ResponsiveScreen";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../../constants/ConstantKey";

const LocationGoggle = (props) => {
  const { googlePlaceProps, title, onSelectPlace } = props?.route?.params ?? {};

  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={title? title : "Search"}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ marginVertical: pixelSizeHorizontal(10) }}>
          <GooglePlacesAutocomplete
           styles={{flex: 1}}
           keyboardShouldPersistTaps='always'
           autoFocus={true}
            placeholder={title? title : "Search"}
            keepResultsAfterBlur
            fetchDetails={true}
            listViewDisplayed={true}
            query={{
              key: GOOGLE_API_KEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
                 onSelectPlace?.(details)
                 goBack()
              }}
            {...googlePlaceProps}
          />
        </View>
      </HeaderView>
    </>
  );
};

export default LocationGoggle;
