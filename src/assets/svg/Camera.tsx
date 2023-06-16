import * as React from "react"
import Svg, { SvgProps, Rect, Path } from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 40"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <Rect width={40} height={40} fill="#F1F4F9" rx={12} />
    <Path
      stroke="#4285F6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M23.04 12.052c1.01.402 1.319 1.802 1.732 2.252.413.45 1.004.602 1.331.602a3.147 3.147 0 0 1 3.147 3.146v5.796a4.22 4.22 0 0 1-4.22 4.22H14.97a4.22 4.22 0 0 1-4.22-4.22v-5.796a3.147 3.147 0 0 1 3.147-3.146c.326 0 .917-.152 1.331-.603.413-.45.721-1.85 1.731-2.252 1.011-.402 5.071-.402 6.081 0Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#4285F6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M25.495 17.5h.01"
    />
    <Path
      stroke="#4285F6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M23.179 21.128a3.179 3.179 0 1 0-6.357 0 3.179 3.179 0 0 0 6.357 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
