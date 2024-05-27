export enum API_RESPONSE {
  STATUS = 'status',
  MESSAGE = 'message',
}
export enum USER {
  TOKEN = 'token',
  REFRESH_TOKEN = 'refreshToken',
}

export enum STORY_PARTS {
  WHO = 'characters',
  INCLUSION = 'childInStory',
  WHERE = 'location',
  WHAT_THINGS = 'plotElements',
  WHAT_HAPPENS = 'genre',
  STYLES = 'illustrationStyle',
  COLOR = 'illustrationColors',
  LANGAUGE = 'language',
}

export enum STORIES_RESPONSE {
  BOOK_COVER = 'bookCover',
  BOOK_ID = 'bookId',
  CHILD_ID = 'childId',
  COMPREHENSION_QUESTIONS = 'comprehensionQuestions',
  CREATED_AT = 'createdAt',
  LLM = 'llm',
  ORGANIZATION_ID = 'organizationId',
  PAGES = 'pages',
  PROMPT = 'prompt',
  RATING = 'rating',
  STATUS = 'status',
  STORY = 'story',
  TEASER = 'teaser',
  THUMBNAIL = 'thumbnail',
  TITLE = 'title',
  USER_ID = 'userId',
  ILLUSTRATION_PROMPT = 'illustration_prompt',
  ILLUSTRATION_URL = 'illustration_url',
  IMG = 'img',
  PAGE_NUMBER = 'page_number',
  SELECTED_ILLUSTRATION = 'selected_illustration',
  STORY_TEXT = 'story_text',
  RATING_INFO = 'ratingInfo',
}

export enum RATING_INFO {
  ID = '_id',
  BOOK_ID = 'bookId',
  USER_ID = 'userId',
  STORY_RATING = 'storyRating',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  V = '__V',
}

export enum PEOPLE {
  ADULT = 'adult',
  CHILD = 'child',
}

export enum SOCIAL_AUTH {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
  APPLE = 'apple',
}

export enum DIRECTION_ARROWS {
  EAST = 'East',
  WEST = 'West',
  NORTH = 'North',
  SOUTH = 'South',
  NORTH_EAST = 'NorthEast',
  NORTH_WEST = 'NorthWest',
  SOUTH_EAST = 'SouthEast',
  SOUTH_WEST = 'SouthWest',
}

// ! new story response

// ! pages
// ! title
// ! teaser
// ! comprehension_questions
// ! images [NEW]
// ! usage  [NEW]
// ! id

