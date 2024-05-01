import {API} from '@tandem/constants/api';
import {post} from '@tandem/api/index';

const reportImage = async ({
  bookId,
  page,
  reason,
}: {
  bookId: string;
  page: number;
  reason: string;
}) => {
  const response = await post({
    path: API.REPORT_IMAGE.replace('{BOOK_ID_HERE}', bookId),
    data: {page, reason},
  });
  console.log('response from reporting image', {response});
  return response;
};

export default reportImage;
