import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "./../services/categoriesService";

const slice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    categoriesLoadded: (categories, action) => {
      return action.payload;
    },
  },
});

const { categoriesLoadded } = slice.actions;

export const loadCategories = () => async (dispatch, getState) => {
  const categories = await getAllCategories();
  dispatch(categoriesLoadded(categories));
};

//helper
export const getChildren = (cateId, rootCategory) => {
  if (rootCategory.id === cateId) return rootCategory.children;

  for (let i = 0; i < rootCategory.children.length; i++) {
    const child = rootCategory.children[i];
    const result = getChildren(cateId, child);
    if (result !== null) return result;
  }

  return null;
};

export default slice.reducer;
