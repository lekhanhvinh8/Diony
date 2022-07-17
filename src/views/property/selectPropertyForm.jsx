import Joi from "joi";
import { useEffect, useState } from "react";
import { renderInput, validate } from "../../app/layouts/common/formUtil";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  DialogActions,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import Switch from "@mui/material/Switch";
import {
  addSelectProperty,
  getSelectProperty,
  updateSelectProperty,
} from "../../app/store/entities/selectProperties";

const idField = "propId";
const nameField = "name";
const descriptionField = "description";
const categoryField = "category";

const schemaMap = {
  [idField]: Joi.number().min(0),
  [nameField]: Joi.string().required(),
  [descriptionField]: Joi.string().optional().allow(""),
  [categoryField]: Joi.string().optional().allow(""),
};

const schema = Joi.object().keys(schemaMap);

const SelectPropertyForm = ({ setDialogOpen, updatedPropId }) => {
  const dispatch = useDispatch();

  const cateValue = useSelector((state) => state.ui.propertiesPage.cateValue);
  const updatedProp = useSelector(getSelectProperty(updatedPropId));

  const [data, setData] = useState({
    [idField]: 0,
    [nameField]: "",
    [descriptionField]: "",
    [categoryField]: cateValue ? cateValue : "Không có",
  });
  const [isRequired, setIsRequired] = useState(false);
  const [hasMultiValues, setHasMultiValues] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (updatedPropId !== null) {
      setData({
        ...data,
        [idField]: updatedProp.id,
        [nameField]: updatedProp.name,
        [descriptionField]: updatedProp.description,
      });

      setIsRequired(updatedProp.isRequired);
      setHasMultiValues(updatedProp.hasMultiValues);
    }
  }, [updatedProp]); // eslint-disable-line react-hooks/exhaustive-deps

  const getPropertyFromData = () => {
    return {
      id: data[idField],
      name: data[nameField],
      description: data[descriptionField],
      isRequired: isRequired,
      hasMultiValues: hasMultiValues,
    };
  };

  const handleSave = async () => {
    const errors = validate(data, schema);
    setErrors(errors || {});

    if (errors) return;

    const property = getPropertyFromData();

    if (!updatedPropId) {
      const cateId = cateValue ? cateValue.split("-")[0] : null;

      await dispatch(addSelectProperty(property, cateId));
    } else {
      await dispatch(updateSelectProperty(property));
    }
  };

  return (
    <div>
      <form>
        {renderInput(
          idField,
          "Id",
          data[idField],
          data,
          errors,
          (id) => {},
          setErrors,
          schemaMap,
          { disabled: true }
        )}
        {renderInput(
          nameField,
          "Tên",
          data[nameField],
          data,
          errors,
          (name) => {
            setData({ ...data, [nameField]: name });
          },
          setErrors,
          schemaMap
        )}
        {renderInput(
          descriptionField,
          "Mô tả",
          data[descriptionField],
          data,
          errors,
          (description) => {
            setData({ ...data, [descriptionField]: description });
          },
          setErrors,
          schemaMap
        )}

        <FormGroup aria-label="position" row>
          <FormControlLabel
            control={
              <Switch
                checked={isRequired}
                onChange={(event) => {
                  setIsRequired(event.target.checked);
                }}
              />
            }
            label="Bắt buộc"
          />
        </FormGroup>

        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={hasMultiValues}
                onChange={(event) => {
                  setHasMultiValues(event.target.checked);
                }}
              />
            }
            label="Đa giá trị"
          />
        </FormGroup>

        {!updatedPropId &&
          renderInput(
            categoryField,
            "Danh mục",
            data[categoryField],
            data,
            errors,
            (category) => {},
            setErrors,
            schemaMap,
            { disabled: true }
          )}
      </form>

      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Hủy</Button>
        <Button
          disabled={validate(data, schema) ? true : false}
          onClick={async () => {
            await handleSave();
            setDialogOpen(false);
          }}
        >
          Lưu
        </Button>
      </DialogActions>
    </div>
  );
};

export default SelectPropertyForm;
