import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 11"
    width={32}
    height={11}
    fill="none"
    {...props}>
    <Path
      fill="#86D39F"
      d="M12.01 7.898c2.617-.405 5.21-.44 7.733-.143l.84-6.258a34.13 34.13 0 0 0-9.587.158l1.014 6.243Z"
    />
    <Path
      fill="#FF0101"
      d="M21.005 7.583a29.834 29.834 0 0 1 7.534 2.155l2.665-5.507a35.632 35.632 0 0 0-9.317-2.72l-.882 6.072Z"
    />
    <Path
      fill="#FEC247"
      d="M3.006 10.685a28.812 28.812 0 0 1 7.354-2.504L9.347 1.944A34.406 34.406 0 0 0 .24 5.063l2.765 5.622Z"
    />
  </Svg>
);
export default SvgComponent;
