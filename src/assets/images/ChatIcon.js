import * as React from "react"
import Svg, { SvgProps, Path, Circle } from "react-native-svg"
const ChatIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M9.795 2h4.41a8.82 8.82 0 1 1 0 17.641V23.5C8.692 21.295.975 17.987.975 10.82A8.82 8.82 0 0 1 9.794 2ZM12 17.436h2.205a6.615 6.615 0 1 0 0-13.23h-4.41a6.615 6.615 0 0 0-6.616 6.614c0 3.98 2.715 6.578 8.821 9.35v-2.734Z"
    />
    <Circle cx={7.59} cy={10.82} r={1.103} fill="#fff" />
    <Circle cx={11.999} cy={10.82} r={1.103} fill="#fff" />
    <Circle cx={16.41} cy={10.82} r={1.103} fill="#fff" />
  </Svg>
)
export default ChatIcon
