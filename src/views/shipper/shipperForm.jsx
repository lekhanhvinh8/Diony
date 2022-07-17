import Joi from "joi";
import { useState } from "react";
import { Box, Button, DialogActions } from "@mui/material";
import { renderInput, validate } from "../../app/layouts/common/formUtil";
import { createShipper } from "../../app/services/shipperService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { reloadShippers } from "../../app/store/ui/shippers";

const idField = "shipperId";
const nameField = "name";
const emailField = "email";
const passwordField = "password";
const passwordConfirmField = "passwordConfirm";
const phoneNumberField = "phoneNumber";

const schemaMap = {
  [idField]: Joi.number(),
  [emailField]: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      "string.email": "Email không hợp lệ",
      "string.empty": "Không được bỏ trống",
    }),
  [passwordField]: Joi.string().empty().min(6).messages({
    "string.min": "Mật khẩu cần có ít nhất 6 ký tự",
    "string.empty": "Không được bỏ trống",
  }),

  [passwordConfirmField]: Joi.any()
    .equal(Joi.ref(passwordField))
    .label("Confirm password")
    .messages({
      "any.only": "Mật khẩu xác nhận không trùng khớp",
    }),
  [phoneNumberField]: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.pattern.base": "Số điện thoại không hợp lệ",
      "string.length": "Số điện thoại phải có độ dài bằng 10",
      "string.empty": "Không được bỏ trống",
    }),
  [nameField]: Joi.string().messages({
    "string.empty": "Không được bỏ trống",
  }),
};

const schema = Joi.object().keys(schemaMap);

const ShipperForm = ({ setDialogOpen, updatedShipperId }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    [idField]: 0,
    [nameField]: "",
    [emailField]: "",
    [passwordField]: "",
    [passwordConfirmField]: "",
    [phoneNumberField]: "",
  });
  const [errors, setErrors] = useState({});

  const getPieceData = (field) => {
    return data[field];
  };
  const getSetPieceData = (field) => {
    return (pieceData) => setData({ ...data, [field]: pieceData });
  };

  const renderFormInput = (field, label, options, synsWithNames = []) => {
    return renderInput(
      field,
      label,
      getPieceData(field),
      data,
      errors,
      getSetPieceData(field, setErrors, schemaMap),
      setErrors,
      schemaMap,
      options,
      synsWithNames
    );
  };

  const handleSubmit = async () => {
    const errors = validate(data, schema);
    setErrors(errors || {});

    if (errors) return;

    //comunicating with server
    try {
      await createShipper(
        data[emailField],
        data[passwordField],
        data[nameField],
        data[phoneNumberField]
      );

      setDialogOpen(false);
      await dispatch(reloadShippers());
      toast.success("Create new shipper account successfully");
    } catch (ex) {
      const newErrors = {
        ...errors,
        [emailField]: "An unexpected error has occurred",
      };

      setErrors(newErrors);
    }
  };

  return (
    <Box component="form" noValidate sx={{ mt: 1 }}>
      {renderFormInput(emailField, "Email *")}
      {renderFormInput(passwordField, "Mật khẩu *", {
        type: "password",
      })}
      {renderFormInput(
        passwordConfirmField,
        "Xác nhận mật khẩu *",
        {
          type: "password",
        },
        [passwordField]
      )}
      {renderFormInput(phoneNumberField, "Số điện thoại *")}
      {renderFormInput(nameField, "Họ tên *")}

      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Hủy</Button>
        <Button
          disabled={validate(data, schema) ? true : false}
          onClick={async () => {
            await handleSubmit();
          }}
        >
          Lưu
        </Button>
      </DialogActions>
    </Box>
  );
};

export default ShipperForm;
