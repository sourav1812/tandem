import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 109 109"
    width={109}
    height={109}
    fill="none"
    {...props}>
    <Circle cx={54.5} cy={54.5} r={54.5} fill="#FEC247" fillOpacity={0.05} />
    <Circle cx={55} cy={55} r={48} fill="#FEC247" fillOpacity={0.15} />
    <Circle cx={55} cy={55} r={40} fill="#FEC247" />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={2}
      d="M55 47v16m4-13v10m-8-10v10m12-6v2m-16-2v2"
    />
  </Svg>
);
export default SvgComponent;
