import themeColor from '@tandem/theme/themeColor';
import {ImageSourcePropType} from 'react-native';
import Moon from '@tandem/assets/svg/storySvg/moon.svg';
import Aeroplane from '@tandem/assets/svg/storySvg/aeroplane.svg';
import Ambulance from '@tandem/assets/svg/storySvg/ambulance.svg';
import Avocado from '@tandem/assets/svg/storySvg/avocado.svg';
import BabyBottle from '@tandem/assets/svg/storySvg/babyBottle.svg';
import Bag from '@tandem/assets/svg/storySvg/bag.svg';
import Banana from '@tandem/assets/svg/storySvg/banana.svg';
import Basketball from '@tandem/assets/svg/storySvg/basketball.svg';
import Birthdaycake from '@tandem/assets/svg/storySvg/birthdaycake.svg';
import Bowl from '@tandem/assets/svg/storySvg/bowl.svg';
import Box from '@tandem/assets/svg/storySvg/box.svg';
import Briefcase from '@tandem/assets/svg/storySvg/briefcase.svg';
import Bubbles from '@tandem/assets/svg/storySvg/bubbles.svg';
import Bus from '@tandem/assets/svg/storySvg/bus.svg';
import Cactus from '@tandem/assets/svg/storySvg/cactus.svg';
import Camera from '@tandem/assets/svg/storySvg/camera.svg';
import Canoe from '@tandem/assets/svg/storySvg/canoe.svg';
import Car from '@tandem/assets/svg/storySvg/car.svg';
import Carrot from '@tandem/assets/svg/storySvg/carrot.svg';
import Cat from '@tandem/assets/svg/storySvg/cat.svg';
import Chair from '@tandem/assets/svg/storySvg/chair.svg';
import Chilli from '@tandem/assets/svg/storySvg/chilli.svg';
import Constructioncrane from '@tandem/assets/svg/storySvg/constructioncrane.svg';
import Crab from '@tandem/assets/svg/storySvg/crab.svg';
import Crayon from '@tandem/assets/svg/storySvg/crayon.svg';
import Crown from '@tandem/assets/svg/storySvg/crown.svg';
import Desertisland from '@tandem/assets/svg/storySvg/desertisland.svg';
import Dog from '@tandem/assets/svg/storySvg/dog.svg';
import Dounut from '@tandem/assets/svg/storySvg/dounut.svg';
import Dress from '@tandem/assets/svg/storySvg/dress.svg';
import Egg from '@tandem/assets/svg/storySvg/egg.svg';
import Fireengine from '@tandem/assets/svg/storySvg/fireengine.svg';
import Football from '@tandem/assets/svg/storySvg/football.svg';
import Glassofmilk from '@tandem/assets/svg/storySvg/glassofmilk.svg';
import Grapes from '@tandem/assets/svg/storySvg/grapes.svg';
import Helicopter from '@tandem/assets/svg/storySvg/helicopter.svg';
// import Highspeedtrain from '@tandem/assets/svg/storySvg/highspeedtrain.svg';
import Icecream from '@tandem/assets/svg/storySvg/icecream.svg';
import Lemon from '@tandem/assets/svg/storySvg/lemon.svg';
import Mango from '@tandem/assets/svg/storySvg/mango.svg';
import Mountain from '@tandem/assets/svg/storySvg/mountain.svg';
import Oceanwave from '@tandem/assets/svg/storySvg/oceanwave.svg';
import Parrot from '@tandem/assets/svg/storySvg/parrot.svg';
import Rainbow from '@tandem/assets/svg/storySvg/rainbow.svg';
import Rickshaw from '@tandem/assets/svg/storySvg/rickshaw.svg';
import SailingBoat from '@tandem/assets/svg/storySvg/sailingBoat.svg';
import Slide from '@tandem/assets/svg/storySvg/slide.svg';
import Snowman from '@tandem/assets/svg/storySvg/snowman.svg';
import Steamtrain from '@tandem/assets/svg/storySvg/steamtrain.svg';
import Strawberry from '@tandem/assets/svg/storySvg/strawberry.svg';
import Sun from '@tandem/assets/svg/storySvg/sun.svg';
import TeaCup from '@tandem/assets/svg/storySvg/teaCup.svg';
import Teapot from '@tandem/assets/svg/storySvg/teapot.svg';
import Torch from '@tandem/assets/svg/storySvg/torch.svg';
import Tractor from '@tandem/assets/svg/storySvg/tractor.svg';
import Watermelon from '@tandem/assets/svg/storySvg/watermelon.svg';
import Wheelchair from '@tandem/assets/svg/storySvg/wheelchair.svg';
import WindTurbine from '@tandem/assets/svg/storySvg/windTurbine.svg';

