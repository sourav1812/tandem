export interface UserAnalyticsData {
  eventType: UsersAnalyticsEvents;
  details: object;
}
export enum UsersAnalyticsEvents {
  APP_OPENED = 'app.opened',
  APP_CLOSED = 'app.closed',
  BOOK_CREATED = 'book.created',
  BOOK_OPENED = 'book.opened',
  BOOK_END_REACHED = 'book.finished',
  BOOKSHELF_VISITED = 'bookshelf.visited',
  BOOK_REQUESTED = 'book.requested',
  SEND_TO_ROBOT = 'sendToRobot.clicked',
  COMPREHENSION_QUESTIONS_VISITED = 'comprehensionQuestions.visited',
  CONVERSATION_STARTERS_VISITED = 'conversationStarters.visited',
}
