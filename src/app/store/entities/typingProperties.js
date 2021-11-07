import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  assignPropertyToCate,
  createTypingProperty,
  deleteTypingProperty,
  getAllTypingProperties,
  unassignPropertyToCate,
  updateTypingProperty as updatePropertyService,
} from "../../services/typingPropertiesService";

const slice = createSlice({
  name: "typingProperties",
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

export const loadTypingProperties = () => async (dispatch) => {
  const properties = await getAllTypingProperties();
  dispatch(propertiesLoadded(properties));
};

export const addTypingProperty = (property, cateId) => async (dispatch) => {
  const newProperty = await createTypingProperty(property);
  dispatch(propertyAdded(newProperty));

  if (cateId !== null) {
    await dispatch(assignToCate(newProperty.id, cateId));
  }
};

export const updateTypingProperty = (property) => async (dispatch) => {
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

export const removeTypingProperty = (propId) => async (dispatch) => {
  await deleteTypingProperty(propId);
  dispatch(propertyRemoved(propId));
};

//selectors

export const getTypingProperty = (propId) =>
  createSelector(
    (state) => state.entities.typingProperties,
    (properties) => {
      return properties.find((p) => p.id === propId);
    }
  );
