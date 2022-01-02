import React, { useEffect, useState } from "react";
import Joi from "joi";
import { validate, renderInput } from "./../../app/layouts/common/formUtil";
import { getCategory } from "../../app/services/categoriesService";
import { Button, DialogActions } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  removeCategory,
  updateCategory,
} from "../../app/store/ui/categoriesPage";
import {
  hasChildren,
  rootCategoryId,
} from "../../app/store/entities/categories";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { Link } from "react-router-dom";
import CategoryAvatar from "./categoryAvatar";

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

const CategoryForm = ({
  fatherId,
  setDialogOpen,
  updatedCateId = rootCategoryId,
}) => {
  const [cateId, setCateId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [father, setFather] = useState("root");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const cateHasChildren = useSelector(hasChildren(updatedCateId));

  useEffect(() => {
    const asyncFunc = async () => {
      if (fatherId !== rootCategoryId) {
        const category = await getCategory(fatherId);
        setFather(category.name);
      }

      if (updatedCateId !== rootCategoryId) {
        const category = await getCategory(updatedCateId);
        setCateId(category.id);
        setName(category.name);
        setDescription(category.description);
      }
    };

    asyncFunc();
  }, [fatherId, updatedCateId]);

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

    if (updatedCateId === rootCategoryId)
      await dispatch(addCategory(fatherId, getCateFromData()));
    else await dispatch(updateCategory(getCateFromData()));
  };

  return (
    <div>
      <form>
        {updatedCateId !== rootCategoryId && (
          <CategoryAvatar cateId={updatedCateId} />
        )}

        {renderInput(
          cateIdField,
          "Id",
          cateId,
          getAllData(),
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
          getAllData(),
          errors,
          setName,
          setErrors,
          schemaMap
        )}
        {renderInput(
          descriptionField,
          "Description",
          description,
          getAllData(),
          errors,
          setDescription,
          setErrors,
          schemaMap
        )}
        {renderInput(
          fatherField,
          "Father",
          father,
          getAllData(),
          errors,
          () => {},
          setErrors,
          schemaMap,
          { disabled: true }
        )}
        {updatedCateId !== rootCategoryId && (
          <div style={{ marginTop: 30 }}>
            {!cateHasChildren && (
              <Link to={"/admin/properties/" + updatedCateId}>
                <Button color="success" endIcon={<MiscellaneousServicesIcon />}>
                  View Properties
                </Button>
              </Link>
            )}
            <Button
              color="error"
              endIcon={<DeleteIcon />}
              onClick={async () => {
                await dispatch(removeCategory(updatedCateId));
                setDialogOpen(false);
              }}
            >
              Delete
            </Button>
          </div>
        )}
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
