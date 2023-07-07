import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 109 109"
    width={109}
    height={109}
    fill="none"
    {...props}>
    <Circle cx={55} cy={55} r={40} fill="#FEC247" />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M55 44.25A5.75 5.75 0 0 0 49.25 50v5a5.75 5.75 0 0 0 11.5 0v-5A5.75 5.75 0 0 0 55 44.25Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={2}
      d="M55 63c-6 0-8-3-8-9m8 9v3m0-3c6 0 8-3 8-9"
    />
  </Svg>
);
export default SvgComponent;