// {
//   "pages": [
//     {
//       "text": "On a sunny day, Tom, the 8-year-old who loved to play silly policeman, went to the beach with a big bucket and a spade. Tom's giggles filled the air as he started to sculpt a giant sand castle. Each scoop of sand was a chance for him to save the day in pretend play, making 'nee-naw' siren noises as he worked."
//     },
//     {
//       "text": "The towers soared high, and the walls were wide. He imagined himself protecting the castle from the waves like a brave officer would defend their town. Suddenly, Tom noticed a boy wearing a bright yellow hat, building a sand airplane. 'Hi! I'm Alastair!' the boy said with a happy grin, 'I love flying!'"
//     },
//     {
//       "text": "Alastair's airplane looked like it could really soar across the sand. Tom invited him over, and together they decided that the sand airplane needed a sand airport next to the castle. They worked as a team, Tom with his detailed police strategies and Alastair with his joyous laughter, adding joy to their labor."
//     },
//     {
//       "text": "The beach was alive with the children’s creativity. A runway perfectly aligned with the castle was built. They even added tiny sand luggage and a control tower. Tom felt proud of his castle and grateful for his new friend. As the sun started to set, their creations glowed under the golden light."
//     },
//     {
//       "text": "Time flew by quickly, and it was almost time to go home. 'Let’s meet again and build something even bigger!' Alastair offered. Tom nodded eagerly. As they left the beach, their sandy hands bore the evidence of a day filled with adventure and friendship, and the shoreline held the tale of their joyous play."
//     }
//   ],
//   "title": "The Silly Policeman and the Happy Flyer",
//   "teaser": "Join Tom, the eight-year-old silly policeman, as he embarks on a sand castle adventure at the beach. Discover what happens when he meets Alastair, the happy boy with a sand airplane, and how their friendship and imagination take flight in a world of sandy possibilities!",
//   "comprehension_questions": [
//     {
//       "question": "What did Tom decide to build on the beach?",
//       "answer": "Tom decided to build a giant sand castle on the beach."
//     },
//     {
//       "question": "What did Alastair build and why was he happy?",
//       "answer": "Alastair built a sand airplane because he loved flying, and this made him happy."
//     },
//     {
//       "question": "How did Tom and Alastair work together on the beach?",
//       "answer": "Tom and Alastair worked together by building a sand airport next to the castle, complementing Tom's sand castle with Alastair's sand airplane."
//     },
//     {
//       "question": "What did Tom and Alastair plan as they were leaving the beach?",
//       "answer": "Tom and Alastair planned to meet again and build something even bigger."
//     }
//   ],
//   "images": [
//     {
//       "page": 0,
//       "img_url": "https://playtandemstorage.blob.core.windows.net/tandem-images/e3539464-8ee0-4b7a-81f9-264f7c76a1da/<built-in function id>_cover.webp?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2030-12-21T17:21:44Z&st=2023-12-21T09:21:44Z&spr=https&sig=aLh0WyHnXUpaNhjYVyNdLQFjS3FjBusKSDglmElWPzk%3D"
//     },
//     {
//       "page": 1,
//       "img_url": "https://playtandemstorage.blob.core.windows.net/tandem-images/e3539464-8ee0-4b7a-81f9-264f7c76a1da/e3539464-8ee0-4b7a-81f9-264f7c76a1da_1.webp?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2030-12-21T17:21:44Z&st=2023-12-21T09:21:44Z&spr=https&sig=aLh0WyHnXUpaNhjYVyNdLQFjS3FjBusKSDglmElWPzk%3D"
//     },
//     {
//       "page": 2,
//       "img_url": "https://playtandemstorage.blob.core.windows.net/tandem-images/e3539464-8ee0-4b7a-81f9-264f7c76a1da/e3539464-8ee0-4b7a-81f9-264f7c76a1da_2.webp?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2030-12-21T17:21:44Z&st=2023-12-21T09:21:44Z&spr=https&sig=aLh0WyHnXUpaNhjYVyNdLQFjS3FjBusKSDglmElWPzk%3D"
//     },
//     {
//       "page": 3,
//       "img_url": "https://playtandemstorage.blob.core.windows.net/tandem-images/e3539464-8ee0-4b7a-81f9-264f7c76a1da/e3539464-8ee0-4b7a-81f9-264f7c76a1da_3.webp?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2030-12-21T17:21:44Z&st=2023-12-21T09:21:44Z&spr=https&sig=aLh0WyHnXUpaNhjYVyNdLQFjS3FjBusKSDglmElWPzk%3D"
//     },
//     {
//       "page": 4,
//       "img_url": "https://playtandemstorage.blob.core.windows.net/tandem-images/e3539464-8ee0-4b7a-81f9-264f7c76a1da/e3539464-8ee0-4b7a-81f9-264f7c76a1da_4.webp?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2030-12-21T17:21:44Z&st=2023-12-21T09:21:44Z&spr=https&sig=aLh0WyHnXUpaNhjYVyNdLQFjS3FjBusKSDglmElWPzk%3D"
//     },
//     {
//       "page": 5,
//       "img_url": "https://playtandemstorage.blob.core.windows.net/tandem-images/e3539464-8ee0-4b7a-81f9-264f7c76a1da/e3539464-8ee0-4b7a-81f9-264f7c76a1da_5.webp?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2030-12-21T17:21:44Z&st=2023-12-21T09:21:44Z&spr=https&sig=aLh0WyHnXUpaNhjYVyNdLQFjS3FjBusKSDglmElWPzk%3D"
//     }
//   ],
//   "usage": [
//     {
//       "usage_info": {
//         "prompt_tokens": 313,
//         "completion_tokens": 674,
//         "total_tokens": 987,
//         "model": "gpt-4-1106-preview",
//         "cost_per_token_prompt": 1e-5,
//         "cost_per_token_completion": 2.9999999999999997e-5,
//         "total_cost": 0.02335,
//         "tag": "txt_story"
//       },
//       "execution_time": 46.93930244445801,
//       "function": "gpt_json"
//     },
//     {
//       "usage_info": {},
//       "execution_time": 47.27254056930542,
//       "function": "call_story_generation_api"
//     },
//     {
//       "usage_info": {
//         "prompt_tokens": 0,
//         "completion_tokens": 1,
//         "total_tokens": 1,
//         "model": "dall-e-3-sd-rectangle",
//         "cost_per_token_prompt": 0.0,
//         "cost_per_token_completion": 8e-5,
//         "total_cost": 8e-5,
//         "tag": "img_thumbnail"
//       },
//       "execution_time": 12.738196611404419,
//       "function": "generate_image"
//     },
//     {
//       "usage_info": {},
//       "execution_time": 2.7352731227874756,
//       "function": "download_and_upload_images"
//     },
//     {
//       "usage_info": {},
//       "execution_time": 15.807722806930542,
//       "function": "call_thumbnail_generation_api"
//     },
//     {
//       "usage_info": {
//         "prompt_tokens": 524,
//         "completion_tokens": 191,
//         "total_tokens": 715,
//         "model": "gpt-4-1106-preview",
//         "cost_per_token_prompt": 1e-5,
//         "cost_per_token_completion": 2.9999999999999997e-5,
//         "total_cost": 0.01097,
//         "tag": "txt_story_to_pages"
//       },
//       "execution_time": 20.009557723999023,
//       "function": "gpt_json"
//     },
//     {
//       "usage_info": {},
//       "execution_time": 2.956139087677002,
//       "function": "download_and_upload_images"
//     },
//     {
//       "usage_info": {},
//       "execution_time": 2.552712917327881,
//       "function": "download_and_upload_images"
//     },
//     {
//       "usage_info": {},
//       "execution_time": 2.943408250808716,
//       "function": "download_and_upload_images"
//     },
//     {
//       "usage_info": {},
//       "execution_time": 2.9834377765655518,
//       "function": "download_and_upload_images"
//     },
//     {
//       "usage_info": {},
//       "execution_time": 2.9502463340759277,
//       "function": "download_and_upload_images"
//     },
//     {
//       "usage_info": {},
//       "execution_time": 77.74505734443665,
//       "function": "call_image_generation_api"
//     }
//   ],
//   "id": "e3539464-8ee0-4b7a-81f9-264f7c76a1da"
// }
