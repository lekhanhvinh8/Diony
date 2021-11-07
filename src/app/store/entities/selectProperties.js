import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  assignPropertyToCate,
  createSelectProperty,
  deleteSelectProperty,
  getAllSelectProperties,
  unassignPropertyToCate,
  updateSelectProperty as updatePropertyService,
} from "./../../services/selectPropertiesService";

const slice = createSlice({
  name: "selectProperties",
  initialState: [],
  reducers: {
    propertiesLoadded: (properties, action) => {
      return action.payload;
    },
    propertyAdded: (properties, action) => {
      const newProperty = action.payload;
      properties.push(newProperty);
    },
    propertyUpdated: (properties, action) => {
      const updatedProperty = action.payload;
      const index = properties.findIndex((p) => p.id === updatedProperty.id);
      updatedProperty.categoryIDs = properties[index].categoryIDs;

      properties[index] = updatedProperty;
    },
    propertyAssigned: (properties, action) => {
      const { propId, cateId } = action.payload;

      const property = properties.find((p) => p.id === propId);
      property.categoryIDs.push(Number(cateId));
    },
    propertyUnassigned: (properties, action) => {
      const { propId, cateId } = action.payload;

      const property = properties.find((p) => p.id === propId);
      const indexOfCate = property.categoryIDs.findIndex((id) => id === cateId);
      property.categoryIDs.splice(indexOfCate, 1);
    },
    propertyRemoved: (properties, action) => {
      const propId = action.payload;
      const index = properties.findIndex((p) => p.id === propId);

      properties.splice(index, 1);
    },
  },
});

export default slice.reducer;

const {
  propertiesLoadded,
  propertyAdded,
  propertyAssigned,
  propertyUnassigned,
  propertyUpdated,
  propertyRemoved,
} = slice.actions;

//action creators

export const loadSelectProperties = () => async (dispatch) => {
  const properties = await getAllSelectProperties();
  dispatch(propertiesLoadded(properties));
};

export const addSelectProperty = (property, cateId) => async (dispatch) => {
  const newProperty = await createSelectProperty(property);
  dispatch(propertyAdded(newProperty));

  if (cateId !== null) {
    await dispatch(assignToCate(newProperty.id, cateId));
  }
};

export const updateSelectProperty = (property) => async (dispatch) => {
  const updatedProperty = await updatePropertyService(property);

  dispatch(propertyUpdated(updatedProperty));
};

export const assignToCate = (propId, cateId) => async (dispatch) => {
  await assignPropertyToCate(propId, cateId);
  dispatch(propertyAssigned({ propId, cateId }));
};

export const unassignToCate = (propId, cateId) => async (dispatch) => {
  await unassignPropertyToCate(propId, cateId);
  dispatch(propertyUnassigned({ propId, cateId }));
};

export const removeSelectProperty = (propId) => async (dispatch) => {
  await deleteSelectProperty(propId);
  dispatch(propertyRemoved(propId));
};

//selectors

export const getSelectProperties = createSelector(
  (state) => state.entities.selectProperties,
  (properties) => properties
);

export const getSelectProperty = (propId) =>
  createSelector(
    (state) => state.entities.selectProperties,
    (properties) => {
      return properties.find((p) => p.id === propId);
    }
  );
