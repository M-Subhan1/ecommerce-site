import React from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles/contact-us";
import Container from "@material-ui/core/Container";
import { Formik, Form } from "formik";
import { useRouter } from "next/dist/client/router";
import TextField from "../components/TextField";
import { NextPage } from "next";
import axios from "axios";
import { setSnackBar, SnackBarType } from "../src/actions";
import MapIcon from "../public/svg/map.svg";
import PhoneIcon from "../public/svg/phone.svg";
import EmailIcon from "../public/svg/email.svg";
import * as Yup from "yup";

const schema = Yup.object({
  username: Yup.string().required("Please Enter a username"),
  email: Yup.string().email().required("Please Enter your Email"),
  message: Yup.string().required("Please leave a message"),
});

const initialState = {
  name: "",
  email: "",
  message: "",
};

const ContactUs: NextPage = props => {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      justifyContent='center'
      alignItems='center'
    >
      <Grid
        item
        container
        lg={10}
        md={11}
        xs={12}
        className={classes.container}
      >
        <Grid item container md={7} xs={12} className={classes.textContainer}>
          <Grid item xs={12} className={classes.headingsContainer}>
            <Typography variant='h6' className={classes.textHeading}>
              Connect with us
            </Typography>
            <Typography variant='subtitle1'>
              Have a complaint or a suggestion?
            </Typography>
            <Typography variant='subtitle1'>
              Are you a teacher requesting a free sample?
            </Typography>
            <Typography variant='subtitle1'>
              Leave a message here or reach out to us
            </Typography>
          </Grid>
          <Grid item container xs={12} className={classes.group}>
            <Grid item xs={4}>
              <MapIcon width={50} height={50} fill='white' />
            </Grid>
            <Grid item xs={8}>
              <Typography variant='subtitle1'>
                {/* Creative Books, Makkah Center 7/8, Lower Mall, Lahore, Pakistan */}
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Officia illo soluta quos dolor aliquam veritatis.
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} className={classes.group}>
            <Grid item xs={4}>
              <PhoneIcon width={50} height={50} fill='white' />
            </Grid>
            <Grid item xs={8}>
              <Typography variant='subtitle1'>
                {/* 042 37 39 5211, 042 37 110 267-50 */}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
                sit sint blanditiis hic dicta maxime!
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} className={classes.group}>
            <Grid item xs={4}>
              <EmailIcon width={50} height={50} fill='white' />
            </Grid>
            <Grid item xs={8}>
              <Typography variant='subtitle1'>
                {/* support@creativebooks.pk */}
                support@example.com
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={5} xs={12} className={classes.formContainer}>
          <Formik
            onSubmit={() => {}}
            validationSchema={schema}
            initialValues={initialState}
          >
            <Form>
              <Typography variant='h5' className={classes.heading}>
                Leave us a message
              </Typography>
              <Typography className={classes.subheading}>Full Name</Typography>
              <TextField
                variant='outlined'
                margin='normal'
                label='Full Name'
                name='name'
              />
              <Typography className={classes.subheading}>Email</Typography>
              <TextField
                variant='outlined'
                margin='normal'
                label='Email'
                name='email'
              />
              <Typography className={classes.subheading}>
                Leave us a message
              </Typography>
              <TextField
                className={classes.textarea}
                variant='outlined'
                margin='normal'
                label='Your Message'
                name='message'
                multiline
                rows={8}
              />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submitBtn}
              >
                Submit
              </Button>
            </Form>
          </Formik>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ContactUs;
