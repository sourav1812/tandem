import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 6"
    width={20}
    height={6}
    fill="none"
    {...props}>
    <Path
      fill="#4285F6"
      d="M4.75 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM12.25 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM17.5 5.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
    />
  </Svg>
);
export default SvgComponent;
