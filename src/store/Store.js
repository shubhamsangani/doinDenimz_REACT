import { configureStore } from '@reduxjs/toolkit'
import Slice from './Slice'
import APISlice from './APISlice'
import FilterSlice from './FilterSlice'

const store = configureStore({
  reducer: {
    denim: Slice,
    API: APISlice,
    filter: FilterSlice,
  }
})

export default store