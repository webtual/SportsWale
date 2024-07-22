import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Clock = (props) => (
  <Svg width={20} height={20} viewBox={"0 0 20 20"} fill="none" {...props}>
    <Path
      fill="#3D6FE3"
      d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.956 9.956 0 0 1-4.708-1.175L0 20l1.176-5.29A9.956 9.956 0 0 1 0 10C0 4.477 4.477 0 10 0Zm0 2a8 8 0 0 0-8 8c0 1.335.326 2.618.94 3.766l.35.654-.656 2.946 2.948-.654.653.349A7.955 7.955 0 0 0 10 18a8 8 0 1 0 0-16Zm1 3v5h4v2H9V5h2Z"
    />
  </Svg>
);
export default Clock;