export interface colorPalette {
  color: string;
  icon: ImageSourcePropType;
  isSelected: boolean;
  colorCode: string;
}
export interface StateObject {
  addedIllustration: number | null;
  tooltipFirst: boolean;
  tooltipSecond: boolean;
  tooltipThird: boolean;
  tooltipFourth: boolean;
  tooltipFifth: boolean;
}

export interface PlaceType {
  name: string;
  bgc: string;
  icon?: string;
  svgIcon?: SVGElement;
}

export interface OnlyImageType {
  name: string;
  url: any;
}

export const place: OnlyImageType[] = [
  {name: 'At home', url: require('../../assets/png/onboarding1.png')},
  {name: 'Big sailing boat', url: require('../../assets/png/onboarding2.png')},
  {name: 'Camping in tents', url: require('../../assets/png/onboarding3.png')},
  {name: 'City', url: require('@tandem/assets/png/natureCamp.jpeg')},
  {name: 'Dark forest', url: require('@tandem/assets/png/notSure.png')},
];

export const audience: PlaceType[] = [
  {name: 'Domestic animals', icon: '🐱', bgc: themeColor.themeBlue},
  {name: 'Peoples', icon: '👦🏽', bgc: themeColor.gold},
  {name: 'Farm animals', icon: '🐮', bgc: themeColor.lightGreen},
  {name: 'Jungle animals', icon: '🦁', bgc: themeColor.pink},
  {name: 'Space aliens', icon: '👽', bgc: themeColor.themeBlue},
  {name: 'Scientists', icon: '👨‍🔬', bgc: themeColor.gold},
];

export const typeOfStory: PlaceType[] = [
  {name: 'Fairy tale', icon: '✨', bgc: themeColor.pink},
  {name: 'Adventure', icon: '🏄', bgc: themeColor.themeBlue},
  {name: 'Silly/Comedy', icon: '🤣', bgc: themeColor.gold},
  {name: "I don't know", icon: '☹️', bgc: themeColor.lightGreen},
];

