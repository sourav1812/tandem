import * as React from 'react';
import Svg, {SvgProps, Rect, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <Rect width={24} height={24} fill="#4285F6" rx={4} />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m18 9-7.636 7L6 12"
    />
  </Svg>
);
export default SvgComponent;
