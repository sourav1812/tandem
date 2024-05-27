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
import themeColor from '@tandem/theme/themeColor';
import {
  OnlyImageType,
  PlaceType,
} from '@tandem/screens/GenerateStory/interface';
import RedQuestionMark from '@tandem/assets/svg/storySvg/RedQuestionMark.svg';
import {translation} from '@tandem/utils/methods';
import {BASE_URL} from '@tandem/constants/api';

import Ayran from '@tandem/assets/svg/storySvg/ayran.svg';
import Baklava from '@tandem/assets/svg/storySvg/baklava.svg';
import DonerKebab from '@tandem/assets/svg/storySvg/doner-kebab.svg';
import Lahmacun from '@tandem/assets/svg/storySvg/lahmacun.svg';
import Pide from '@tandem/assets/svg/storySvg/pide.svg';

export const shuffle = (originalArray: any) => {
  let array = originalArray;
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

export const TOOLTIP = 'ToolTip';
// export const TERMS_ACCEPTED = 'TERMS_ACCEPTED';

export const AUDIENCE: PlaceType[] = [
  {name: 'Domestic animals', icon: '🐱', bgc: themeColor.themeBlue},
  {name: 'People', icon: '👦🏽', bgc: themeColor.gold},
  {name: 'Farm animals', icon: '🐮', bgc: themeColor.lightGreen},
  {name: 'Jungle animals', icon: '🦁', bgc: themeColor.pink},
  {name: 'Space aliens', icon: '👽', bgc: themeColor.themeBlue},
  {name: 'Scientists', icon: '👨‍🔬', bgc: themeColor.gold},
  {name: "I don't know", svgIcon: RedQuestionMark, bgc: themeColor.lightGreen},
];

export const TYPE_OF_STORY: PlaceType[] = [
  {name: 'Fairy tale', icon: '✨', bgc: themeColor.pink},
  {name: 'Adventure', icon: '🏄', bgc: themeColor.themeBlue},
  {name: 'Silly/Comedy', icon: '🤣', bgc: themeColor.gold},
  {name: "I don't know", svgIcon: RedQuestionMark, bgc: themeColor.lightGreen},
];

export const ATTRIBUTE: PlaceType[] = [
  // ! new food items
  {name: 'Ayran', bgc: themeColor.lightGreen, svgIcon: Ayran},
  {name: 'Baklava', bgc: themeColor.pink, svgIcon: Baklava},
  {name: 'Doner Kebab', bgc: themeColor.themeBlue, svgIcon: DonerKebab},
  {name: 'Lahmacun', bgc: themeColor.yellow, svgIcon: Lahmacun},
  {name: 'Pide', bgc: themeColor.gold, svgIcon: Pide},
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

export const ILLUSTRATION = [
  {
    name: 'pixar',
    url: BASE_URL + 'images/illustration-styles/pixar.webp',
  },
  {
    name: 'low-poly',
    url: BASE_URL + 'images/illustration-styles/low_poly.webp',
  },
  // {
  //   name: 'style1-papercut',
  //   url: BASE_URL + 'images/illustration-styles/papercut.webp',
  // },
  // {
  //   name: 'style2-scrappy',
  //   url: BASE_URL + 'images/illustration-styles/scrappy.webp',
  // },
  // {
  //   name: 'style3-wonder',
  //   url: BASE_URL + 'images/illustration-styles/wonder.webp',
  // },
  // {
  //   name: 'style4-sleepy',
  //   url: BASE_URL + 'images/illustration-styles/sleepy.webp',
  // },
  // {
  //   name: 'style5-busy',
  //   url: BASE_URL + 'images/illustration-styles/busy.webp',
  // },
  // {
  //   name: 'style6-anthro',
  //   url: BASE_URL + 'images/illustration-styles/anthro.webp',
  // },
  // {
  //   name: 'style7-flat',
  //   url: BASE_URL + 'images/illustration-styles/flat.webp',
  // },
  // {
  //   name: 'style8-nature',
  //   url: BASE_URL + 'images/illustration-styles/nature.webp',
  // },
];

export const COLOR_PALETTE = [
  {firstColor: '#0633FD', secondColor: '#FEF902'},
  {firstColor: '#0998FF', secondColor: '#FF9409'},
  {firstColor: '#00FDFF', secondColor: '#FF2E09'},
  {firstColor: '#02F98F', secondColor: '#FF2F8F'},
  {firstColor: '#02F902', secondColor: '#FF3FFB'},
  {firstColor: '#89F902', secondColor: '#9137FF'},
];

export const AVATAR_ARRAY = [...new Array(29).keys()].map(
  key => BASE_URL + `images/avatars/avatar${key + 1}.webp`,
);

export const PLACE: OnlyImageType[] = [
  {
    name: 'Outer Space',
    url: BASE_URL + 'images/locations/outer_space.webp',
  },
  {
    name: 'Camping in tents',
    url: BASE_URL + 'images/locations/camping_in_tents.webp',
  },
  {
    name: 'City',
    url: BASE_URL + 'images/locations/city.webp',
  },
  {
    name: 'Dark Forest',
    url: BASE_URL + 'images/locations/dark_forest.webp',
  },
  {
    name: 'Fair Ground',
    url: BASE_URL + 'images/locations/fair_ground.webp',
  },
  {
    name: 'Farm Yard',
    url: BASE_URL + 'images/locations/farm_yard.webp',
  },
  {
    name: 'Snowy Mountain',
    url: BASE_URL + 'images/locations/snowy_mountain.webp',
  },
  {
    name: 'Sunny Beach',
    url: BASE_URL + 'images/locations/sunny_beach.webp',
  },
];

export const WHO: OnlyImageType[] = [
  {
    name: 'Astronaut',
    url: BASE_URL + 'images/who/astronaut.webp',
  },
  {
    name: 'Boy Who Plays The Drums',
    url: BASE_URL + 'images/who/boy_who_plays_the_drums.webp',
  },
  {
    name: 'Bunny Rabbit',
    url: BASE_URL + 'images/who/bunny_rabbit.webp',
  },
  {
    name: 'Cute Dinosaur',
    url: BASE_URL + 'images/who/cute_dinosaur.webp',
  },
  {
    name: 'Cute Duckling',
    url: BASE_URL + 'images/who/cute_duckling.webp',
  },
  {
    name: 'Cute Kitten',
    url: BASE_URL + 'images/who/cute_kitten.webp',
  },
  {
    name: 'Sea Monster',
    url: BASE_URL + 'images/who/cute_sea_monster.webp',
  },
  {
    name: 'Farm Animals',
    url: BASE_URL + 'images/who/farm_animals.webp',
  },
  {
    name: 'Female Doctor',
    url: BASE_URL + 'images/who/female_doctor.webp',
  },
  {
    name: 'Female Firefighter',
    url: BASE_URL + 'images/who/female_firefighter.webp',
  },
  {
    name: 'Female Runner',
    url: BASE_URL + 'images/who/female_runner.webp',
  },
  {
    name: 'Fisherman',
    url: BASE_URL + 'images/who/fisherman.webp',
  },
  {
    name: 'Happy Yeti',
    url: BASE_URL + 'images/who/happy_yeti.webp',
  },
  {
    name: 'Mad Professor',
    url: BASE_URL + 'images/who/mad_professor.webp',
  },
  {
    name: 'Male Runner',
    url: BASE_URL + 'images/who/male_runner.webp',
  },
  {
    name: 'Pet Dog',
    url: BASE_URL + 'images/who/pet_dog.webp',
  },
  {
    name: 'Policeman',
    url: BASE_URL + 'images/who/policeman.webp',
  },
  {
    name: 'Racing Cyclist',
    url: BASE_URL + 'images/who/racing_cyclist.webp',
  },
  {
    name: 'Safari Animals',
    url: BASE_URL + 'images/who/safari_animals.webp',
  },
];

export const WHAT_HAPPENS: OnlyImageType[] = [
  {
    name: 'An adventure',
    url: BASE_URL + 'images/whatHappensNew/adventure.webp',
  },
  {
    name: 'Makes you laugh',
    url: BASE_URL + 'images/whatHappensNew/laugh.webp',
  },
  {
    name: 'Move, dance, sing or be silly',
    url: BASE_URL + 'images/whatHappensNew/move.webp',
  },
  {
    name: 'Bedtime story',
    url: BASE_URL + 'images/whatHappensNew/sleep.webp',
  },
  {
    name: 'A story about things',
    url: BASE_URL + 'images/whatHappensNew/stuff.webp',
  },
];

export const RELATIONSHIP_ARRAY = [
  {role: translation('MOM')},
  {role: translation('DAD')},
  {role: translation('UNCLE')},
  {role: translation('AUNT')},
  {role: translation('GRANDMOTHER')},
  {role: translation('GRANDFATHER')},
  {role: translation('FRIEND')},
  {role: translation('OTHER')},
];

export const CACHE_SESSION = 'tandemcache';

export const MONTH_ARRAY: {month: string; monthKey: string}[] = [
  {month: translation('JANUARY'), monthKey: 'january'},
  {month: translation('FEBRUARY'), monthKey: 'february'},
  {month: translation('MARCH'), monthKey: 'march'},
  {month: translation('APRIL'), monthKey: 'april'},
  {month: translation('MAY'), monthKey: 'may'},
  {month: translation('JUNE'), monthKey: 'june'},
  {month: translation('JULY'), monthKey: 'july'},
  {month: translation('AUGUST'), monthKey: 'august'},
  {month: translation('SEPTEMBER'), monthKey: 'september'},
  {month: translation('OCTOBER'), monthKey: 'october'},
  {month: translation('NOVEMBER'), monthKey: 'november'},
  {month: translation('DECEMBER'), monthKey: 'december'},
];
export const CACHE_DIR = 'tandemCacheDirectory';

export const YEARS_ARRAY = Array.from(
  {length: Math.abs(1924 - new Date().getFullYear()) + 1},
  (_, i) => {
    return {
      index: i,
      yearkey: 1924 + i,
    };
  },
);
export const FONT_SIZES = [16, 20, 24, 28, 32, 40];

// export const WHAT_HAPPENS: OnlyImageType[] = [
//   {
//     name: 'Adventure',
//     url: BASE_URL+'images/whatHappens/adventure.webp',
//   },
//   {
//     name: 'Fairy Tale',
//     url: BASE_URL+'images/whatHappens/fairy_tale.webp',
//   },
//   {
//     name: 'Fantastic Mystery',
//     url: BASE_URL+'images/whatHappens/fantastic_mystery.webp',
//   },
//   {
//     name: 'Friendship ',
//     url: BASE_URL+'images/whatHappens/friendship_story.webp',
//   },
//   {
//     name: 'Funny ',
//     url: BASE_URL+'images/whatHappens/funny_story.webp',
//   },
//   {
//     name: 'Love',
//     url: BASE_URL+'images/whatHappens/love_story.webp',
//   },
//   {
//     name: 'Spooky',
//     url: BASE_URL+'images/whatHappens/spooky_tale.webp',
//   },
// ];

export const NOTIFICATION_PROMPTS = [
  {
    id: '1',
    key1: 'User registers but does not create a story within 24 hours',
    body: 'It’s time to create your first story!',
  },
  {
    id: '2',
    key1: 'User has not opened the app between 10:00-13:00 local time. Triggered once every 5 days.',
    body: 'Your next magical story awaits! Create a story with your child now.',
  },
  {
    id: '3',
    key1: 'User reads 1 story this week.',
    body: "Fantastic, you've read your first story this week! Keep it up!",
  },
  {
    id: '4',
    key1: 'User reads 3 stories this week',
    body: "You’re on a roll. You've read your third story this week! Keep it up!",
  },
  {
    id: '5',
    key1: 'User reads 5 stories this week',
    body: "Full steam ahead! You've read your fifth story this week! Keep it up!",
  },
  {
    id: '6',
    key1: 'User reads 10 stories this week',
    body: 'Ten stories! You’re unstoppable!',
  },
  {
    id: '7',
    key1: 'User has been inactive for 3 days',
    body: "We've missed you yesterday! Take 5 minutes to create an enchanting story with your little one today!",
  },
  {
    id: '8',
    key1: 'User has been inactive for 1 week',
    body: "It's been a while! An adventure story awaits for you and your children. Create one now!",
  },
  {
    id: '9',
    key1: 'User reads 100 pages',
    body: "Woohoo! You've hit 100 pages! Awesome milestone for you and your children.",
  },
  {
    id: '10',
    key1: 'Story generated but never opened',
    body: 'The Tandem Robots were hard at work and now your personalised story is ready to read!',
  },
];

export const NAVIGATE_TO_BOOKSHELF = 'NAVIGATE_TO_BOOKSHELF';
