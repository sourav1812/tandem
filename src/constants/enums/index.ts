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
