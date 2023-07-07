import * as React from 'react';
import Svg, {
  SvgProps,
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from 'react-native-svg';
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 173 156"
    height={156}
    width={173}
    fill="none"
    {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#FF9B26"
        d="M98.11 145.057c-7.658.588-9.05 9.938-2.238 10.895 6.814.95 8.467-11.374 2.237-10.895Z"
      />
      <Path
        fill="url(#b)"
        d="M100.716 145.891c-.006 3.26-2.216 7.06-6.113 6.52-1.358-.191-2.388-.717-3.108-1.442-.151 2.324 1.242 4.539 4.377 4.976 5.592.786 7.706-7.361 4.844-10.054Z"
      />
      <Path
        fill="url(#c)"
        d="M93.629 148.68c-.687 2.358 3.176 4.265 4.068 1.66.892-2.604-2.113-2.768-4.068-1.66Z"
      />
      <Path
        fill="#FF9B26"
        d="M34.272 20.813c2.937 5.29 13.318 3.37 9.263-2.686-4.062-6.056-12.206-2.604-9.263 2.686Z"
      />
      <Path
        fill="url(#d)"
        d="M43.535 18.127c-.014-.02-.028-.034-.034-.048.02 3.39-7.232 3.896-9.812 1.046.075.533.254 1.1.583 1.688 2.937 5.29 13.318 3.37 9.263-2.686Z"
      />
      <Path
        fill="url(#e)"
        d="M35.967 16.637c-1.324 1.73 2.477 4.108 4.467 2.194 1.996-1.914-2.6-4.21-4.467-2.194Z"
      />
      <Path
        fill="#FF9B26"
        d="M.659 50.956c-3.932 8.182 10.985 10.534 11.767 4.58.782-5.953-8.707-10.936-11.767-4.58Z"
      />
      <Path
        fill="url(#f)"
        d="M.364 51.66c-2.772 7.608 11.3 9.652 12.062 3.876.164-1.237-.124-2.426-.693-3.486-1.544 3.473-8.92 3.076-11.37-.39Z"
      />
      <Path
        fill="url(#g)"
        d="M3.945 49.542c-1.255 1.27 1.668 2.925 3.65 2.043 1.983-.875-1.893-4.046-3.65-2.043Z"
      />
      <Path
        fill="#FF9B26"
        d="M62.26 7.751c8.377-2.795 5.536 12.393 15.506 17.936 5.997 3.335 13.825 2.768 16.117-2.003 2.292-4.77-6.56-21.415 6.587-23.534 13.146-2.125-3.788 18.435 6.292 24.853 10.072 6.419 8.926-.8 19.609.506 10.683 1.306 2.628 14.942 8.268 15.215 5.64.274 12.632-1.79 12.618 2.57-.021 4.361-10.8 5.653-6.354 9.617 4.446 3.965 13.359 5.346 23.994.527 10.628-4.819 11.314 11.039-.967 8.968-12.282-2.065-24.468-6.733-26.101 1.223-1.633 7.956-.075 12.83 14.958 14.04 16.33 1.312 6.456 9.494-7.561 7.546-11.506-1.6-30.183 9.897-22.821 19.822 4.906 6.616 24.248 20.191 15.212 25.769-9.037 5.577-16.454-17.403-24.831-21.907-5.867-3.151-11.815-2.352-16.392 3.328-4.837 6.015-2.086 7.567-.103 14.956 1.99 7.389-11.52 15.55-11.986 7.163-.467-8.387 5.132-18.598-1.757-21.312-6.889-2.714-23.575-5.598-14.258 21.189 1.894 5.434-12.549 7.71-13.139-1.647-.974-15.509 8.577-21.654 6.916-26.357-1.66-4.702-7.231-9.166-11.341-9.425-2.443-.158-9.366 1.305-10.148 7.258-.782 5.954-11.308 5.988-12.625-.389-1.317-6.377 16.289-7.184 18.587-21.388 1.098-6.766 7.863-4.34 5.38-13.581-2.484-9.234-22.698-5.495-28.145-10.97-5.448-5.475.994-12.823 12.171-10.055 16.186 4.005 19.782-7.45 13.03-14.368-5.482-5.618 1.03-11.025 6.045-4.121 2.792 3.848 6.957 3.711 10.148.376 8.226-8.585-11.843-18.825-2.91-21.805Z"
      />
      <Path
        fill="url(#h)"
        d="M63.824 105.358c4.24-5.913-.83-8.387-9.428-11.668-8.597-3.274-11.54 1.818-16.556 6.89-3.012 3.049-6.91 3.773-9.866 3.165 1.406 6.281 11.822 6.22 12.604.301.782-5.954 7.705-7.41 10.148-7.26 4.11.26 9.68 4.724 11.341 9.426.165.458.213.93.185 1.422.577-.848 1.105-1.62 1.572-2.276Z"
      />
      <Path
        fill="url(#i)"
        d="M23.774 57.723c5.448 5.475 25.661 1.736 28.145 10.97 2.484 9.235-4.281 6.809-5.379 13.582a16.25 16.25 0 0 1-.803 3.049c5.668-4.703.11-3.616 7.932-11.709 5.496-5.687-2.14-14.668-14.272-14.162-12.398.52-17.962-2.31-16.81-8.599-1.283 2.05-1.056 4.62 1.187 6.87Z"
      />
      <Path
        fill="url(#j)"
        d="M68.297 134.23c-9.317-26.787 7.362-23.903 14.258-21.189 1.983.779 2.93 2.18 3.286 3.985 1.023-3.644-5.756-10.055-16.275-7.184-10.518 2.864-5.777 15.905-5.447 21.599.26 4.47-5.174 4.416-8.838 2.092 1.469 8.236 14.834 5.939 13.016.697Z"
      />
      <Path
        fill="url(#k)"
        d="M137.61 130.812c2.909-1.797 2.875-4.422 1.324-7.382-.213 1.231-.755 2.379-1.743 3.343-4.762 2.987-13.276-8.77-17.846-15.421-4.563-6.65-9.263-14.654-20.131-6.035-10.868 8.626-7.3 14.456-5.832 22.324 1.283 6.883-7.582 10.471-9.091 4.989-.02.581-.014 1.156.014 1.723.466 8.387 13.969.225 11.986-7.163-1.99-7.389-4.741-8.941.103-14.956 4.57-5.68 10.525-6.48 16.392-3.329 8.37 4.498 15.794 27.485 24.824 21.907Z"
      />
      <Path
        fill="url(#l)"
        d="M170.859 53.055c.199 2.215-.432 4.976-3.746 6.904-5.215 3.034-23.116-3.678-27.624-2.782-3.698.738-3.053 6.281-2.099 9.207.089-.868.233-1.784.432-2.748 1.633-7.963 13.819-3.295 26.1-1.224 9.284 1.559 11.157-7.108 6.937-9.357Z"
      />
      <Path
        fill="url(#m)"
        d="M120.95 102.022c-2.23-9.077 13.922-18.243 24.276-16.807 11.808 1.64 20.679-3.91 13.413-6.48.09.246.165.492.192.745 3.815 7.177-13.818.84-26.127 5.372-12.529 4.614-13.565 12.775-11.754 17.17Z"
      />
      <Path
        fill="url(#n)"
        d="M96.037 16.37c-2.984-8.38-1.31-13.062 4.543-15.044 3.334-1.128 4.789 2.098 4.933 4.525.645-3.896.096-6.535-5.036-5.7-13.14 2.125-4.289 18.769-6.587 23.533-.48.998-1.366 2.221-2.292 2.645 3.15-.492 6.43-4.374 4.44-9.959Z"
      />
      <Path
        fill="url(#o)"
        d="M135.339 40.752c.013 0 .02 0 .034-.007-.247-.007-.487-.007-.727-.02-5.434-.267 1.845-12.933-7.177-15.025 2.202 3.343-2.93 16.726 7.87 15.052Z"
      />
      <Path
        fill="url(#p)"
        d="M144.89 40.67c.37.86-1.427 2.549-4.741 5.105-2.759 2.126-2.237 4.122-.268 5.653-.666-2.884 7.369-4.368 7.383-8.134 0-1.586-.927-2.317-2.374-2.625Z"
      />
      <Path
        fill="url(#q)"
        d="M30.011 101.585c.542 2.009 7.836-.943 7.465-2.967-.37-2.023-7.479 1.08-7.465 2.967Z"
      />
      <Path
        fill="url(#r)"
        d="M99.646 14.552c-.22-4.559 1.379-6.951 3.623-8.653 2.243-1.709-1.606-4.587-5.304-.451-2.944 3.294-1.283 8.14 1.681 9.104Z"
      />
      <Path
        fill="url(#s)"
        d="M161.803 57.382c1.832 2.221 9.434-2.188 7.012-3.438-2.415-1.245-7.136 2.194-7.012 3.438Z"
      />
      <Path
        fill="url(#t)"
        d="M53.744 38.352c.734-5.126-5.132-8.571-6.278-11.182-.981 1.38-.83 3.732 1.51 6.131 3.348 3.431 4.144 7.97 2.133 11.196 1.229-1.53 2.271-3.636 2.635-6.145Z"
      />
      <Path
        fill="url(#u)"
        d="M69.196 22.645c-.9-4.915-9.661-9.884-8.947-13.588-2.683 4.012 12.206 12.898 4.92 20.505-1.099 1.142-2.306 1.9-3.534 2.263 3.664 2.303 8.466-4.224 7.56-9.18Z"
      />
      <Path
        fill="url(#v)"
        d="M27.754 56.705c-4.288-2.276-4.33-7.847 4.027-8.066 3.15-.082-5.742.622-3.17 3.979 2.1 2.734 6.54 2.221 6.004 3.759-.535 1.538-4.68 1.49-6.861.328Z"
      />
      <Path
        fill="url(#w)"
        d="M62.142 9.48c-1.756.834 1.64.294 4.138 3.486 2.504 3.192 1.351-6.083-4.138-3.486Z"
      />
      <Path
        fill="#FF9B26"
        d="M136.361 5.871c-5.228 5.38-.713 15.38 5.002 14.75 5.715-.628 13.201-8.366 9.125-13.075-4.068-4.716-9.331-6.61-14.127-1.675Z"
      />
      <Path
        fill="url(#x)"
        d="M150.488 7.54c-.013-.021-.034-.035-.048-.056.426 3.021-2.264 7.69-6.394 9.324-5.284 2.084-11.322-2.714-9.03-9.07-2.895 5.529 1.242 13.444 6.347 12.877 5.708-.629 13.194-8.36 9.125-13.076Z"
      />
      <Path
        fill="url(#y)"
        d="M139.991 5.065c-1.866 3.793 5.379 5.769 6.305 3.178.927-2.59-5.043-5.735-6.305-3.178Z"
      />
      <Path
        fill="url(#z)"
        d="M146.784 10.191c-1.174.964-.172 2.885.665 2.406.83-.478.185-3.11-.665-2.406Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={91.495}
        x2={102.141}
        y1={151.664}
        y2={150.61}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.463} stopColor="#F7722A" stopOpacity={0.5} />
        <Stop offset={0.622} stopColor="#F7722A" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={93.615}
        x2={97.881}
        y1={150.043}
        y2={149.62}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.134} stopColor="#FCEE21" stopOpacity={0.5} />
        <Stop offset={0.502} stopColor="#FCEE21" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={33.948}
        x2={44.478}
        y1={21.77}
        y2={20.727}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.463} stopColor="#F7722A" stopOpacity={0.5} />
        <Stop offset={0.622} stopColor="#F7722A" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={35.74}
        x2={40.892}
        y1={17.943}
        y2={17.433}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.134} stopColor="#FCEE21" stopOpacity={0.5} />
        <Stop offset={0.502} stopColor="#FCEE21" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="f"
        x1={0.186}
        x2={12.454}
        y1={55.638}
        y2={54.422}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.463} stopColor="#F7722A" stopOpacity={0.5} />
        <Stop offset={0.622} stopColor="#F7722A" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="g"
        x1={3.679}
        x2={8.08}
        y1={50.584}
        y2={50.148}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.134} stopColor="#FCEE21" stopOpacity={0.5} />
        <Stop offset={0.502} stopColor="#FCEE21" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="h"
        x1={27.892}
        x2={65.136}
        y1={102.877}
        y2={99.188}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.463} stopColor="#F7722A" stopOpacity={0.5} />
        <Stop offset={0.622} stopColor="#F7722A" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="i"
        x1={23.335}
        x2={55.178}
        y1={69.156}
        y2={66.002}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.463} stopColor="#F7722A" stopOpacity={0.5} />
        <Stop offset={0.622} stopColor="#F7722A" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="j"
        x1={54.468}
        x2={86.541}
        y1={125.401}
        y2={122.225}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.463} stopColor="#F7722A" stopOpacity={0.5} />
        <Stop offset={0.622} stopColor="#F7722A" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="k"
        x1={82.994}
        x2={138.88}
        y1={121.158}
        y2={115.623}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.463} stopColor="#F7722A" stopOpacity={0.5} />
        <Stop offset={0.622} stopColor="#F7722A" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="l"
        x1={136.548}
        x2={173.12}
        y1={61.443}
        y2={57.821}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.463} stopColor="#F7722A" stopOpacity={0.5} />
        <Stop offset={0.622} stopColor="#F7722A" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="m"
        x1={119.607}
        x2={161.973}
        y1={92.366}
        y2={88.169}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.463} stopColor="#F7722A" stopOpacity={0.5} />
        <Stop offset={0.622} stopColor="#F7722A" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="n"
        x1={90.352}
        x2={106.614}
        y1={13.789}
        y2={12.179}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.463} stopColor="#F7722A" stopOpacity={0.5} />
        <Stop offset={0.622} stopColor="#F7722A" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="o"
        x1={128.028}
        x2={134.596}
        y1={33.57}
        y2={32.92}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.463} stopColor="#F7722A" stopOpacity={0.5} />
        <Stop offset={0.622} stopColor="#F7722A" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="p"
        x1={138.002}
        x2={147.501}
        y1={46.478}
        y2={45.538}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.463} stopColor="#F7722A" stopOpacity={0.5} />
        <Stop offset={0.622} stopColor="#F7722A" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="q"
        x1={29.906}
        x2={37.59}
        y1={100.495}
        y2={99.734}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.134} stopColor="#FCEE21" stopOpacity={0.5} />
        <Stop offset={0.502} stopColor="#FCEE21" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="r"
        x1={96.385}
        x2={104.322}
        y1={9.362}
        y2={8.576}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.134} stopColor="#FCEE21" stopOpacity={0.5} />
        <Stop offset={0.502} stopColor="#FCEE21" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="s"
        x1={161.689}
        x2={169.378}
        y1={56.216}
        y2={55.454}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.134} stopColor="#FCEE21" stopOpacity={0.5} />
        <Stop offset={0.502} stopColor="#FCEE21" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="t"
        x1={47.565}
        x2={53.633}
        y1={36.004}
        y2={35.403}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.463} stopColor="#F7722A" stopOpacity={0.5} />
        <Stop offset={0.622} stopColor="#F7722A" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="u"
        x1={60.541}
        x2={68.952}
        y1={20.804}
        y2={19.971}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.463} stopColor="#F7722A" stopOpacity={0.5} />
        <Stop offset={0.622} stopColor="#F7722A" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="v"
        x1={24.99}
        x2={34.335}
        y1={53.753}
        y2={52.827}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.134} stopColor="#FCEE21" stopOpacity={0.5} />
        <Stop offset={0.502} stopColor="#FCEE21" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="w"
        x1={61.843}
        x2={67.378}
        y1={11.691}
        y2={11.143}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.134} stopColor="#FCEE21" stopOpacity={0.5} />
        <Stop offset={0.502} stopColor="#FCEE21" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="x"
        x1={133.898}
        x2={151.288}
        y1={12.946}
        y2={14.633}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.463} stopColor="#F7722A" stopOpacity={0.5} />
        <Stop offset={0.622} stopColor="#F7722A" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="y"
        x1={139.661}
        x2={146.458}
        y1={6.461}
        y2={7.12}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.134} stopColor="#FCEE21" stopOpacity={0.5} />
        <Stop offset={0.502} stopColor="#FCEE21" stopOpacity={0.5} />
      </LinearGradient>
      <LinearGradient
        id="z"
        x1={146.245}
        x2={147.86}
        y1={11.287}
        y2={11.444}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.134} stopColor="#FCEE21" stopOpacity={0.5} />
        <Stop offset={0.502} stopColor="#FCEE21" stopOpacity={0.5} />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h173v156H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
