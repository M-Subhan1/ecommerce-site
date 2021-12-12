import React, { useEffect, FC } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { TextField, Grid, Container } from "@material-ui/core";
import { connect } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { placeOrder } from "../src/actions";
import { IState } from "../src/reducers";
import useStyles from "../styles/checkout";
import { Formik, Form } from "formik";
import axios from "axios";
import aesjs from "aes-js";

function getSteps() {
  return ["Address", "Payment Methods"];
}

interface ComponentProps {
  cart: IState["cart"];
  placeOrder: Function;
}

const Checkout: FC<ComponentProps> = props => {
  const classes = useStyles();
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [data, setData] = React.useState({
    fullName: "",
    street: "",
    city: "",
    country: "",
    email: "",
    phoneNumber: "",
    paymentMethod: "a",
  });

  useEffect(() => {
    if (!props.cart.length) router.replace("/");
  });

  function getStepContent(step: any) {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <Grid className={classes.inputContainer} item xs={12}>
              <Box component='span' className={classes.title}>
                <Typography variant='h6'>Shipping Details</Typography>
              </Box>
            </Grid>
            <Grid className={classes.inputContainer} item xs={12} md={4}>
              <TextField
                label='Full Name'
                fullWidth
                variant='outlined'
                value={data.fullName}
                onChange={e => handleChange({ fullName: e.target.value })}
                required
              ></TextField>
            </Grid>
            <Grid className={classes.inputContainer} item xs={12} md={4}>
              <TextField
                label='Email'
                fullWidth
                variant='outlined'
                value={data.email}
                onChange={e => handleChange({ email: e.target.value })}
                required
              ></TextField>
            </Grid>
            <Grid className={classes.inputContainer} item xs={12} md={4}>
              <TextField
                label='Phone Number'
                fullWidth
                variant='outlined'
                value={data.phoneNumber}
                onChange={e => handleChange({ phoneNumber: e.target.value })}
                required
              ></TextField>
            </Grid>
            <Grid className={classes.inputContainer} item xs={12} md={6}>
              <TextField
                label='Address'
                fullWidth
                variant='outlined'
                value={data.street}
                onChange={e => handleChange({ street: e.target.value })}
                required
              ></TextField>
            </Grid>
            <Grid className={classes.inputContainer} item xs={6} md={3}>
              <TextField
                label='City'
                fullWidth
                variant='outlined'
                value={data.city}
                onChange={e => handleChange({ city: e.target.value })}
                required
              ></TextField>
            </Grid>
            <Grid className={classes.inputContainer} item xs={6} md={3}>
              <TextField
                label='Country'
                fullWidth
                variant='outlined'
                value={data.country}
                onChange={e => handleChange({ country: e.target.value })}
                required
              ></TextField>
            </Grid>
          </React.Fragment>
        );
      case 1:
        return (
          <div>
            Easy Paisa/ Cash on Delivery
            <iframe
              id='easypay-iframe'
              name='easypay-iframe'
              src='about:blank'
              width='100%'
              height='500px'
            ></iframe>
          </div>
        );
      default:
        return "Unknown step";
    }
  }

  const encrypt = (str: string) => {
    const hashKey = "M7E2LM02OQWTSSZK";

    const keyBuffer = aesjs.utils.utf8.toBytes(hashKey);
    const inputBuffer = aesjs.padding.pkcs7.pad(aesjs.utils.utf8.toBytes(str));
    const escEcb = new aesjs.ModeOfOperation.ecb(keyBuffer);
    const encryptedBytes = escEcb.encrypt(inputBuffer);
    return Buffer.from(encryptedBytes).toString("base64");
  };

  const handlePlaceOrder = async () => {
    const url = "https://easypaystg.easypaisa.com.pk/tpg/?";
    let encryptedString = "";
    // const cart = props.cart.map(item => ({
    //   productId: item.id,
    //   quantity: item.quantity,
    //   price: item.price,
    //   name: `${item.category} ${item.title}-${item.class} ${item.medium} Medium`.toUpperCase(),
    // }));

    // props.placeOrder({ ...data, cart });
    const tokenExpiry = new Date();
    // tokenExpiry.setDate(8);

    const params: { [key: string]: any } = {
      amount: "10.0",
      orderRefNum: 1221,
      paymentMethod: "InitialRequest",
      postBackURL: "https://www.google.com",
      storeId: 14013,
      timeStamp: new Date().toISOString(),
    };

    encryptedString = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join("&");

    console.log(encryptedString);
    const encryptedData = encrypt(encryptedString);
    console.log(encryptedData);

    const newParams: {
      [key: string]: any;
    } = {
      storeId: 14013,
      orderId: 1221,
      transactionAmount: "10.0",
      mobileAccountNo: "",
      emailAddress: "",
      transactionType: "InitialRequest",
      tokenExpiry: "",
      bankIdentificationNumber: "",
      encryptedHashedRequest: encryptedData,
      merchantPaymentMethod: "",
      postBackURL: "www.google.com",
      signature: "",
    };

    const iframe = document.getElementById("easypay-iframe")!;

    let string = Object.keys(newParams)
      .map(key => `${key}=${newParams[key]}`)
      .join("&");

    iframe.setAttribute("src", url + string);

    console.log(url + string);
  };

  const handleChange = (obj: any) => {
    setData({ ...data, ...obj });
  };

  const isDisabled = () => {
    return Object.values(data).some(field => field === "");
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Container>
                <Grid container className={classes.gridContainer}>
                  {getStepContent(index)}
                </Grid>
              </Container>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={
                      activeStep === steps.length - 1
                        ? handlePlaceOrder
                        : handleNext
                    }
                    className={classes.button}
                    disabled={isDisabled()}
                  >
                    {activeStep === steps.length - 1 ? `Place Order` : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { placeOrder })(Checkout);
