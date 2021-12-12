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
import { gql } from "@apollo/client";
import client from "../../apollo-client";

interface PageProps {
  product: CartItem;
  addToCart: (item: CartItem, qty?: number) => void;
}

const ViewItem: NextPage<PageProps> = props => {
  const router = useRouter();
  const classes = useStyles();
  const [qty, setQty] = useState(1);
  const { product } = props;

  useEffect(() => {
    if (!props.product) router.push("/404");
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
          <Image
            alt='title'
            width={350}
            height={500}
            src={`${process.env.STRAPI_URL}${props.product.image.url}`}
          />
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
              {props.product.title}
            </Typography>
            <Typography className={classes.description}>
              {props.product.category.description}
            </Typography>
          </Box>
          <Box>
            {props.product.quantity <= 0 ? (
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
                    error={qty < 1 || qty > props.product.quantity}
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

export const getStaticProps = async (context: Context) => {
  const { pId } = context.params;

  const { data } = await client.query({
    query: gql`
      {
        product(id: "${pId}") {
          id
          title
          medium
          class
          stock
          image {
            url
          }
          category {
            type
            description
          }
          price
          discount
        }
      }
    `,
  });

  return {
    props: {
      product: data.product,
    },
  };
};

export const getStaticPaths = async () => {
  const response = await client.query({
    query: gql`
      query {
        products {
          id
        }
      }
    `,
  });

  const { data } = response;

  const paths = data.products.map((e: { id: string }) => ({
    params: { pId: e.id },
  }));

  return {
    // paths: [{ params: { pId: "1" } }, { params: { pId: "2" } }],
    paths,
    fallback: false,
  };
};

export default connect(null, { addToCart })(ViewItem);
