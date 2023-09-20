import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    //   xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 72 72"
    {...props}>
    <Path
      fill="#92D3F5"
      d="M54 60.9V57c0-5-4.2-9-9.2-9-6 5-12 5-18 0-5 0-8.8 4-8.8 9v3.9h36z"
    />
    <Path
      fill="#a57939"
      d="M24 36c-2 0-3-12 0-16 6-8 18-8 24 0 3 4 2 16 0 16"
    />
    <Path
      fill="#fadcbc"
      d="M25 34c0 8 4.8 11.9 10.8 11.9S47 42 47 34s-3-10-3-10c-8 4-14 2-16 0 0 0-3 2-3 10z"
    />
    <Path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M24 36c-2 0-3-12 0-16 6-8 18-8 24 0 3 4 2 16 0 16M54 60v-3.1c0-5-4.2-9-9.2-9-6 5-12 5-18 0-5 0-8.8 4-8.8 9V60"
    />
    <Path d="M42 33c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2M34 33c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2" />
    <Path
      fill="none"
      stroke="#000"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M25 34c0 8 4.8 11.9 10.8 11.9S47 42 47 34s-3-10-3-10c-8 4-14 2-16 0 0 0-3 2-3 10z"
    />
    <Path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M32.8 39.2c1.9 1 4.1 1 6 0"
    />
  </Svg>
);
export default SvgComponent;
