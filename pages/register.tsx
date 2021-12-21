import React from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles/register";
import Container from "@material-ui/core/Container";
import { connect, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import TextField from "../components/TextField";
import { NextPage } from "next";
import { IState } from "../src/reducers";
import { setSnackBar, SnackBarType } from "../src/actions";
import * as Yup from "yup";

const schema = Yup.object({
  username: Yup.string().required("Please Enter a username"),
  email: Yup.string().email().required("Please Enter your Email"),
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

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

interface PageProps {
  user: IState["user"];
}

const SignUp: NextPage<PageProps> = props => {
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();

  if (props.user) router.push("/");

  const submit = async (data: { [key: string]: string }) => {
    const response = await axios.post(`/api/auth/register`, {
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (response.data.status == "error")
      dispatch(
        setSnackBar({
          type: SnackBarType.error,
          isOpen: true,
          message: response.data.message,
        })
      );

    if (response.data.status == "success") {
      dispatch(
        setSnackBar({
          type: SnackBarType.success,
          isOpen: true,
          message: "Account created! Verification instructions sent via email",
        })
      );

      return router.push("/login");
    }
  };

  return (
    <Container component='main' maxWidth='sm' className={classes.root}>
      <div className={classes.paper}>
        <Box className={classes.headings}>
          <Typography variant='subtitle1'>SIGN UP</Typography>
          <Typography className={classes.primaryHeading} variant='h4'>
            Welcome
          </Typography>
          <Typography variant='body1'></Typography>
        </Box>

        <Formik
          onSubmit={submit}
          validationSchema={schema}
          initialValues={initialState}
        >
          <Form className={classes.form}>
            <Typography className={classes.label}>Enter your Name</Typography>
            <Grid container justifyContent={"space-between"}>
              <Grid item xs={12} className={classes.gridLeft}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  label='Username'
                  name='username'
                />
              </Grid>
            </Grid>
            <Typography className={classes.label}>Enter your email</Typography>
            <TextField
              variant='outlined'
              margin='normal'
              label='Email Address'
              name='email'
              autoComplete='email'
              type='email'
            />
            <Typography className={classes.label}>Choose a Password</Typography>
            <Grid container justifyContent={"space-between"}>
              <Grid item xs={12} sm={6} className={classes.gridLeft}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  name='password'
                  label='Password'
                  type='password'
                  autoComplete='current-password'
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.gridRight}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  autoComplete='current-password'
                />
              </Grid>
            </Grid>
            <Box className={classes.btnContainer}>
              <Typography className={classes.label}>
                Have an account already?
                <Link
                  className={classes.link}
                  onClick={() => router.push("/login")}
                  variant='body2'
                >
                  Sign in here
                </Link>
              </Typography>

              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Submit
              </Button>
            </Box>
          </Form>
        </Formik>
      </div>
    </Container>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(SignUp);
