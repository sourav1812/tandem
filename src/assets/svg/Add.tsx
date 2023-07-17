import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = ({color, size}: {color?: string; size?: number}) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    width={size || 25}
    height={size || 25}
    fill="none">
    <Path
      fill={color || '#4285F6'}
      d="M20.926 7.176a1.25 1.25 0 0 0-2.5 0v11.25H7.176a1.25 1.25 0 0 0 0 2.5h11.25v11.25a1.25 1.25 0 0 0 2.5 0v-11.25h11.25a1.25 1.25 0 0 0 0-2.5h-11.25V7.176Z"
    />
  </Svg>
);
export default SvgComponent;
