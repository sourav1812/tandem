import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Path
      fill="#FF0101"
      fillRule="evenodd"
      d="M12 1.25A5.75 5.75 0 0 0 6.25 7v5a5.75 5.75 0 0 0 11.5 0V7A5.75 5.75 0 0 0 12 1.25Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#FF0101"
      strokeLinecap="round"
      strokeWidth={2}
      d="M12 20c-6 0-8-3-8-9m8 9v3m0-3c6 0 8-3 8-9"
    />
  </Svg>
);
export default SvgComponent;
