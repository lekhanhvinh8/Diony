import { createSlice } from "@reduxjs/toolkit";
import { getSelectProperties } from "./../entities/selectProperties";

const selectPropIdColumnField = "selectPropIdCol";
const selectPropNameColumnField = "selectPropNameCol";
export const selectPropIsRequiredColumnField = "selectPropIsRequiredCol";
export const selectPropHasMultiValuesColumnField = "selectPropHasMulValuesCol";
export const selectPropCateIdsColumnField = "selectPropCateIdCol";
export const selectPropValuesColumnField = "selectPropValuesCol";
export const selectPropEditColumnField = "selectPropEditCol";
export const selectPropDeleteColumnField = "selectPropDeleteCol";

const typingPropIdColumnField = "typingPropIdCol";
const typingPropNameColumnField = "typingPropNameCol";
export const typingPropTypeColumnField = "typingPropTypeCol";
export const typingPropCateIdsColumnField = "typingPropCateIdsCol";
export const typingPropEditColumnField = "typingPropEditCol";
export const typingPropDeleteColumnField = "typingPropDeleteCol";

const selectPropIdColumnWidth = 70;
const selectPropNameColumnWidth = 200;
const selectPropIsRequiredColumnWidth = 120;
const selectPropHasMultiValuesColumnWidth = 120;
const selectPropCateIdsColumnWidth = 120;
const selectPropValuesColumnWidth = 120;
const selectPropEditColumnWidth = 120;
const selectPropDeleteColumnWidth = 100;

const typingPropIdColumnWidth = 70;
const typingPropNameColumnWidth = 200;
const typingPropTypeColumnWidth = 150;
const typingPropCateIdsColumnWidth = 150;
const typingPropEditColumnWidth = 150;
const typingPropDeleteColumnWidth = 100;

export const selectPropTab = "1";
export const typingPropTab = "2";

const initialSelectPropertiesColumns = [
  {
    field: selectPropIdColumnField,
    headerName: "Id",
    width: selectPropIdColumnWidth,
    align: "center",
  },
  {
    field: selectPropNameColumnField,
    headerName: "Tên thuộc tính",
    width: selectPropNameColumnWidth,
  },
  {
    field: selectPropIsRequiredColumnField,
    headerName: "Bắt buộc",
    width: selectPropIsRequiredColumnWidth,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
  },
  {
    field: selectPropHasMultiValuesColumnField,
    headerName: "Loại",
    width: selectPropHasMultiValuesColumnWidth,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
  },
  {
    field: selectPropCateIdsColumnField,
    headerName: "Danh mục",
    width: selectPropCateIdsColumnWidth,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
  },
  {
    field: selectPropValuesColumnField,
    headerName: "Giá trị",
    width: selectPropValuesColumnWidth,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
  },
  {
    field: selectPropEditColumnField,
    headerName: "Cập nhật",
    width: selectPropEditColumnWidth,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
  },
  {
    field: selectPropDeleteColumnField,
    headerName: "",
    width: selectPropDeleteColumnWidth,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
  },
];

const initialTypingPropertiesColumns = [
  {
    field: typingPropIdColumnField,
    headerName: "Id",
    width: typingPropIdColumnWidth,
    align: "center",
  },
  {
    field: typingPropNameColumnField,
    headerName: "Tên",
    width: typingPropNameColumnWidth,
  },
  {
    field: typingPropTypeColumnField,
    headerName: "Loại",
    width: typingPropTypeColumnWidth,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: typingPropCateIdsColumnField,
    headerName: "Danh mục",
    width: typingPropCateIdsColumnWidth,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
  },
  {
    field: typingPropEditColumnField,
    headerName: "Cập nhật",
    width: typingPropEditColumnWidth,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
  },
  {
    field: typingPropDeleteColumnField,
    headerName: "",
    width: typingPropDeleteColumnWidth,
    sortable: false,
    disableColumnMenu: true,
    align: "center",
  },
];

const slice = createSlice({
  name: "propertiesPage",
  initialState: {
    resentTab: selectPropTab,
    cateValue: null,
    selectPropertyGrid: {
      rows: [],
      columns: initialSelectPropertiesColumns,
    },
    typingPropertyGrid: {
      rows: [],
      columns: initialTypingPropertiesColumns,
    },
  },
  reducers: {
    selectPropGridInitialized: (page, action) => {
      const properties = action.payload;
      const selectPropsGrid = page.selectPropertyGrid;
      const rows = [];

      for (const property of properties) {
        rows.push({
          id: property.id,
          [selectPropIdColumnField]: property.id,
          [selectPropNameColumnField]: property.name,
          [selectPropIsRequiredColumnField]: property.isRequired,
          [selectPropHasMultiValuesColumnField]: property.hasMultiValues,
          [selectPropCateIdsColumnField]: property.categoryIDs,
        });
      }

      selectPropsGrid.rows = rows;
    },

    typingPropGridInitialized: (page, action) => {
      const properties = action.payload;
      const typingPropsGrid = page.typingPropertyGrid;
      const rows = [];

      for (const property of properties) {
        rows.push({
          id: property.id,
          [typingPropIdColumnField]: property.id,
          [typingPropNameColumnField]: property.name,
          [typingPropTypeColumnField]: property.type,
          [typingPropCateIdsColumnField]: property.categoryIDs,
        });
      }

      typingPropsGrid.rows = rows;
    },

    tabSelected: (page, action) => {
      const newTabValue = action.payload;
      page.resentTab = newTabValue;
    },

    cateValueSet: (page, action) => {
      const newCateValue = action.payload;
      page.cateValue = newCateValue;
    },
  },
});

export default slice.reducer;

const {
  selectPropGridInitialized,
  typingPropGridInitialized,
  tabSelected,
  cateValueSet,
} = slice.actions;

//action creators

export const initializeSelectPropGrid = () => async (dispatch, getState) => {
  const selectProperties = getSelectProperties(getState());
  dispatch(selectPropGridInitialized(selectProperties));
};

export const initializeSelectPropGridOfCate =
  (cateId) => async (dispatch, getState) => {
    const selectProperties = getState().entities.selectProperties;
    const filtered = selectProperties.filter((p) => {
      const ids = p.categoryIDs.map((ci) => `${ci}`);
      return ids.includes(cateId);
    });

    dispatch(selectPropGridInitialized(filtered));
  };

export const initializeTypingPropGrid = () => async (dispatch, getState) => {
  const typingProperties = getState().entities.typingProperties;
  dispatch(typingPropGridInitialized(typingProperties));
};

export const initializeTypingPropGridOfCate =
  (cateId) => async (dispatch, getState) => {
    const typingProperties = getState().entities.typingProperties;
    const filtered = typingProperties.filter((p) => {
      const ids = p.categoryIDs.map((ci) => `${ci}`);
      return ids.includes(cateId);
    });

    dispatch(typingPropGridInitialized(filtered));
  };

export const selectTab = (tabValue) => async (dispatch) => {
  dispatch(tabSelected(tabValue));
};

export const setCateValue = (cateValue) => async (dispatch) => {
  dispatch(cateValueSet(cateValue));
};
