import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    //   xmlns="http://www.w3.org/2000/svg"

    viewBox="0 0 72 72"
    {...props}>
    <Circle cx={36} cy={36} r={24} fill="#FCEA2B" />
    <Path
      fill="#D22F27"
      d="M53.013 44.47a3.62 3.62 0 0 0-4.532 4.378l.111.353 3.797 9.721 8.557-6.086a3.585 3.585 0 0 0 1.275-1.844 3.62 3.62 0 0 0-2.43-4.498 3.59 3.59 0 0 0-3.704 1.031.314.314 0 0 1-.542-.161 3.59 3.59 0 0 0-2.532-2.894z"
    />
    <Path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M20.59 30.005a6.306 6.306 0 0 1 2.67-3.656 6.303 6.303 0 0 1 4.336-1.38M51.06 31.069a7.19 7.19 0 0 0-8.54-1.175M47.044 35.86c-.807-.471-1.775-.909-2.88-.926-1.12-.018-2.125.31-3.192.778"
    />
    <Path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M58.372 41.361c.41-1.72.628-3.515.628-5.361 0-12.703-10.298-23-23-23-12.703 0-23 10.297-23 23 0 12.702 10.297 23 23 23 3.62 0 7.046-.837 10.093-2.327"
    />
    <Circle cx={28.04} cy={35.306} r={3} />
    <Path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M36.414 41.091s10.525 3.196 0 5.564c0 0 10.458 2.988 0 4.912M53.013 44.47a3.62 3.62 0 0 0-4.532 4.378l.111.353 3.797 9.721 8.557-6.086a3.585 3.585 0 0 0 1.275-1.844 3.62 3.62 0 0 0-2.43-4.498 3.59 3.59 0 0 0-3.704 1.031.314.314 0 0 1-.542-.161 3.59 3.59 0 0 0-2.532-2.894z"
    />
  </Svg>
);
export default SvgComponent;
