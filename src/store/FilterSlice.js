import { createSlice } from "@reduxjs/toolkit";

const FilterSlice = createSlice({
  name: "filter",
  initialState: {
    filteredProducts: [],
    active: 1,
    filters: {
      colors: [],
      sizes: [],
      performanceFeatures: [],
      fabrics: [],
      stretchLevel: [],
      occasions: [],
      prices: [],
    },
    imgBaseURL: "http://127.0.0.1:8000/media/",
    // imgBaseURL: "http://tailorapi.broaderai.com/media/",
  },
  reducers: {
    setFilters: (state, action) => {
      const updatedFilters = state.filters
      const { filterType, value } = action.payload;
      const index = updatedFilters[filterType].indexOf(value);
      if (index === -1) {
        // Value not in filters, add it
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      } else {
        // Value already in filters, remove it
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          (item) => item !== value
        );
      }

      state.filters = updatedFilters
    },
    resetFilters: (state,action) => {
      state.filters = {
        colors: [],
        sizes: [],
        performanceFeatures: [],
        fabrics: [],
        stretchLevel: [],
        occasions: [],
        prices: [],
      }
    },
    setFilteredProducts: (state, action) => {
        state.filteredProducts = action.payload
    },
    setActive: (state, action) => {
      state.active = action.payload
    }
  },
});

export const { setFilters, setFilteredProducts, resetFilters, setActive } = FilterSlice.actions;
export default FilterSlice.reducer;
