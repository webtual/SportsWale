import { View, Text } from 'react-native'
import React from 'react'
import HeaderView from '../../commonComponents/HeaderView'
import { white } from '../../constants/Color'
import { goBack } from '../../navigations/RootNavigation'
import { pixelSizeHorizontal } from '../../commonComponents/ResponsiveScreen'

const BokingConfirmation = () => {
  return (
    <>
    <HeaderView
    HeaderSmall={true}
    StackScreen={true}
    title="Create Game"
    isBack={true}
    titleColor={white}
    onPress={() => goBack()}
  >
    <View
      style={{
        flex: 1,
        marginHorizontal: pixelSizeHorizontal(20),
      }}
    >
        </View>
        </HeaderView>
        </>
  )
}

export default BokingConfirmation