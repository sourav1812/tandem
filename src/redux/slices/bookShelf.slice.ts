import {createSlice} from '@reduxjs/toolkit';
import {StoryData} from '@tandem/api/getStories/interface';

interface BookShelf {
  books: StoryData[];
  images: {[bookId: string]: string[]};
  activePageNumber: number;
  readingProgress: {[bookId: string]: number};
}
const initialState: BookShelf = {
  books: [],
  images: {},
  activePageNumber: -1,
  readingProgress: {},
};

export const bookShelf = createSlice({
  name: 'bookShelf',
  initialState,
  reducers: {
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
    renewImages: (state, action) => {
      state.images = action.payload;
    },
    updatePage: (state, action) => {
      state.activePageNumber = action.payload;
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
    updateReadingProgress: (state, action) => {
      const {bookId, progress} = action.payload;
      console.log({bookId, progress});
      if (progress <= state.readingProgress?.[bookId]) {
        // only update the max progress
        return;
      }
      if (!state.readingProgress) {
        state.readingProgress = {};
      }
      state.readingProgress[bookId] = progress;
    },
  },
});

export const {
  updateReadingProgress,
  setImagesForBook,
  removeLatestBook,
  clearbookShelf,
  addBooks,
  rateBookLocally,
  renewImages,
  updatePage,
} = bookShelf.actions;

export default bookShelf.reducer;
