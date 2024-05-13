import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';

export default async (bookId: string, archive: boolean) => {
  try {
    await post({
      path: API.MARK_BOOK_AS_ARCHIVED + `/${bookId}`,
      data: {archive},
    });
  } catch (error) {
    throw error;
  }
};
