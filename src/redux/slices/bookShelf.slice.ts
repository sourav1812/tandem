import {createSlice} from '@reduxjs/toolkit';
import Book from '@tandem/api/getStories/interface';

interface BookShelf {
  books: Book[];
}
const initialState: BookShelf = {books: []};

export const bookShelf = createSlice({
  name: 'bookShelf',
  initialState,
  reducers: {
    // push a new book
    addNewBook: (state, action) => {
      const isBookAlreadyAdded = state.books.findIndex(
        book => book?.bookId === action.payload?.bookId,
      );
      if (isBookAlreadyAdded !== -1) {
        console.log('this book already exists');
        return;
      }
      state.books.push(action.payload);
    },
    removeLatestBook: state => {
      state.books.pop();
    },
    clearbookShelf: state => {
      state.books = [];
    },
    setImageForPage: (state, action) => {
      const {bookIndex, pageIndex, image} = action.payload;
      if (bookIndex === -1) {
        return;
      }
      state.books[bookIndex].pages[pageIndex].image = image;
    },
  },
});

export const {addNewBook, removeLatestBook, clearbookShelf, setImageForPage} =
  bookShelf.actions;

export default bookShelf.reducer;
