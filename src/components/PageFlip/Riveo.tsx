import React from 'react';
import {Project} from './Project';
const imageSrc2 = require('@tandem/assets/png/storyBackground.png');
const imageSrc1 = require('@tandem/assets/png/onboarding2.png');
const textArray = [
  {text: 'Sed ut perspiciatis ', img: imageSrc1},
  {text: 'unde omnis iste natus error sit ', img: imageSrc2},
  {
    text: 'voluptatem accusantium doloremque laudantium, totam rem aperiam,',
    img: imageSrc1,
  },
  {
    text: ' eaque ipsa quae ab illo inventore veritatis et quasi architecto ',
    img: imageSrc2,
  },
  {
    text: 'beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit',
    img: imageSrc1,
  },
  {
    text: ' aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione ',
    img: imageSrc2,
  },
  {
    text: 'voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, ',
    img: imageSrc1,
  },
  {
    text: 'adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. ',
    img: imageSrc2,
  },
  {
    text: 'Ut enim ad minima veniam, quis nostrum exercitationem',
    img: imageSrc1,
  },
  {
    text: ' ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? ',
    img: imageSrc2,
  },
  {
    text: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam ',
    img: imageSrc1,
  },
  {
    text: 'nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas ',
    img: imageSrc2,
  },
  {text: 'nulla pariatur?', img: imageSrc1},
  {text: 'unde omnis iste natus error sit ', img: imageSrc2},
  {
    text: 'voluptatem accusantium doloremque laudantium, totam rem aperiam,',
    img: imageSrc1,
  },
  {
    text: ' eaque ipsa quae ab illo inventore veritatis et quasi architecto ',
    img: imageSrc2,
  },
  {
    text: 'beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit',
    img: imageSrc1,
  },
  {
    text: ' aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione ',
    img: imageSrc2,
  },
  {
    text: 'voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, ',
    img: imageSrc1,
  },
  {
    text: 'adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. ',
    img: imageSrc2,
  },
  {
    text: 'Ut enim ad minima veniam, quis nostrum exercitationem',
    img: imageSrc1,
  },
  {
    text: ' ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? ',
    img: imageSrc2,
  },
  {
    text: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam ',
    img: imageSrc1,
  },
  {
    text: 'nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas ',
    img: imageSrc2,
  },
  {text: 'nulla pariatur?', img: imageSrc1},
  {text: 'unde omnis iste natus error sit ', img: imageSrc2},
  {
    text: 'voluptatem accusantium doloremque laudantium, totam rem aperiam,',
    img: imageSrc1,
  },
  {
    text: ' eaque ipsa quae ab illo inventore veritatis et quasi architecto ',
    img: imageSrc2,
  },
  {
    text: 'beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit',
    img: imageSrc1,
  },
  {
    text: ' aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione ',
    img: imageSrc2,
  },
  {
    text: 'voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, ',
    img: imageSrc1,
  },
  {
    text: 'adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. ',
    img: imageSrc2,
  },
  {
    text: 'Ut enim ad minima veniam, quis nostrum exercitationem',
    img: imageSrc1,
  },
  {
    text: ' ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? ',
    img: imageSrc2,
  },
  {
    text: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam ',
    img: imageSrc1,
  },
  {
    text: 'nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas ',
    img: imageSrc2,
  },
  {text: 'nulla pariatur?', img: imageSrc1},
  {text: 'unde omnis iste natus error sit ', img: imageSrc2},
  {
    text: 'voluptatem accusantium doloremque laudantium, totam rem aperiam,',
    img: imageSrc1,
  },
  {
    text: ' eaque ipsa quae ab illo inventore veritatis et quasi architecto ',
    img: imageSrc2,
  },
  {
    text: 'beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit',
    img: imageSrc1,
  },
  {
    text: ' aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione ',
    img: imageSrc2,
  },
  {
    text: 'voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, ',
    img: imageSrc1,
  },
  {
    text: 'adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. ',
    img: imageSrc2,
  },
  {
    text: 'Ut enim ad minima veniam, quis nostrum exercitationem',
    img: imageSrc1,
  },
  {
    text: ' ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? ',
    img: imageSrc2,
  },
  {
    text: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam ',
    img: imageSrc1,
  },
  {
    text: 'nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas ',
    img: imageSrc2,
  },
  {text: 'nulla pariatur?', img: imageSrc1},
  {text: 'unde omnis iste natus error sit ', img: imageSrc2},
  {
    text: 'voluptatem accusantium doloremque laudantium, totam rem aperiam,',
    img: imageSrc1,
  },
  {
    text: ' eaque ipsa quae ab illo inventore veritatis et quasi architecto ',
    img: imageSrc2,
  },
  {
    text: 'beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit',
    img: imageSrc1,
  },
  {
    text: ' aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione ',
    img: imageSrc2,
  },
  {
    text: 'voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, ',
    img: imageSrc1,
  },
  {
    text: 'adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. ',
    img: imageSrc2,
  },
  {
    text: 'Ut enim ad minima veniam, quis nostrum exercitationem',
    img: imageSrc1,
  },
  {
    text: ' ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? ',
    img: imageSrc2,
  },
  {
    text: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam ',
    img: imageSrc1,
  },
  {
    text: 'nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas ',
    img: imageSrc2,
  },
  {text: 'nulla pariatur?', img: imageSrc1},
];

export const Riveo = () => {
  return <Project textArray={textArray.reverse()} />;
};
