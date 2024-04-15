import * as React from 'react';
import Svg, {Mask, Path, G, SvgProps} from 'react-native-svg';

function SvgComponent(
  props: React.JSX.IntrinsicAttributes &
    React.JSX.IntrinsicClassAttributes<Svg> &
    Pick<
      Readonly<SvgProps>,
      | 'children'
      | 'id'
      | 'x'
      | 'y'
      | 'width'
      | 'height'
      | 'fill'
      | 'fillOpacity'
      | 'fillRule'
      | 'stroke'
      | 'strokeWidth'
      | 'strokeOpacity'
      | 'strokeDasharray'
      | 'strokeDashoffset'
      | 'strokeLinecap'
      | 'strokeLinejoin'
      | 'strokeMiterlimit'
      | 'vectorEffect'
      | 'clipRule'
      | 'clipPath'
      | 'translate'
      | 'translateX'
      | 'translateY'
      | 'origin'
      | 'originX'
      | 'originY'
      | 'scale'
      | 'scaleX'
      | 'scaleY'
      | 'skew'
      | 'skewX'
      | 'skewY'
      | 'rotation'
      | 'transform'
      | 'pointerEvents'
      | 'onStartShouldSetResponder'
      | 'onMoveShouldSetResponder'
      | 'onResponderEnd'
      | 'onResponderGrant'
      | 'onResponderReject'
      | 'onResponderMove'
      | 'onResponderRelease'
      | 'onResponderStart'
      | 'onResponderTerminationRequest'
      | 'onResponderTerminate'
      | 'onStartShouldSetResponderCapture'
      | 'onMoveShouldSetResponderCapture'
      | 'disabled'
      | 'onPress'
      | 'onPressIn'
      | 'onPressOut'
      | 'onLongPress'
      | 'delayPressIn'
      | 'delayPressOut'
      | 'delayLongPress'
      | 'marker'
      | 'markerStart'
      | 'markerMid'
      | 'markerEnd'
      | 'mask'
      | 'onLayout'
      | 'accessibilityLabel'
      | 'accessible'
      | 'testID'
      | 'style'
      | 'opacity'
      | 'viewBox'
      | 'color'
      | 'title'
      | 'font'
      | 'fontStyle'
      | 'fontVariant'
      | 'fontWeight'
      | 'fontStretch'
      | 'fontSize'
      | 'fontFamily'
      | 'textAnchor'
      | 'textDecoration'
      | 'letterSpacing'
      | 'wordSpacing'
      | 'kerning'
      | 'fontFeatureSettings'
      | 'fontVariantLigatures'
      | 'fontVariationSettings'
      | 'hitSlop'
      | 'removeClippedSubviews'
      | 'nativeID'
      | 'collapsable'
      | 'needsOffscreenAlphaCompositing'
      | 'renderToHardwareTextureAndroid'
      | 'focusable'
      | 'shouldRasterizeIOS'
      | 'isTVSelectable'
      | 'hasTVPreferredFocus'
      | 'tvParallaxProperties'
      | 'tvParallaxShiftDistanceX'
      | 'tvParallaxShiftDistanceY'
      | 'tvParallaxTiltAngle'
      | 'tvParallaxMagnification'
      | 'onTouchStart'
      | 'onTouchMove'
      | 'onTouchEnd'
      | 'onTouchCancel'
      | 'onTouchEndCapture'
      | 'onPointerEnter'
      | 'onPointerEnterCapture'
      | 'onPointerLeave'
      | 'onPointerLeaveCapture'
      | 'onPointerMove'
      | 'onPointerMoveCapture'
      | 'onPointerCancel'
      | 'onPointerCancelCapture'
      | 'onPointerDown'
      | 'onPointerDownCapture'
      | 'onPointerUp'
      | 'onPointerUpCapture'
      | 'accessibilityActions'
      | 'aria-label'
      | 'accessibilityRole'
      | 'accessibilityState'
      | 'aria-busy'
      | 'aria-checked'
      | 'aria-disabled'
      | 'aria-expanded'
      | 'aria-selected'
      | 'aria-labelledby'
      | 'accessibilityHint'
      | 'accessibilityValue'
      | 'aria-valuemax'
      | 'aria-valuemin'
      | 'aria-valuenow'
      | 'aria-valuetext'
      | 'onAccessibilityAction'
      | 'importantForAccessibility'
      | 'aria-hidden'
      | 'aria-live'
      | 'aria-modal'
      | 'role'
      | 'accessibilityLiveRegion'
      | 'accessibilityLabelledBy'
      | 'accessibilityElementsHidden'
      | 'accessibilityViewIsModal'
      | 'onAccessibilityEscape'
      | 'onAccessibilityTap'
      | 'onMagicTap'
      | 'accessibilityIgnoresInvertColors'
      | 'accessibilityLanguage'
    > & {readonly preserveAspectRatio?: string | undefined} & {},
) {
  return (
    <Svg
      width={166 * 2}
      height={170 * 2}
      viewBox="0 0 166 170"
      fill="none"
      {...props}>
      <Mask
        id="a"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={8}
        y={87}
        width={67}
        height={47}>
        <Path
          d="M13.904 132.802a3.537 3.537 0 01-3.632-6.011l46.82-36.54c5.04-3.933 12.386-2.57 15.679 2.91 3.282 5.463 1.064 12.566-4.744 15.19l-54.123 24.451z"
          fill="#F1EDE4"
        />
      </Mask>
      <G mask="url(#a)">
        <Path
          d="M13.904 132.802a3.537 3.537 0 01-3.632-6.011l46.82-36.54c5.04-3.933 12.386-2.57 15.679 2.91 3.282 5.463 1.064 12.566-4.744 15.19l-54.123 24.451z"
          fill="#F1EDE4"
        />
        <Path
          d="M8.803 139.316l71.996-36.367-5.896-9.811-21.459 12.893L7.213 133.81l1.59 5.506z"
          fill="#BA3E6A"
        />
        <Path
          d="M6.835 134.253L76.33 95.512l-3.518-5.855-2.282-3.798-62.41 42.669-1.285 5.725z"
          fill="#EF637C"
        />
      </G>
      <Mask
        id="b"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={91}
        y={87}
        width={67}
        height={44}>
        <Path
          d="M156.444 123.923a3.536 3.536 0 01-3.39 6.151L98 107.796c-5.927-2.398-8.419-9.442-5.32-15.034 3.09-5.573 10.351-7.204 15.527-3.486l48.237 34.647z"
          fill="#F1EDE4"
        />
      </Mask>
      <G mask="url(#b)">
        <Path
          d="M156.444 123.923a3.536 3.536 0 01-3.39 6.151L98 107.796c-5.927-2.398-8.419-9.442-5.32-15.034 3.09-5.573 10.351-7.204 15.527-3.486l48.237 34.647z"
          fill="#F1EDE4"
        />
        <Path
          d="M163.237 127.225L95.8 83.338l-4.083 7.366-4.688 8.458 73.776 32.451 2.432-4.388z"
          fill="#EF637C"
        />
        <Path
          d="M161.79 129.838L90.61 92.704l-3.313 5.974 6.277 11.078 59.733 25.512 8.483-5.43z"
          fill="#BA3E6A"
        />
      </G>
      <Mask
        id="c"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={71}
        y={0}
        width={22}
        height={75}>
        <Path
          d="M77.421 3.773a3.537 3.537 0 017.022-.14l8.235 58.817c.886 6.332-3.968 12.012-10.36 12.124-6.372.111-11.414-5.361-10.783-11.703l5.886-59.098z"
          fill="#F1EDE4"
        />
      </Mask>
      <G mask="url(#c)">
        <Path
          d="M77.421 3.773a3.537 3.537 0 017.022-.14l8.235 58.817c.886 6.332-3.968 12.012-10.36 12.124-6.372.111-11.414-5.361-10.783-11.703l5.886-59.098z"
          fill="#F1EDE4"
        />
        <Path
          d="M79.13-3.985l-3.21 80.511 6.829-.119 6.455-10.975L81.432.946l-2.302-4.93z"
          fill="#EF637C"
        />
        <Path
          d="M79.871-3.813l3.431 80.21 6.83-.119 6.456-10.975L88.815.817l-8.944-4.63z"
          fill="#BA3E6A"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;
