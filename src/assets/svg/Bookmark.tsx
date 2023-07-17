import * as React from 'react';
import {verticalScale} from 'react-native-size-matters';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 22"
    width={verticalScale(18)}
    height={verticalScale(22)}
    fill="none"
    {...props}>
    <Path
      stroke="#020408"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.6}
      strokeWidth={1.5}
      d="M17.239 5.154c0-2.751-1.88-3.854-4.589-3.854H6.291C3.667 1.3 1.7 2.328 1.7 4.97v14.724a.95.95 0 0 0 1.413.828l6.382-3.58 6.327 3.574a.95.95 0 0 0 1.417-.827V5.154Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#020408"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.6}
      strokeWidth={1.5}
      d="M5.771 8.028h7.318"
    />
  </Svg>
);
export default SvgComponent;
