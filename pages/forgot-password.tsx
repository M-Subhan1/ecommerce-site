import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles/forgotPassword";
import Container from "@material-ui/core/Container";
import { Formik, Form } from "formik";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import TextField from "../components/TextField";
import { NextPage } from "next";
import { IState } from "../src/reducers";
import { setSnackBar, SnackBarType } from "../src/actions";
import { useDispatch } from "react-redux";

const initialState = {
  email: "",
};

interface PageProps {
  user: IState["user"];
}

const ForgotPassword: NextPage<PageProps> = props => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const classes = useStyles();

  const handleSubmit = async (payload: { email: string }) => {
    const { data } = await axios.post(
      `${process.env.STRAPI_URL}/auth/forgot-password`,
      payload
    );
    dispatch(
      setSnackBar({
        type: SnackBarType.success,
        isOpen: true,
        message: "Instructions sent via email",
      })
    );
  };

  if (props.user != null) {
    router.push("/");
  }

  return (
    <Container component='main' maxWidth='sm' className={classes.root}>
      <div className={classes.paper}>
        <Box className={classes.headings}>
          <Typography variant='subtitle1'>RECOVER ACCOUNT</Typography>
          <Typography className={classes.primaryHeading} variant='h4'>
            Forgot your password?
          </Typography>
          <Typography variant='body1'>
            Enter your email address below and we&apos;ll get you back on track
          </Typography>
        </Box>

        <Formik initialValues={initialState} onSubmit={handleSubmit}>
          <Form className={classes.form}>
            <Typography className={classes.label}>Enter your email</Typography>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
            />
            <Box className={classes.btnContainer}>
              <Button
                onClick={() => router.push("/login")}
                variant='outlined'
                color='primary'
                className={classes.submit}
              >
                Back To Login
              </Button>

              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Send Reset Link
              </Button>
            </Box>
          </Form>
        </Formik>
      </div>
    </Container>
  );
};

export default ForgotPassword;
