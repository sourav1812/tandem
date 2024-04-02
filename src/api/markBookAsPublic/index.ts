import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';

export default async (bookId: string, isPubliclyAvailable: boolean) => {
  try {
    await post({
      path: API.MARK_BOOK_AS_PUBLIC + `/${bookId}`,
      data: {isPubliclyAvailable},
    });
  } catch (error) {
    throw error;
  }
};
