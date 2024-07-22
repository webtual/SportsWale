import { View, Text, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import HeaderView from '../../commonComponents/HeaderView'
import { goBack, navigate } from '../../navigations/RootNavigation'
import { pixelSizeHorizontal, widthPixel } from '../../commonComponents/ResponsiveScreen'
import { useToast } from 'native-base'
import { FontSize, MEDIUM, REGULAR } from '../../constants/Fonts'
import { black, border, primary, secondary } from '../../constants/Color'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonStyle from '../../commonComponents/CommonStyle'
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps';


const LocationMap = (props) => {

    const toast = useToast()

  const {onSelectLocation, lat, long} = props.route.params;

  const refMarker = useRef();
  const [CurrentLatitude, setCurrentLatitude] = useState(lat);
  const [CurrentLongitude, setCurrentLongitude] = useState(long);
  const [searchText, setsearchText] = useState('');


  const onRegionChange = region => {
    console.log('region ', region);
    setCurrentLatitude(region.latitude);
    setCurrentLongitude(region.longitude);
  };

  return (
    <>
      <HeaderView
        title={"Select your location"}
        isBack={true}
        onPress={() => goBack()}
        scrollContainerStyle={{ flexGrow: 1}}
        containerStyle={{flex:1}}
        HeaderSmall={true}
      >

<View style={{  flex:1}}>
        <View style={{marginHorizontal: pixelSizeHorizontal(20), marginVertical: pixelSizeHorizontal(10)}}>
          <TouchableOpacity
            style={[
              {
                borderWidth: 1,
                borderColor : border,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: pixelSizeHorizontal(15),
                paddingVertical: pixelSizeHorizontal(10),
                borderRadius: widthPixel(10),
                marginBottom: pixelSizeHorizontal(10),
              },
            ]}
            onPress={() => {
              // Keyboard.dismiss();
              navigate('LocationGoggle', {
                title : "Search place",
                onSelectPlace: (location) => {
                  var geoLocation = location?.geometry?.location;

                  setsearchText(location?.formatted_address);
                  setCurrentLatitude(geoLocation.lat);
                  setCurrentLongitude(geoLocation.lng);

                  refMarker.current.animateToRegion(
                    {
                      latitude: Number(geoLocation.lat),
                      longitude: Number(geoLocation.lng),
                      latitudeDelta: 0.006594926458930672,
                      longitudeDelta: 0.004564784467220306,
                    },
                    500,
                  );
                },
              });
            }}>
            <Text
              // placeholder="Search..."
              style={{
                flex: 1,
                fontFamily: MEDIUM,
                fontSize: FontSize.FS_13,
                color: black
              }}
              // onChangeText={onChangeText}
            >
              {searchText ? searchText : 'Search...'}
            </Text>
            <Icon name="magnify" color={secondary} size={25} />
          </TouchableOpacity>
        </View>

        <View style={{flex:1}}>
        <MapView
          ref={refMarker}
          zoomEnabled={true}
          zoomControlEnabled={true}
          scrollDuringRotateOrZoomEnabled={false}
          showsUserLocation={true}
          style={{flex: 1}}
          provider={PROVIDER_GOOGLE}
          followsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={{
            latitude: CurrentLatitude,
            longitude: CurrentLongitude,
            latitudeDelta: 0.006594926458930672,
            longitudeDelta: 0.004564784467220306,
          }}
          //   onRegionChangeComplete={onRegionChange}
          onRegionChange={onRegionChange}>
          <Marker
            //   key={index}
            tappable={false}
            coordinate={{
              latitude: CurrentLatitude,
              longitude: CurrentLongitude,
            }}
            title={'Your Selected Location'}
            description={'This selected address is added in form'}
          />
        </MapView>
        </View>
        
      </View>
      <View
          style={{
           marginHorizontal : pixelSizeHorizontal(20),
           marginBottom : pixelSizeHorizontal(20),
        marginTop : pixelSizeHorizontal(5)
          }}>

          <TouchableOpacity style={CommonStyle.mainBtnStyle}
          onPress={() => {
            onSelectLocation({
              coordinate: {
                selectedLatitude: CurrentLatitude,
                selectedLongitude: CurrentLongitude,
              },
            });
            goBack();
            // navigate('DevelopmentSellPlotForm', {
            //   coordinate: {
            //     selectedLatitude: CurrentLatitude,
            //     selectedLongitude: CurrentLongitude,
            //   },
            // });
          }}>
            <Text style={CommonStyle.mainBtnText}>
                Select location
            </Text>
          </TouchableOpacity>

        </View>
        </HeaderView>

        </>
  )
}

export default LocationMap