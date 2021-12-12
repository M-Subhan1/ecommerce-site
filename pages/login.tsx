import React, { useEffect } from "react";
import type { NextPage } from "next";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles/login";
import Container from "@material-ui/core/Container";
import { Formik, Form } from "formik";
import { connect } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { sign_in } from "../src/actions";
import TextField from "../components/TextField";
import { IState } from "../src/reducers";

interface PageProps {
  user: IState["user"];
  sign_in: Function;
  strapiUrl: string;
}

const initialState = {
  identifier: "",
  password: "",
};

const SignIn: NextPage<PageProps> = props => {
  const router = useRouter();
  useEffect(() => {
    if (props.user != null) {
      router.push("/");
    }
  });

  const validate = async (data: { [key: string]: string }) => {
    props.sign_in(data);
  };

  const classes = useStyles();

  return (
    <Container component='main' maxWidth='sm' className={classes.root}>
      <div className={classes.paper}>
        <Box className={classes.headings}>
          <Typography variant='subtitle1'>LOGIN</Typography>
          <Typography className={classes.primaryHeading} variant='h4'>
            Welcome back
          </Typography>
          <Typography variant='body1'>Login to manage your account</Typography>
        </Box>

        <Formik
          onSubmit={() => {}}
          initialValues={initialState}
          validate={validate}
          validateOnChange={false}
          validateOnBlur={false}
        >
          <Form className={classes.form}>
            <Typography className={classes.label}>Enter your email</Typography>
            <TextField
              variant='outlined'
              margin='normal'
              required
              id='email'
              label='Email Address'
              name='identifier'
              autoComplete='email'
            />
            <Typography className={classes.label}>
              Enter your password
              <Link
                className={classes.link}
                onClick={() => router.push("/forgot-password")}
              >
                Forgot your password?
              </Link>
            </Typography>
            <TextField
              variant='outlined'
              margin='normal'
              required
              name='password'
              label='Password'
              type='password'
              autoComplete='current-password'
            />

            <Box className={classes.btnContainer}>
              <Typography className={classes.label}>
                Dont have an account yet?
                <Link
                  className={classes.link}
                  onClick={() => router.push("/register")}
                  variant='body2'
                >
                  Sign up here
                </Link>
              </Typography>

              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Sign In
              </Button>
            </Box>
          </Form>
        </Formik>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { sign_in })(SignIn);
