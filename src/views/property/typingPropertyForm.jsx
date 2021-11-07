import Joi from "joi";
import { useEffect, useState } from "react";
import { renderInput, validate } from "../../app/layouts/common/formUtil";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  DialogActions,
  FormControl,
  FormGroup,
  MenuItem,
  Select,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import {
  addTypingProperty,
  getTypingProperty,
  updateTypingProperty,
} from "../../app/store/entities/typingProperties";
import { typingPropertyTypeName } from "../../config.json";

const idField = "propId";
const nameField = "name";
const descriptionField = "description";
const typeField = "type";
const categoryField = "category";

const schemaMap = {
  [idField]: Joi.number().min(0),
  [nameField]: Joi.string().required(),
  [descriptionField]: Joi.string().optional().allow(""),
  [typeField]: Joi.string().required(),
  [categoryField]: Joi.string().optional().allow(""),
};

const schema = Joi.object().keys(schemaMap);

const typeOptions = typingPropertyTypeName.map((t) => {
  return {
    id: t.codeName,
    name: t.name,
  };
});

const TypingPropertyForm = ({ setDialogOpen, updatedPropId }) => {
  const dispatch = useDispatch();
  const cateValue = useSelector((state) => state.ui.propertiesPage.cateValue);
  const updatedProp = useSelector(getTypingProperty(updatedPropId));

  const [data, setData] = useState({
    [idField]: 0,
    [nameField]: "",
    [descriptionField]: "",
    [typeField]: typeOptions[0].id,
    [categoryField]: cateValue ? cateValue : "none",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (updatedPropId !== null) {
      const index = typeOptions.findIndex((t) => t.id === updatedProp.type);

      setData({
        ...data,
        [idField]: updatedProp.id,
        [nameField]: updatedProp.name,
        [descriptionField]: updatedProp.description,
        [typeField]: index !== -1 ? typeOptions[index].id : typeOptions[0].id,
      });
    }
  }, [updatedProp]); // eslint-disable-line react-hooks/exhaustive-deps

  const getPropertyFromData = () => {
    return {
      id: data[idField],
      name: data[nameField],
      description: data[descriptionField],
      type: data[typeField],
    };
  };

  const handleSave = async () => {
    const errors = validate(data, schema);
    setErrors(errors || {});

    if (errors) return;

    const property = getPropertyFromData();

    if (!updatedPropId) {
      const cateId = cateValue ? cateValue.split("-")[0] : null;

      await dispatch(addTypingProperty(property, cateId));
    } else {
      await dispatch(updateTypingProperty(property));
    }
  };

  return (
    <div>
      <form>
        {renderInput(
          idField,
          "Id",
          data[idField],
          errors,
          (id) => {},
          setErrors,
          schemaMap,
          { disabled: true }
        )}
        {renderInput(
          nameField,
          "Name",
          data[nameField],
          errors,
          (name) => {
            setData({ ...data, [nameField]: name });
          },
          setErrors,
          schemaMap
        )}
        {renderInput(
          descriptionField,
          "Description",
          data[descriptionField],
          errors,
          (description) => {
            setData({ ...data, [descriptionField]: description });
          },
          setErrors,
          schemaMap
        )}

        <FormGroup>
          <FormControl fullWidth style={{ marginTop: 15 }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data[typeField]}
              label="Age"
              onChange={(e) => {
                const newSelectedType = e.target.value;
                setData({ ...data, [typeField]: newSelectedType });
              }}
            >
              {typeOptions.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormGroup>

        {!updatedPropId &&
          renderInput(
            categoryField,
            "Category",
            data[categoryField],
            errors,
            (category) => {},
            setErrors,
            schemaMap,
            { disabled: true }
          )}
      </form>

      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        <Button
          disabled={validate(data, schema) ? true : false}
          onClick={async () => {
            await handleSave();
            setDialogOpen(false);
          }}
        >
          Save
        </Button>
      </DialogActions>
    </div>
  );
};

export default TypingPropertyForm;