export const attribute: PlaceType[] = [
  {name: 'Moon', bgc: themeColor.pink, svgIcon: Moon},
  {name: 'Aeroplane', bgc: themeColor.themeBlue, svgIcon: Aeroplane},
  {name: 'Wind Turbine', bgc: themeColor.gold, svgIcon: WindTurbine},
  {name: 'Avocado', bgc: themeColor.lightGreen, svgIcon: Avocado},
  {name: 'Baby Bottle', bgc: themeColor.pink, svgIcon: BabyBottle},
  {name: 'Bag', bgc: themeColor.themeBlue, svgIcon: Bag},
  {name: 'Banana', bgc: themeColor.gold, svgIcon: Banana},
  {name: 'Basketball', bgc: themeColor.lightGreen, svgIcon: Basketball},
  {name: 'Birthday Cake', bgc: themeColor.pink, svgIcon: Birthdaycake},
  {name: 'Bowl', bgc: themeColor.themeBlue, svgIcon: Bowl},
  {name: 'Box', bgc: themeColor.gold, svgIcon: Box},
  {name: 'Briefcase', bgc: themeColor.lightGreen, svgIcon: Briefcase},
  {name: 'Bubbles', bgc: themeColor.pink, svgIcon: Bubbles},
  {name: 'Bus', bgc: themeColor.themeBlue, svgIcon: Bus},
  {name: 'Cactus', bgc: themeColor.gold, svgIcon: Cactus},
  {name: 'Camera', bgc: themeColor.lightGreen, svgIcon: Camera},
  {name: 'Canoe', bgc: themeColor.pink, svgIcon: Canoe},
  {name: 'Car', bgc: themeColor.themeBlue, svgIcon: Car},
  {name: 'Carrot', bgc: themeColor.gold, svgIcon: Carrot},
  {name: 'Cat', bgc: themeColor.lightGreen, svgIcon: Cat},
  {name: 'Chair', bgc: themeColor.pink, svgIcon: Chair},
  {name: 'Chilli', bgc: themeColor.themeBlue, svgIcon: Chilli},
  {
    name: 'Construction Crane',
    bgc: themeColor.gold,
    svgIcon: Constructioncrane,
  },
  {name: 'Crab', bgc: themeColor.lightGreen, svgIcon: Crab},
  {name: 'Crayon', bgc: themeColor.pink, svgIcon: Crayon},
  {name: 'Crown', bgc: themeColor.themeBlue, svgIcon: Crown},
  {name: 'Desert Island', bgc: themeColor.gold, svgIcon: Desertisland},
  {name: 'Dog', bgc: themeColor.lightGreen, svgIcon: Dog},
  {name: 'Dounut', bgc: themeColor.pink, svgIcon: Dounut},
  {name: 'Dress', bgc: themeColor.themeBlue, svgIcon: Dress},
  {name: 'Egg', bgc: themeColor.gold, svgIcon: Egg},
  {name: 'Fire Engine', bgc: themeColor.lightGreen, svgIcon: Fireengine},
  {name: 'Football', bgc: themeColor.pink, svgIcon: Football},
  {name: 'Glass of milk', bgc: themeColor.themeBlue, svgIcon: Glassofmilk},
  {name: 'Grapes', bgc: themeColor.gold, svgIcon: Grapes},
  {name: 'Helicopter', bgc: themeColor.lightGreen, svgIcon: Helicopter},
  // {name: 'Highspeed Train', bgc: themeColor.pink, svgIcon: Highspeedtrain},
  {name: 'Icecream', bgc: themeColor.pink, svgIcon: Icecream},
  {name: 'Lemon', bgc: themeColor.themeBlue, svgIcon: Lemon},
  {name: 'Mango', bgc: themeColor.gold, svgIcon: Mango},
  {name: 'Mountain', bgc: themeColor.lightGreen, svgIcon: Mountain},
  {name: 'Oceanwave', bgc: themeColor.pink, svgIcon: Oceanwave},
  {name: 'Parrot', bgc: themeColor.themeBlue, svgIcon: Parrot},
  {name: 'Rainbow', bgc: themeColor.gold, svgIcon: Rainbow},
  {name: 'Rickshaw', bgc: themeColor.lightGreen, svgIcon: Rickshaw},
  {name: 'Sailing Boat', bgc: themeColor.pink, svgIcon: SailingBoat},
  {name: 'Slide', bgc: themeColor.themeBlue, svgIcon: Slide},
  {name: 'Snowman', bgc: themeColor.gold, svgIcon: Snowman},
  {name: 'Steam Train', bgc: themeColor.lightGreen, svgIcon: Steamtrain},
  {name: 'Strawberry', bgc: themeColor.pink, svgIcon: Strawberry},
  {name: 'Sun', bgc: themeColor.themeBlue, svgIcon: Sun},
  {name: 'TeaCup', bgc: themeColor.gold, svgIcon: TeaCup},
  {name: 'Teapot', bgc: themeColor.lightGreen, svgIcon: Teapot},
  {name: 'Torch', bgc: themeColor.pink, svgIcon: Torch},
  {name: 'Tractor', bgc: themeColor.themeBlue, svgIcon: Tractor},
  {name: 'Watermelon', bgc: themeColor.gold, svgIcon: Watermelon},
  {name: 'Wheel Chair', bgc: themeColor.lightGreen, svgIcon: Wheelchair},
  {name: 'Ambulance', bgc: themeColor.pink, svgIcon: Ambulance},
];

export const illustration = [
  {url: require('../../assets/png/onboarding1.png')},
  {url: require('../../assets/png/onboarding2.png')},
  {url: require('../../assets/png/onboarding3.png')},
  {url: require('@tandem/assets/png/natureCamp.jpeg')},
  {url: require('@tandem/assets/png/notSure.png')},
];
