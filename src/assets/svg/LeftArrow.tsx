import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 9 14"
    width={9}
    height={14}
    fill="none"
    {...props}>
    <Path
      fill="#4285F6"
      fillRule="evenodd"
      d="M7.957 13.207a1 1 0 0 1-1.414 0l-5.5-5.5a1 1 0 0 1 0-1.414l5.5-5.5a1 1 0 0 1 1.414 1.414L3.164 7l4.793 4.793a1 1 0 0 1 0 1.414Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
