import * as React from 'react';
import {verticalScale} from 'react-native-size-matters';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 14 8"
    width={verticalScale(12)}
    height={verticalScale(7)}
    fill="none"
    {...props}>
    <Path
      stroke="#020408"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m1 1 6 6 6-6"
    />
  </Svg>
);
export default SvgComponent;
