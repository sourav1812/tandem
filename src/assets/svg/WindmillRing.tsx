import * as React from 'react';
import Svg, {G, Path, Circle, Mask, Ellipse} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent() {
  return (
    <Svg
      pointerEvents="none"
      style={{position: 'absolute', zIndex: 10}}
      width={959}
      height={766}
      viewBox="0 0 959 766"
      fill="none">
      <G clipPath="url(#clip0_3028_8068)">
        <Mask
          id="a"
          style={{
            maskType: 'alpha',
          }}
          maskUnits="userSpaceOnUse"
          x={450}
          y={292}
          width={57}
          height={57}>
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M478.824 348.736c15.42 0 27.921-12.5 27.921-27.921 0-15.42-12.501-27.92-27.921-27.92-15.421 0-27.921 12.5-27.921 27.92 0 15.421 12.5 27.921 27.921 27.921zm0-12.139c8.716 0 15.781-7.066 15.781-15.782 0-8.715-7.065-15.781-15.781-15.781-8.716 0-15.782 7.066-15.782 15.781 0 8.716 7.066 15.782 15.782 15.782z"
            fill="#F1EDE4"
          />
        </Mask>
        <G mask="url(#a)">
          <Ellipse
            cx={477.61}
            cy={322.029}
            rx={31.5628}
            ry={29.1349}
            fill="#59B6B8"
          />
          <Circle cx={484.894} cy={295.322} r={26.707} fill="#D9D9D9" />
          <Ellipse
            cx={482.466}
            cy={297.75}
            rx={12.1395}
            ry={12.1395}
            fill="#F1EDE4"
          />
          <Ellipse
            cx={475.182}
            cy={339.025}
            rx={19.4233}
            ry={19.4233}
            fill="#3A6391"
          />
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
