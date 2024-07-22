import * as React from "react"
import Svg, { Path } from "react-native-svg"
const MenuIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={16}
    viewBox="0 0 18 16"
    fill="none"
    {...props}
  >
    <Path  fill={props?.color ? props?.color : "#3D6FE3"} d="M0 0h18v2H0V0Zm6 7h12v2H6V7Zm-6 7h18v2H0v-2Z" />
  </Svg>
)
export default MenuIcon
