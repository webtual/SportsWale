import { View, Text } from 'react-native'
import React from 'react'
import HeaderView from '../../commonComponents/HeaderView'
import { goBack } from '../../navigations/RootNavigation'
import { pixelSizeHorizontal } from '../../commonComponents/ResponsiveScreen'
import CommonStyle from '../../commonComponents/CommonStyle'
import { Colors } from '../../constants/CustomeColor'

const Policy = (props) => {

  const { data } = props?.route?.params;


  return (
    <>
      <HeaderView
        HeaderSmall={true}
        title={data?.title}
        isBack={true}
        onPress={() => goBack()}
        containerStyle={{ paddingHorizontal: pixelSizeHorizontal(20) }}
      >
        <View style={{ flex: 1, marginTop : pixelSizeHorizontal(20) }}>
            <Text style={[CommonStyle.smallText,{color : Colors.dimGrey}]}>
                {data?.content}
            </Text>
        </View>
        </HeaderView>
        </>
  )
}

export default Policy