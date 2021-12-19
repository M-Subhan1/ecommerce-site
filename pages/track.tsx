import { FC, useState } from "react";
import useStyles from "../styles/track";
import { Container, Typography, Button, Box, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "../components/TextField";

const schema = Yup.object({
  orderId: Yup.string().required(
    "Please Enter id of the order you wish to track"
  ),
});

const TrackOrder: FC = () => {
  const classes = useStyles();
  const [order, setOrder]: [any, Function] = useState(null);

  const initialState = {
    orderId: "",
  };

  const handleSubmit = async ({ orderId }: { orderId: string }) => {
    // setOrder(data.order);
  };

  const renderForm = () => {
    return (
      <Formik
        onSubmit={handleSubmit}
        validationSchema={schema}
        initialValues={initialState}
      >
        <Form className={classes.form}>
          <Box component='span' className={classes.headingContainer}>
            <Typography>Track your order</Typography>
          </Box>

          <Typography>Enter order id:</Typography>
          <TextField
            variant='outlined'
            margin='normal'
            name='orderId'
            label='Order Id'
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.btn}
          >
            Track
          </Button>
        </Form>
      </Formik>
    );
  };

  const renderDetails = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Box component='span' className={classes.headingContainer}>
            <Typography>Order Details</Typography>
          </Box>
        </Grid>
        <Grid item md={3} sm={6} xs={12} className={classes.gridItem}>
          <Typography align='center'>
            Order Status: {order.status.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item md={3} sm={6} xs={12} className={classes.gridItem}>
          <Typography align='center'>
            Payment Method: {order.paymentDetails.method.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item md={3} sm={6} xs={12} className={classes.gridItem}>
          <Typography align='center'>
            Payment Status: {order.paymentDetails.status.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item md={3} sm={6} xs={12} className={classes.gridItem}>
          <Typography align='center'>
            Bill Amount: Rs.{order.paymentDetails.billAmount}/-
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Container className={classes.container}>
      <Container className={classes.innerContainer}>
        {!order ? renderForm() : renderDetails()}
      </Container>
    </Container>
  );
};

export default TrackOrder;
