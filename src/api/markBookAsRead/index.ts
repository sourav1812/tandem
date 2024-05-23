import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';
interface ReadingStatus {
  solo?: boolean;
  tandem?: boolean;
}
export default async (bookId: string, readingStatus: ReadingStatus) => {
  try {
    await post({
      path: API.MARK_BOOK_AS_READ + `/${bookId}`,
      data: {readingStatus},
    });
  } catch (error) {
    throw error;
  }
};
