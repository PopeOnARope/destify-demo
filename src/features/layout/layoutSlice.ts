import {  createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface LayoutState {
  sideMenuOpen: boolean;
}

const initialState: LayoutState = {
  sideMenuOpen: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleSideMenu: (state) => {
      state.sideMenuOpen = !state.sideMenuOpen;
    },
  },
});

export const { toggleSideMenu } = layoutSlice.actions;

export const selectLayout = (state: RootState) => state.layout;

export default layoutSlice.reducer;
