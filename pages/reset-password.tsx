import React, { useEffect } from "react";
import type { NextPage } from "next";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles/login";
import Container from "@material-ui/core/Container";
import { Formik, Form } from "formik";
import { useRouter } from "next/dist/client/router";
import TextField from "../components/TextField";
import { useDispatch } from "react-redux";
import { setSnackBar, SnackBarType } from "../src/actions";
import * as Yup from "yup";
import axios from "axios";

const initialState = {
  password: "",
  passwordConfirm: "",
};

const schema = Yup.object({
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Reset: NextPage = props => {
  const dispatch = useDispatch();
  const router = useRouter();
  const classes = useStyles();

  const handleSubmit = async (data: {
    password: string;
    passwordConfirm: string;
  }) => {
    console.log(data);
    // const params = router.query;
    // const response = await axios.post(
    //   "http://localhost:1337/auth/reset-password",
    //   {
    //     // code: params.code,
    //     password: data.password,
    //     passwordConfirmation: data.passwordConfirm,
    //   }
    // );
    // dispatch(
    //   setSnackBar({
    //     isOpen: true,
    //     type: SnackBarType.success,
    //     message: "Password successfully updated",
    //   })
    // );
  };

  return (
    <Container component='main' maxWidth='sm' className={classes.root}>
      <div className={classes.paper}>
        <Box className={classes.headings}>
          <Typography variant='subtitle1'>LOGIN</Typography>
          <Typography className={classes.primaryHeading} variant='h4'>
            Reset Password
          </Typography>
          <Typography variant='body1'>Choose a new password</Typography>
        </Box>

        <Formik
          onSubmit={handleSubmit}
          initialValues={initialState}
          validationSchema={schema}
        >
          <Form className={classes.form}>
            <Typography className={classes.label}>Choose a password</Typography>
            <TextField
              variant='outlined'
              margin='normal'
              required
              label='Password'
              name='password'
              autoComplete='password'
              type='password'
            />
            <Typography className={classes.label}>
              Confirm your password
            </Typography>
            <TextField
              variant='outlined'
              margin='normal'
              required
              name='passwordConfirm'
              label='Confirm Password'
              type='password'
            />

            <Box className={classes.btnContainer}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Update Password
              </Button>
            </Box>
          </Form>
        </Formik>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default Reset;
