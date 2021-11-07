import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "../../services/categoriesService";

export const rootCategoryId = -1;

const slice = createSlice({
  name: "categories",
  initialState: [],
  reducers: {
    categoriesLoadded: (categories, action) => {
      return action.payload;
    },

    categoryAdded: (categories, action) => {
      const { newCategory, fatherId } = action.payload;

      if (fatherId === rootCategoryId) {
        categories.push(newCategory);

        return;
      }

      for (const category of categories) {
        const children = getChildren(fatherId, category);
        if (children) {
          children.push(newCategory);

          return;
        }
      }
    },

    categoryUpdated: (categories, action) => {
      const { updatedCategory } = action.payload;
      for (const category of categories) {
        const father = getCategoryFather(updatedCategory.id, category);
        if (father !== null) {
          const index = father.children.findIndex(
            (c) => c.id === updatedCategory.id
          );

          const children = father.children[index].children;
          updatedCategory.children = children;

          father.children[index] = updatedCategory;

          return;
        }
      }

      const index = categories.findIndex((c) => c.id === updatedCategory.id);
      if (index !== -1) {
        updatedCategory.children = categories[index].children;
        categories[index] = updatedCategory;
      }
    },

    categoryRemoved: (categories, action) => {
      const { cateId } = action.payload;

      for (const category of categories) {
        const father = getCategoryFather(cateId, category);

        if (father !== null) {
          const index = father.children.findIndex((c) => c.id === cateId);

          father.children.splice(index, 1);

          return;
        }
      }

      const index = categories.findIndex((c) => c.id === cateId);
      if (index !== -1) {
        categories.splice(index, 1);
      }
    },
  },
});

export default slice.reducer;

const { categoriesLoadded, categoryAdded, categoryUpdated, categoryRemoved } =
  slice.actions;

export const loadCategories = () => async (dispatch, getState) => {
  const categories = await getAllCategories();
  dispatch(categoriesLoadded(categories));
};

export const addCategoryToEntities =
  (newCategory, fatherId) => (dispatch, getState) => {
    dispatch(categoryAdded({ newCategory, fatherId }));
  };

export const updateCategoryToEntities =
  (updatedCategory) => (dispatch, getState) => {
    dispatch(categoryUpdated({ updatedCategory }));
  };

export const removeCategoryToEntities = (cateId) => (dispatch, getState) => {
  dispatch(categoryRemoved({ cateId }));
};

//selectors

export const hasChildren = (cateId) =>
  createSelector(
    (state) => state.entities.categories,
    (categories) => {
      if (cateId === rootCategoryId) return false;

      const children = getChildrenOfCategories(cateId, categories);
      if (children === null) return false;

      if (children.length === 0) return false;

      return true;
    }
  );

export const getAllLeaf = createSelector(
  (state) => state.entities.categories,
  (categories) => {
    let leafs = [];

    for (const category of categories) {
      leafs = [...leafs, ...getLeafs(category)];
    }

    return leafs;
  }
);

export const getPath = (cateId) =>
  createSelector(
    (state) => state.entities.categories,
    (categories) => {
      if (cateId === null) return null;
      for (const category of categories) {
        const path = getPathOfCate(cateId, category);
        if (path) return path;
      }

      return null;
    }
  );

//helper

export const getChildrenOfCategories = (cateId, categories) => {
  for (const category of categories) {
    const children = getChildren(cateId, category);
    if (children) {
      return children;
    }
  }

  return null;
};

export const getChildren = (cateId, rootCategory) => {
  if (rootCategory.id === cateId) return rootCategory.children;

  for (let i = 0; i < rootCategory.children.length; i++) {
    const child = rootCategory.children[i];
    const result = getChildren(cateId, child);
    if (result !== null) return result;
  }

  return null;
};

export const getCategoryFather = (cateId, rootCategory) => {
  if (rootCategory.children.map((c) => c.id).includes(cateId))
    return rootCategory;

  for (let i = 0; i < rootCategory.children.length; i++) {
    const child = rootCategory.children[i];
    const result = getCategoryFather(cateId, child);
    if (result !== null) return result;
  }

  return null;
};

const getLeafs = (category) => {
  if (category.children.length === 0) return [category];

  let leafs = [];
  for (const child of category.children) {
    leafs = [...leafs, ...getLeafs(child)];
  }

  return leafs;
};

const getPathOfCate = (cateId, rootCategory) => {
  if (cateId === rootCategory.id.toString()) {
    return [rootCategory];
  }

  for (const child of rootCategory.children) {
    const path = getPathOfCate(cateId, child);
    if (path) return [rootCategory, ...path];
  }

  return null;
};
