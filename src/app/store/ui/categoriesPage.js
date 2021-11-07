import { createSlice } from "@reduxjs/toolkit";
import {
  addCategoryToEntities,
  getChildren,
  removeCategoryToEntities,
  updateCategoryToEntities,
} from "../entities/categories";
import {
  createCategory,
  deleteCategory,
  updateCategory as updateCategoryService,
} from "../../services/categoriesService";

const idColumnField = "idCol";
const nameColumnField = "nameCol";
export const statusColumnField = "statusCol";
export const updateColumnField = "updateCol";
export const buttonExpandColumnField = "buttonExpandCol";

const idColumnWidth = 70;
const nameColumnWidth = 200;
const statusColumnWidth = 100;
const updateColWidth = 100;
const buttonExpandColumnWidth = 100;

const getGridColumnWidth = () => {
  return (
    idColumnWidth +
    nameColumnWidth +
    statusColumnWidth +
    updateColWidth +
    buttonExpandColumnWidth +
    50
  );
};

const cateGridColumns = [
  { field: idColumnField, headerName: "Id", width: idColumnWidth },
  { field: nameColumnField, headerName: "Name", width: nameColumnWidth },
  {
    field: statusColumnField,
    headerName: "Status",
    width: statusColumnWidth,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: updateColumnField,
    headerName: "Detail",
    width: updateColWidth,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: buttonExpandColumnField,
    headerName: "",
    width: buttonExpandColumnWidth,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
];

const slice = createSlice({
  name: "categoriesPage",
  initialState: {
    isInitialized: false,
    resentGridRow: -1,
    mainGrid: {
      columns: [],
      row: {
        id: 0,
      },
    },
  },
  reducers: {
    gridInitialized: (page, action) => {
      const categories = action.payload;
      const mainGrid = page.mainGrid;

      if (categories.length > 0) {
      }

      const firstColumn = `0`;
      const gridColumn = {
        field: firstColumn,
        headerName: "",
        sortable: false,
        width: getGridColumnWidth(),
      };
      const gridRow = mainGrid.row;

      const firstCell = {
        columns: [...cateGridColumns],
        rows: [],
        fatherId: -1,
      };
      categories.forEach((c) => {
        firstCell.rows.push({
          id: c.id,
          [idColumnField]: c.id,
          [nameColumnField]: c.name,
          [statusColumnField]: c.status,
          [buttonExpandColumnField]: false,
        });
      });

      mainGrid.columns.push(gridColumn);
      gridRow[firstColumn] = firstCell;

      page.isInitialized = true;
      page.resentGridRow = 0;
    },
    categoryExpanded: (page, action) => {
      const { children, mainColumnIndex, cateRowIndex, fatherId } =
        action.payload;
      const mainGrid = page.mainGrid;

      const columnField = mainGrid.columns[mainColumnIndex].field;
      const cateGrid = mainGrid.row[columnField];

      for (let i = 0; i < cateGrid.rows.length; i++) {
        const row = cateGrid.rows[i];
        if (i === cateRowIndex) row[buttonExpandColumnField] = true;
        else row[buttonExpandColumnField] = false;
      }

      const newcolumnField = `${mainColumnIndex + 1}`;
      const newGridColumn = {
        field: newcolumnField,
        headerName: "",
        sortable: false,
        width: getGridColumnWidth(),
      };
      const gridRow = mainGrid.row;

      const newCateGrid = {
        columns: [...cateGridColumns],
        rows: [],
        fatherId: fatherId,
      };

      children.forEach((c) => {
        newCateGrid.rows.push({
          id: c.id,
          [idColumnField]: c.id,
          [nameColumnField]: c.name,
          [statusColumnField]: c.status,
          [buttonExpandColumnField]: false,
        });
      });

      mainGrid.columns = mainGrid.columns.slice(0, mainColumnIndex + 1);

      mainGrid.columns.push(newGridColumn);
      gridRow[newcolumnField] = newCateGrid;
    },
    categoryNarrowed: (page, action) => {
      const { mainColumnIndex, cateRowIndex } = action.payload;
      const mainGrid = page.mainGrid;

      const columnField = mainGrid.columns[mainColumnIndex].field;
      const cateGrid = mainGrid.row[columnField];

      cateGrid.rows[cateRowIndex][buttonExpandColumnField] = false;

      mainGrid.columns = mainGrid.columns.slice(0, mainColumnIndex + 1);
    },
    categoryAdded: (page, action) => {
      const { mainColumnIndex, newCategory: category } = action.payload;

      const mainGrid = page.mainGrid;

      const columnField = mainGrid.columns[mainColumnIndex].field;
      const cateGrid = mainGrid.row[columnField];

      cateGrid.rows.push({
        id: category.id,
        [idColumnField]: category.id,
        [nameColumnField]: category.name,
        [statusColumnField]: category.status,
        [buttonExpandColumnField]: false,
      });
    },
    statusChanged: (page, action) => {
      const { mainColumnIndex, cateRowIndex, newStatus } = action.payload;

      const mainGrid = page.mainGrid;

      const columnField = mainGrid.columns[mainColumnIndex].field;
      const cateGrid = mainGrid.row[columnField];

      cateGrid.rows[cateRowIndex][statusColumnField] = newStatus;
    },
    categoryUpdated: (page, action) => {
      const { mainColumnIndex, cateRowIndex, updatedCategory } = action.payload;

      const mainGrid = page.mainGrid;

      const columnField = mainGrid.columns[mainColumnIndex].field;
      const cateGrid = mainGrid.row[columnField];

      cateGrid.rows[cateRowIndex] = {
        id: updatedCategory.id,
        [idColumnField]: updatedCategory.id,
        [nameColumnField]: updatedCategory.name,
        [statusColumnField]: updatedCategory.status,
        [buttonExpandColumnField]:
          cateGrid.rows[cateRowIndex][buttonExpandColumnField],
      };
    },
    categoryRemoved: (page, action) => {
      const { mainColumnIndex, cateRowIndex } = action.payload;

      const mainGrid = page.mainGrid;

      const columnField = mainGrid.columns[mainColumnIndex].field;
      const cateGrid = mainGrid.row[columnField];

      const cateRows = cateGrid.rows;
      cateRows.splice(cateRowIndex, 1);
    },
  },
});

const {
  gridInitialized,
  categoryExpanded,
  categoryNarrowed,
  categoryAdded,
  statusChanged,
  categoryUpdated,
  categoryRemoved,
} = slice.actions;

export const initializeGird = () => async (dispatch, getState) => {
  const categories = [...getState().entities.categories];
  dispatch(gridInitialized(categories));
};

export const expandCategory = (cateId) => (dispatch, getState) => {
  const mainGrid = getState().ui.categoriesPage.mainGrid;
  const categories = getState().entities.categories;
  const mainIndex = getIndexOfCateInGrid(cateId, mainGrid);

  if (mainIndex === null) return;

  const { mainColumnIndex, cateRowIndex } = mainIndex;

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const cateChildren = getChildren(cateId, category);

    if (cateChildren !== null) {
      dispatch(
        categoryExpanded({
          children: cateChildren,
          mainColumnIndex,
          cateRowIndex,
          fatherId: cateId,
        })
      );
      return;
    }
  }
};

