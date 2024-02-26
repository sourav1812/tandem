import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';

export default async (bookId: string) => {
  try {
    await post({
      path: API.MARK_BOOK_AS_READ + `/${bookId}`,
      data: {read: true},
    });
  } catch (error) {
    throw error;
  }
};
