import { StyleSheet } from "react-native"
import { black, white } from "../constants/Color"
import { FontSize, SEMIBOLD } from "../constants/Fonts"
import { pixelSizeHorizontal, widthPixel } from "./ResponsiveScreen"



 export default StyleSheet.create({

    mainBtnStyle: {
        backgroundColor: black,
        padding: pixelSizeHorizontal(10),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginTop: pixelSizeHorizontal(40),
        marginHorizontal:pixelSizeHorizontal(20)
    },
    mainBtnText: {
        fontFamily: SEMIBOLD,
        color: white,
        fontSize: FontSize.FS_22,
        textTransform: 'capitalize',
    },
})
