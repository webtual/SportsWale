import * as React from "react"
import Svg, { Path } from "react-native-svg"
const MapPinIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={22}
    viewBox="0 0 18 22"
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="m9 21.728-6.364-6.364a9 9 0 1 1 12.728 0L9 21.728Zm4.95-7.778a7 7 0 1 0-9.9 0L9 18.9l4.95-4.95ZM9 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
    />
  </Svg>
)
export default MapPinIcon

