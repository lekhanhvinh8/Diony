import {
  Avatar,
  Box,
  Checkbox,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
  Link,
} from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Joi from "joi";
import { renderInput, validate } from "../../app/layouts/common/formUtil";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { getCurrentUser, login } from "../../app/services/authService";
import { roleNames } from "../../config.json";
import loginBackground from "../../app/layouts/images/login.jpg";

const theme = createTheme();

const emailAddressField = "email";
const passwordField = "password";

const schemaMap = {
  [emailAddressField]: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  [passwordField]: Joi.string().required().min(6),
};

const schema = Joi.object().keys(schemaMap);

export default function Login({ history }) {
  const [submitLoadding, setSubmitLoadding] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const getAllData = () => {
    return {
      [emailAddressField]: emailAddress,
      [passwordField]: password,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validate(getAllData(), schema);
    setErrors(errors || {});

    if (errors) return;

    try {
      setSubmitLoadding(true);
      const result = await login(emailAddress, password);

      if (result === null) {
        const newErrors = { [emailAddressField]: "" };
        newErrors[emailAddressField] = "Invalid role";
        setErrors(newErrors);

        setSubmitLoadding(false);

        return;
      }

      setSubmitLoadding(false);

      const user = getCurrentUser();
      if (user && user.role === roleNames.admin) history.push("/admin");
      else if (user && user.role === roleNames.shipper) {
        history.push("/shipper");
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const newErrors = { [emailAddressField]: "" };
        newErrors[emailAddressField] = ex.response.data;
        setErrors(newErrors);
      }

      setSubmitLoadding(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(" + loginBackground + ")",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {renderInput(
                emailAddressField,
                "Email",
                emailAddress,
                getAllData(),
                errors,
                setEmailAddress,
                setErrors,
                schemaMap,
                {
                  autoFocus: true,
                }
              )}
              {renderInput(
                passwordField,
                "Password",
                password,
                getAllData(),
                errors,
                setPassword,
                setErrors,
                schemaMap,
                {
                  type: "password",
                }
              )}
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={submitLoadding}
                loadingPosition="end"
              >
                Đăng nhập
              </LoadingButton>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item></Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
