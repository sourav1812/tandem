import {createSlice} from '@reduxjs/toolkit';
import {StoryData} from '@tandem/api/getStories/interface';

interface BookShelf {
  books: StoryData[];
}
const initialState: BookShelf = {books: []};

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
      const {bookIndex, images} = action.payload;
      state.books[bookIndex].images = images;
    },
  },
});

export const {
  // addNewBook,
  setImagesForBook,
  removeLatestBook,
  clearbookShelf,
  addBooks,
} = bookShelf.actions;

export default bookShelf.reducer;
