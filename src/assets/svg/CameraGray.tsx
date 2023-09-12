import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 18"
    width={40}
    height={38}
    fill="none"
    {...props}>
    <Path
      stroke="rgba(255,255,255, 0.8)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.04 1.051c1.01.402 1.32 1.802 1.732 2.252.413.45 1.004.603 1.331.603a3.147 3.147 0 0 1 3.147 3.146v5.795a4.22 4.22 0 0 1-4.22 4.22H4.97a4.22 4.22 0 0 1-4.22-4.22V7.052a3.147 3.147 0 0 1 3.147-3.146c.326 0 .917-.153 1.331-.603.413-.45.721-1.85 1.731-2.252C7.97.65 12.03.65 13.04 1.051Z"
      clipRule="evenodd"
    />
    <Path
      stroke="rgba(255,255,255, 0.8)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M15.495 6.5h.01"
    />
    <Path
      stroke="rgba(255,255,255, 0.8)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.179 10.128a3.179 3.179 0 1 0-6.357 0 3.179 3.179 0 0 0 6.357 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
