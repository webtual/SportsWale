import * as React from "react"
import Svg, { Path } from "react-native-svg"
const CancelBookingIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="M29.82 7.773h-3.293V3.827H21.92v3.946H10.08V3.827H5.473v3.946H2.18v20.4h27.64v-20.4ZM23.24 5.14h1.973v2.633H23.24V5.14Zm-16.453 0H8.76v2.633H6.787V5.14ZM28.5 26.86h-25V9.093h25.007V26.86H28.5Z"
    />
    <Path
      fill="#000"
      d="M20.187 12.854 16 17.047l-4.187-4.194-.933.934 4.187 4.187-4.187 4.186.933.933L16 18.907l4.187 4.186.933-.933-4.187-4.186 4.187-4.187-.933-.934Z"
    />
  </Svg>
)
export default CancelBookingIcon
