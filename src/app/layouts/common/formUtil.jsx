import Input from "./input";
import Joi from "joi";

export const handleInputChange =
  (syncWithNames, allData, errors, setData, setErrors, schemaMap) => (e) => {
    const updateErrors = { ...errors };
    const { currentTarget } = e;

    const errorMessage = validateProp(
      syncWithNames,
      allData,
      currentTarget,
      schemaMap
    );

    if (errorMessage) updateErrors[currentTarget.name] = errorMessage;
    else delete updateErrors[currentTarget.name];

    const updatedData = currentTarget.value;
    setData(updatedData);
    setErrors(updateErrors);
  };

export const handleInputChangeFormik =
  (syncWithNames, allData, handleDataChange, errors, setErrors, schemaMap) =>
  (e) => {
    const updateErrors = { ...errors };
    const { currentTarget } = e;

    const errorMessage = validateProp(
      syncWithNames,
      allData,
      currentTarget,
      schemaMap
    );

    if (errorMessage) updateErrors[currentTarget.name] = errorMessage;
    else delete updateErrors[currentTarget.name];

    handleDataChange(e);
    setErrors(updateErrors);
  };

export const validateProp = (syncWithNames, allData, input, schemaMap) => {
  const datas = { [input.name]: input.value };
  const propSchemaMap = { [input.name]: schemaMap[input.name] };

  for (const name of syncWithNames) {
    datas[name] = allData[name];
    propSchemaMap[name] = schemaMap[name];
  }

  const propSchema = Joi.object().keys(propSchemaMap);

  const result = propSchema.validate(datas);

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

export const renderInput = (
  name,
  label,
  data,
  allData,
  errors,
  setData,
  setErrors,
  schemaMap,
  { ...props } = {},
  syncWithNames = [],
  type = "text"
) => {
  return (
    <Input
      name={name}
      label={label}
      value={data}
      type={type}
      errorMessage={errors[name]}
      onInputChange={(e) => {
        handleInputChange(
          syncWithNames,
          allData,
          errors,
          setData,
          setErrors,
          schemaMap
        )(e);
      }}
      {...props}
    />
  );
};
