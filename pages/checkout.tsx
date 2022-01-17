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
import { placeOrder, emptyCart } from "../src/actions";
import { IState } from "../src/reducers";
import useStyles from "../styles/checkout";

function getSteps() {
  return ["Address", "Payment Methods"];
}

interface ComponentProps {
  cart: IState["cart"];
  placeOrder: Function;
  emptyCart: Function;
  user: any;
}

const Checkout: FC<ComponentProps> = props => {
  const classes = useStyles();
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [data, setData] = React.useState({
    first_name: "",
    last_name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    phone_number: "",
  });

  useEffect(() => {
    const user = props.user;
    if (!user) return;

    setData({
      first_name: user.first_name,
      last_name: user.last_name,
      street: user.street,
      city: user.city,
      state: user.state,
      country: user.country,
      phone_number: user.phone_number,
    });
  }, [props.user]);

  useEffect(() => {
    if (!props.cart.length) router.replace("/");
    else if (!props.user) router.replace("/login");
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
            <Grid className={classes.inputContainer} item xs={12} md={6}>
              <TextField
                label='First Name'
                fullWidth
                variant='outlined'
                value={data.first_name}
                onChange={e => handleChange({ first_name: e.target.value })}
                required
              ></TextField>
            </Grid>
            <Grid className={classes.inputContainer} item xs={12} md={6}>
              <TextField
                label='Last Name'
                fullWidth
                variant='outlined'
                value={data.last_name}
                onChange={e => handleChange({ last_name: e.target.value })}
                required
              ></TextField>
            </Grid>
            <Grid className={classes.inputContainer} item xs={12} md={8}>
              <TextField
                label='Street'
                fullWidth
                variant='outlined'
                value={data.street}
                onChange={e => handleChange({ street: e.target.value })}
                required
              ></TextField>
            </Grid>
            <Grid className={classes.inputContainer} item xs={12} md={4}>
              <TextField
                label='Phone Number'
                fullWidth
                variant='outlined'
                value={data.phone_number}
                onChange={e => handleChange({ phone_number: e.target.value })}
                required
              ></TextField>
            </Grid>
            <Grid className={classes.inputContainer} item xs={6} md={4}>
              <TextField
                label='City'
                fullWidth
                variant='outlined'
                value={data.city}
                onChange={e => handleChange({ city: e.target.value })}
                required
              ></TextField>
            </Grid>
            <Grid className={classes.inputContainer} item xs={6} md={4}>
              <TextField
                label='State'
                fullWidth
                variant='outlined'
                value={data.state}
                onChange={e => handleChange({ state: e.target.value })}
                required
              ></TextField>
            </Grid>
            <Grid className={classes.inputContainer} item xs={6} md={4}>
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
        return <div>Add Payment methods (if needed)</div>;
      default:
        return "Unknown step";
    }
  }

  const handlePlaceOrder = async () => {
    props.placeOrder({ cart: props.cart, data });
    props.emptyCart();
    router.push("/");
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
    user: state.user,
  };
};

export default connect(mapStateToProps, { placeOrder, emptyCart })(Checkout);
