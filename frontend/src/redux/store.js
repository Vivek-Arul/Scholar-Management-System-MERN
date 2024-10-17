import { configureStore } from '@reduxjs/toolkit';
import scholarReducer from './reducers/scholarReducer';

const store = configureStore({
  reducer: {
    scholarReducer,
  },
});
  
export default store;