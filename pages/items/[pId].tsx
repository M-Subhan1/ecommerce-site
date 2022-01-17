import React, { EventHandler, useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart, CartItem } from "../../src/actions";
import { useRouter } from "next/dist/client/router";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  TextField,
} from "@material-ui/core";
import Image from "next/image";
import { NextPage } from "next";
import useStyles from "../../styles/productDetails";
import { IState } from "../../src/reducers";
import { fetchItem } from "../../src/actions/items";
import axios from "axios";

interface PageProps {
  product: CartItem | null;
  addToCart: (item: CartItem, qty?: number) => void;
  fetchItem: (id: any) => void;
}

const ViewItem: NextPage<PageProps> = props => {
  const router = useRouter();
  const classes = useStyles();
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(props.product);

  useEffect(() => {
    if (!product && router.query.pId) {
      (async () => {
        const res = await axios.get(`/api/products/${router.query.pId}`);
        if (!res.data?.item) router.push("/404");
        setProduct(res.data.item);
      })();
    }
  });

  const handleChange: EventHandler<any> = event => {
    setQty(event.target.value);
  };

  const handleAddToCart: EventHandler<any> = () => {
    if (!props.product) return;
    if (qty >= 1 || qty <= props.product.stock)
      props.addToCart(props.product, qty);
  };

  if (!product) return <div>Hello</div>;

  return (
    <Container className={classes.pageContainer}>
      <Grid justifyContent='center' container className={classes.itemContainer}>
        <Grid
          container
          justifyContent='center'
          item
          lg={4}
          md={5}
          // s={4}
          xs={12}
        >
          <Image alt='title' width={500} height={500} src={product.image_url} />
        </Grid>
        <Grid
          className={classes.detailsContainer}
          item
          container
          direction='column'
          justifyContent='space-between'
          lg={4}
          md={5}
          xs={12}
        >
          <Box>
            <Typography className={classes.title} variant='h5' align='center'>
              {product.product_name}
            </Typography>
            <Typography className={classes.description}>
              {props?.product?.product_description}
            </Typography>
          </Box>
          <Box>
            {product.quantity <= 0 ? (
              <Box className={classes.outOfStock}>
                <Typography align='center'>Out of Stock</Typography>
              </Box>
            ) : (
              <Grid
                container
                justifyContent='space-between'
                alignContent='center'
              >
                <Grid item xs={6}>
                  <Button
                    variant='outlined'
                    color='secondary'
                    className={classes.button}
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    error={qty < 1 || qty > product.quantity}
                    helperText={
                      qty <= 0 ? "Quantity cannot be less than 1" : ""
                    }
                    value={qty}
                    onChange={handleChange}
                    required
                    label='Qty'
                    fullWidth
                    variant='outlined'
                  />
                </Grid>
              </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

interface Context {
  params: {
    pId: string;
  };
}

const mapStateToProps = (state: IState) => {
  return {
    product: state.selectedItem,
  };
};

export default connect(mapStateToProps, { addToCart, fetchItem })(ViewItem);
