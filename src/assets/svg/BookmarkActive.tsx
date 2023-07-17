import * as React from 'react';
import {verticalScale} from 'react-native-size-matters';
import Svg, {Path} from 'react-native-svg';
const SvgComponent = ({focused}: {focused: boolean}) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={verticalScale(20)}
    height={verticalScale(24)}
    viewBox="0 0 18 22"
    fill="none">
    <Path
      fill={focused ? '#4285F6' : '#FFFFFF'}
      fillRule="evenodd"
      stroke={focused ? '#4285F6' : '#474747'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.739 5.154c0-2.751-1.88-3.854-4.589-3.854H5.791C3.167 1.3 1.2 2.328 1.2 4.97v14.724a.95.95 0 0 0 1.413.828l6.382-3.58 6.327 3.574a.95.95 0 0 0 1.417-.827V5.154Z"
      clipRule="evenodd"
    />
    <Path
      fill={focused ? '#4285F6' : '#FFFFFF'}
      fillRule="evenodd"
      d="M5.271 8.028h7.318-7.318Z"
      clipRule="evenodd"
    />
    <Path
      stroke={focused ? '#fff' : '#474747'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5.271 8.028h7.318"
    />
  </Svg>
);
export default SvgComponent;