export const narrowCategory = (cateId) => (dispatch, getState) => {
  const mainGrid = getState().ui.categoriesPage.mainGrid;
  const mainIndex = getIndexOfCateInGrid(cateId, mainGrid);

  if (mainIndex === null) return;

  const { mainColumnIndex, cateRowIndex } = mainIndex;

  dispatch(categoryNarrowed({ mainColumnIndex, cateRowIndex }));
};

export const addCategory =
  (fatherId, category) => async (dispatch, getState) => {
    const mainGrid = getState().ui.categoriesPage.mainGrid;

    let mainIndex = getIndexOfCateInGrid(fatherId, mainGrid);

    if (mainIndex === null) {
      mainIndex = { mainColumnIndex: -1 };
    }

    const mainColumnIndex = mainIndex.mainColumnIndex + 1;

    const newCategory = await createCategory(category);

    dispatch(addCategoryToEntities(newCategory, fatherId));
    dispatch(categoryAdded({ mainColumnIndex, newCategory }));
  };

export const changeStatus = (cateId, newStatus) => (dispatch, getState) => {
  const mainGrid = getState().ui.categoriesPage.mainGrid;

  const mainIndex = getIndexOfCateInGrid(cateId, mainGrid);

  if (mainIndex === null) return;

  const { mainColumnIndex, cateRowIndex } = mainIndex;

  dispatch(statusChanged({ mainColumnIndex, cateRowIndex, newStatus }));
};

export const updateCategory = (category) => async (dispatch, getState) => {
  const mainGrid = getState().ui.categoriesPage.mainGrid;

  const mainIndex = getIndexOfCateInGrid(category.id, mainGrid);

  if (mainIndex === null) return;

  const updatedCategory = await updateCategoryService(category);

  const { mainColumnIndex, cateRowIndex } = mainIndex;

  dispatch(updateCategoryToEntities(updatedCategory));
  dispatch(categoryUpdated({ mainColumnIndex, cateRowIndex, updatedCategory }));
};

export const removeCategory = (cateId) => async (dispatch, getState) => {
  const mainGrid = getState().ui.categoriesPage.mainGrid;

  const mainIndex = getIndexOfCateInGrid(cateId, mainGrid);

  if (mainIndex === null) return;

  const { mainColumnIndex, cateRowIndex } = mainIndex;

  await deleteCategory(cateId);

  dispatch(removeCategoryToEntities(cateId));
  dispatch(categoryNarrowed({ mainColumnIndex, cateRowIndex }));
  dispatch(categoryRemoved({ mainColumnIndex, cateRowIndex, cateId }));
};

//helper
export const getIndexOfCateInGrid = (cateId, mainGrid) => {
  const gridColumns = mainGrid.columns;
  const gridRow = mainGrid.row;

  for (let i = 0; i < gridColumns.length; i++) {
    const column = gridColumns[i];

    const cateGrid = gridRow[column.field];
    const rowIndexOfCate = cateGrid.rows.findIndex((row) => row.id === cateId);

    if (rowIndexOfCate !== -1) {
      return {
        mainColumnIndex: i,
        cateRowIndex: rowIndexOfCate,
      };
    }
  }

  return null;
};

export default slice.reducer;
