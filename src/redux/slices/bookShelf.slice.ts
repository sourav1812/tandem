import {createSlice} from '@reduxjs/toolkit';
import {StoryData} from '@tandem/api/getStories/interface';

interface BookShelf {
  books: StoryData[];
  images: {[bookId: string]: string[]};
  thumbnails: {[nameUrl: string]: string};
}
const initialState: BookShelf = {books: [], images: {}, thumbnails: {}};

export const bookShelf = createSlice({
  name: 'bookShelf',
  initialState,
  reducers: {
    // push a new book
    // addNewBook: (state, action) => {
    //   const isBookAlreadyAdded = state.books.findIndex(
    //     book => book?.bookId === action.payload?.bookId,
    //   );
    //   if (isBookAlreadyAdded !== -1) {
    //     console.log('this book already exists');
    //     return;
    //   }
    //   state.books.push(action.payload);
    // },
    addBooks: (state, action) => {
      state.books = action.payload;
    },
    removeLatestBook: state => {
      state.books.pop();
    },
    clearbookShelf: state => {
      state.books = [];
    },
    setImagesForBook: (state, action) => {
      const {bookId, images} = action.payload;
      state.images[bookId] = images;
    },
    setThumbnailForBook: (state, action) => {
      const {url, image} = action.payload;
      state.thumbnails[url] = image;
    },
    renewImages: (state, action) => {
      state.images = action.payload;
    },
    renewThumbnails: (state, action) => {
      state.thumbnails = action.payload;
    },
    rateBookLocally: (state, action) => {
      const {bookIndex, rating} = action.payload;
      state.books[bookIndex].ratingInfo.push({
        _id: state.books[bookIndex]._id + 'rating',
        bookId: state.books[bookIndex]._id,
        userId: state.books[bookIndex].userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
        storyRating: rating,
      });
    },
  },
});

export const {
  // addNewBook,
  setThumbnailForBook,
  setImagesForBook,
  removeLatestBook,
  clearbookShelf,
  addBooks,
  rateBookLocally,
  renewImages,
  renewThumbnails,
} = bookShelf.actions;

export default bookShelf.reducer;
