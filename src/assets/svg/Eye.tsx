import * as React from 'react';
import Svg, {SvgProps, Path, Mask, G} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 17"
    width={20}
    height={17}
    fill="none"
    {...props}>
    <Path
      fill="#020408"
      fillRule="evenodd"
      d="M10 5.641a2.414 2.414 0 0 0-2.411 2.412 2.413 2.413 0 0 0 2.41 2.41 2.414 2.414 0 0 0 2.413-2.41A2.415 2.415 0 0 0 10 5.641Zm0 6.322a3.915 3.915 0 0 1-3.911-3.91 3.916 3.916 0 0 1 3.91-3.912 3.917 3.917 0 0 1 3.913 3.912A3.915 3.915 0 0 1 10 11.963Z"
      clipRule="evenodd"
    />
    <Mask
      id="a"
      width={20}
      height={17}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'luminance',
      }}>
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M0 0h20v16.105H0V0Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="#020408"
        fillRule="evenodd"
        d="M1.57 8.053c1.86 4.108 4.993 6.551 8.43 6.552 3.437 0 6.57-2.444 8.43-6.553-1.86-4.107-4.993-6.55-8.43-6.551-3.436 0-6.57 2.444-8.43 6.552Zm8.432 8.052h-.005C5.86 16.102 2.147 13.203.06 8.348a.751.751 0 0 1 0-.592C2.147 2.902 5.86.005 9.997.002h.006c4.136.003 7.85 2.901 9.936 7.755a.742.742 0 0 1 0 .592c-2.085 4.855-5.8 7.754-9.936 7.757h-.001Z"
        clipRule="evenodd"
      />
    </G>
  </Svg>
);
export default SvgComponent;
