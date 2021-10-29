import React, { useEffect, useState } from "react";
import Joi from "joi";
import {
  validate,
  renderButton,
  renderInput,
} from "./../../app/layouts/common/formUtil";
import { getCategory } from "../../app/services/categoriesService";
import { Button, DialogActions } from "@mui/material";
import { createCategory } from "./../../app/services/categoriesService";

const cateIdField = "cateId";
const nameField = "name";
const descriptionField = "description";
const fatherField = "father";

const schemaMap = {
  [cateIdField]: Joi.number().min(0),
  [nameField]: Joi.string().required(),
  [descriptionField]: Joi.string().optional().allow(""),
  [fatherField]: Joi.string().optional().allow(""),
};

const schema = Joi.object().keys(schemaMap);

const CategoryForm = ({ fatherId, setDialogOpen, update = false }) => {
  const [cateId, setCateId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [father, setFather] = useState("root");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const asyncFunc = async () => {
      if (fatherId !== -1) {
        const category = await getCategory(fatherId);
        setFather(category.name);
      }
    };

    asyncFunc();
  }, []);

  const getAllData = () => {
    return {
      cateId,
      name,
      description,
      father,
    };
  };

  const getCateFromData = () => {
    const data = getAllData();
    const category = {
      id: data.cateId,
      name: data.name,
      description: data.description,
      fatherId: fatherId !== -1 ? fatherId : null,
      active: false,
    };

    return category;
  };

  const handleSave = async () => {
    const errors = validate(getAllData(), schema);
    setErrors(errors || {});

    if (errors) return;

    //do save something
    const newCategory = await createCategory(getCateFromData());
    console.log("Success", newCategory);
  };

  return (
    <div>
      <form>
        {renderInput(
          cateIdField,
          "Id",
          cateId,
          errors,
          setCateId,
          setErrors,
          schemaMap,
          { disabled: true }
        )}
        {renderInput(
          nameField,
          "Name",
          name,
          errors,
          setName,
          setErrors,
          schemaMap
        )}
        {renderInput(
          descriptionField,
          "Description",
          description,
          errors,
          setDescription,
          setErrors,
          schemaMap
        )}
        {renderInput(
          fatherField,
          "Father",
          father,
          errors,
          () => {},
          setErrors,
          schemaMap,
          { disabled: true }
        )}

        {renderButton("Save", getAllData(), schema, {
          className: "btn btn-success",
        })}
      </form>

      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        <Button
          disabled={validate(getAllData(), schema) ? true : false}
          onClick={() => {
            handleSave();
            setDialogOpen(false);
          }}
        >
          Save
        </Button>
      </DialogActions>
    </div>
  );
};

export default CategoryForm;
