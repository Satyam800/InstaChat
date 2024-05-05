import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from "../slice/authSlice"
import postSlice from '../slice/postSlice'
export const store = configureStore({
  reducer: {
    auth:AuthSlice,
    post:postSlice
  },

})