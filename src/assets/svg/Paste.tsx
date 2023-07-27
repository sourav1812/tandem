import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
    width={18}
    height={18}
    fill="none"
    {...props}>
    <Path
      stroke="#0D0C21"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16.4 17H6.6a.6.6 0 0 1-.6-.6V6.6a.6.6 0 0 1 .6-.6h9.8a.6.6 0 0 1 .6.6v9.8a.6.6 0 0 1-.6.6Z"
    />
    <Path
      stroke="#0D0C21"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6V1.6a.6.6 0 0 0-.6-.6H1.6a.6.6 0 0 0-.6.6v9.8a.6.6 0 0 0 .6.6H6"
    />
  </Svg>
);
export default SvgComponent;
