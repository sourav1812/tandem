import * as React from 'react';
import {verticalScale} from 'react-native-size-matters';
import Svg, {SvgProps, Rect, Circle} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    width={verticalScale(40)}
    height={verticalScale(40)}
    fill="none"
    {...props}>
    <Rect width={40} height={40} fill="#F1F4F9" rx={12} />
    <Circle cx={24} cy={20} r={12} fill="#4285F6" />
    <Circle cx={12} cy={20} r={8} fill="#FEC247" />
  </Svg>
);
export default SvgComponent;
