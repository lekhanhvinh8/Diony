import Input from "./input";
import Joi from "joi";

const handleInputChange = (errors, setData, setErrors, schemaMap) => (e) => {
  const updateErrors = { ...errors };
  const { currentTarget } = e;

  const errorMessage = validateProp(currentTarget, schemaMap);

  if (errorMessage) updateErrors[currentTarget.name] = errorMessage;
  else delete updateErrors[currentTarget.name];

  const updatedData = currentTarget.value;
  setData(updatedData);
  setErrors(updateErrors);
};

const validateProp = (input, schemaMap) => {
  const obj = { [input.name]: input.value };
  const propSchema = Joi.object().keys({ [input.name]: schemaMap[input.name] });

  const result = propSchema.validate(obj);

  return result.error ? result.error.details[0].message : null;
};

export const validate = (allData, schema) => {
  const options = { abortEarly: false };
  const result = schema.validate(allData, options);

  if (!result.error) return null;

  const errors = {};
  result.error.details.map((error) => {
    errors[error.path[0]] = error.message;
    return null;
  });

  return errors;
};

export const handleSubmit = (allData, schema, setErrors) => (e) => {
  e.preventDefault();

  const errors = validate(allData, schema);
  setErrors(errors || {});

  if (errors) return;
};

export const renderButton = (label, allData, schema, { ...props }) => {
  return (
    <button disabled={validate(allData, schema) ? true : false} {...props}>
      {label}
    </button>
  );
};

export const renderInput = (
  name,
  label,
  data,
  errors,
  setData,
  setErrors,
  schemaMap,
  { ...props } = {},
  type = "text"
) => {
  return (
    <Input
      name={name}
      label={label}
      value={data}
      type={type}
      errorMessage={errors[name]}
      onInputChange={handleInputChange(errors, setData, setErrors, schemaMap)}
      {...props}
    />
  );
};
