import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: "en",
    toggleDropdownHeader: false,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
    },
    toggleUserDropdown: (state) => {
      state.toggleDropdownHeader = !state.toggleDropdownHeader;
    },
  },
});
export const { changeLanguage, toggleUserDropdown } = configSlice.actions;
export default configSlice.reducer;
