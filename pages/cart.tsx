import React from "react";
import { NextPage } from "next";
import { connect } from "react-redux";
import {
  CartItem,
  addToCart,
  removeFromCart,
  AddToCartAction,
  RemoveFromCartAction,
} from "../src/actions";
import { IState } from "../src/reducers";
import useStyles from "../styles/cart";
import { Box, Grid, Typography, Button } from "@material-ui/core";
import Image from "next/image";
import PlusIcon from "../public/svg/plus.svg";
import MinusIcon from "../public/svg/minus.svg";
import LockIcon from "../public/svg/lock.svg";
import { useRouter } from "next/dist/client/router";
import CancelIcon from "../public/svg/cancel.svg";
import { selectItem } from "../src/actions/items";

interface PageProps {
  cart: CartItem[];
  addToCart: (item: CartItem, quatity?: number) => void;
  removeFromCart: (item: CartItem, quatity?: number) => void;
  selectItem: (item: CartItem) => void;
}

const Cart: NextPage<PageProps> = props => {
  const classes = useStyles();
  const router = useRouter();
  const totalPrice = props.cart.reduce(
    (acc, val) => acc + val.quantity * val.price * (1 - val.discount / 100),
    0
  );

  if (!props.cart.length) {
    return (
      <Box className={classes.root}>
        <Typography align='center' variant='h6' className={classes.empty}>
          Cart is currently Empty
          <Box className={classes.buttonContainer}>
            <Box
              className={classes.button}
              component='span'
              onClick={() => router.push("/")}
            >
              Visit Store
            </Box>
          </Box>
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container justifyContent='center' className={classes.root}>
      <Grid item xl={9} lg={10} xs={11} container className={classes.container}>
        <Grid
          className={`${classes.gridItem} ${classes.orderDetails}`}
          container
          item
          lg={8}
          xs={12}
        >
          <Grid className={classes.row} item xs={12} container>
            <Grid item xs={3}>
              <Typography component='h5' variant='subtitle2' align='left'>
                Product
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography component='h5' variant='subtitle2' align='left'>
                Price
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography component='h5' variant='subtitle2' align='center'>
                Qty
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography component='h5' variant='subtitle2' align='center'>
                Total
              </Typography>
            </Grid>
          </Grid>
          {props.cart.map(item => (
            <Grid
              key={item.product_id}
              item
              xs={12}
              container
              className={classes.row}
              alignContent='center'
            >
              <Grid item xs={3}>
                <Box className={classes.imageContainer}>
                  <Image
                    width={70}
                    height={100}
                    src={item.image_url}
                    alt='book-title-image'
                    onClick={() => props.selectItem(item)}
                  />
                  <Box
                    component='span'
                    className={classes.cancelIcon}
                    onClick={() => props.removeFromCart(item, 10000)}
                  >
                    <CancelIcon
                      width={13}
                      height={13}
                      alt='remove-all-from-cart'
                    />
                  </Box>
                </Box>
                <Typography variant='subtitle2' align='left'>
                  {item.product_name}
                </Typography>
                <Typography
                  variant='subtitle2'
                  align='left'
                  className={classes.productId}
                >
                  #{item.product_id}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant='subtitle2' align='left'>
                  Rs.{Math.ceil(item.price * (1 - item.discount / 100))}/-
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='subtitle2' align='center'>
                  <Box className={classes.button} component='span'>
                    <MinusIcon
                      width={12}
                      height={12}
                      onClick={() => props.removeFromCart(item)}
                    />
                  </Box>
                  {item.quantity}
                  <Box className={classes.button} component='span'>
                    <PlusIcon
                      width={12}
                      height={12}
                      alt='increase quantity by one'
                      onClick={() => props.addToCart(item)}
                    />
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='subtitle2' align='center'>
                  {Math.ceil(
                    item.price * item.quantity * (1 - item.discount / 100)
                  )}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid
          className={`${classes.gridItem} ${classes.paymentDetails}`}
          item
          container
          justifyContent='flex-start'
          alignItems='flex-start'
          lg={4}
          xs={12}
        >
          <Grid className={classes.checkoutContainer} item container>
            <Grid item xs={12}>
              <Box className={classes.line}></Box>
            </Grid>
            <Grid item xs={12}>
              <Typography component='h6' className={classes.cartTotal}>
                Cart Total
                <Box component='span'>Rs {totalPrice.toPrecision(2)}/-</Box>
                <Box component='div'>
                  <Typography className={classes.message}>
                    Shipping calculated at checkout
                  </Typography>
                </Box>
              </Typography>
            </Grid>

            <Button
              className={classes.checkoutBtn}
              onClick={() => router.push("/checkout")}
            >
              Checkout
              <LockIcon width={17} height={17} alt='Lock icon' fill='white' />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, {
  addToCart,
  removeFromCart,
  selectItem,
})(Cart);
