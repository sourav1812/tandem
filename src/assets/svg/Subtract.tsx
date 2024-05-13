import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = ({size}: {size?: number}) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17 3"
    width={size || 17}
    height={size || 3}
    fill="none">
    <Path fill="#4285F6" d="M1.5.5a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2h-14Z" />
  </Svg>
);
export default SvgComponent;
