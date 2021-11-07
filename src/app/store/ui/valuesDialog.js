import { createSlice } from "@reduxjs/toolkit";
import {
  createPropertyValue,
  deletePropertyValue,
  getValues,
} from "../../services/valuesService";

const nonePropertyId = -1;

const slice = createSlice({
  name: "valuesDialog",
  initialState: {
    propertyId: nonePropertyId,
    values: [],
    isLoadding: false,
  },
  reducers: {
    loaddingSet: (dialog, action) => {
      const isLoadding = action.payload;
      dialog.isLoadding = isLoadding;
    },
    valuesReloadded: (dialog, action) => {
      const { values, propId } = action.payload;
      const stateValues = values.map((v) => {
        return {
          id: v.id,
          value: v.value,
          propertyId: v.propertyId,
        };
      });

      dialog.propertyId = propId;
      dialog.values = stateValues;
    },
    valueAdded: (dialog, action) => {
      const value = action.payload;
      const stateValue = {
        id: value.id,
        value: value.value,
        propertyId: value.propertyId,
      };

      dialog.values.push(stateValue);
    },
    valueRemoved: (dialog, action) => {
      const valueId = action.payload;
      const index = dialog.values.findIndex((v) => v.id === valueId);

      if (index !== -1) dialog.values.splice(index, 1);
    },
  },
});

export default slice.reducer;

const { loaddingSet, valuesReloadded, valueAdded, valueRemoved } =
  slice.actions;

//action creators
export const reloadValues = (propId) => async (dispatch) => {
  dispatch(loaddingSet(true));
  const values = await getValues(propId);
  dispatch(valuesReloadded({ values: values, propId: propId }));
  dispatch(loaddingSet(false));
};

export const addValue = (value, propId) => async (dispatch) => {
  const newPropertyValue = await createPropertyValue(value, propId);
  dispatch(valueAdded(newPropertyValue));
};

export const removeValue = (valueId) => async (dispatch) => {
  await deletePropertyValue(valueId);
  dispatch(valueRemoved(valueId));
};
