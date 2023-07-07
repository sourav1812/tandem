import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <Path
      stroke="#4285F6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.832 6.175 8.11 11.959l-6.51-4.071c-.932-.584-.738-2 .317-2.31L17.37 1.054c.966-.283 1.862.62 1.575 1.589l-4.573 15.445c-.313 1.056-1.722 1.245-2.3.308L8.106 11.96"
    />
  </Svg>
);
export default SvgComponent;
