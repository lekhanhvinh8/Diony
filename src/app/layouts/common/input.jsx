import { TextField } from "@mui/material";

const Input = ({ name, label, errorMessage, onInputChange, ...rest }) => {
  return (
    <TextField
      {...rest}
      margin="dense"
      id={name}
      name={name}
      label={label}
      fullWidth
      variant="standard"
      error={errorMessage ? true : false}
      helperText={errorMessage}
      onChange={onInputChange}
    />
  );
};

export default Input;
