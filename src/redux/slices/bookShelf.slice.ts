import {createSlice} from '@reduxjs/toolkit';
import {StoryData} from '@tandem/api/getStories/interface';

interface BookShelf {
  books: StoryData[];
  images: {[bookId: string]: string[]};
}
const initialState: BookShelf = {books: [], images: {}};

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
  setImagesForBook,
  removeLatestBook,
  clearbookShelf,
  addBooks,
  rateBookLocally,
} = bookShelf.actions;

export default bookShelf.reducer;
