import * as React from "react"
import Svg, { Path } from "react-native-svg"
const BellIcon = (props) => (
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
      d="M15 8A6 6 0 0 0 3 8v8h12V8Zm2 8.667.4.533a.5.5 0 0 1-.4.8H1a.5.5 0 0 1-.4-.8l.4-.533V8a8 8 0 1 1 16 0v8.667ZM6.5 19h5a2.5 2.5 0 0 1-5 0Z"
    />
  </Svg>
)
export default BellIcon
