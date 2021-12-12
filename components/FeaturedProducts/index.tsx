import { FC } from "react";
import useStyles from "./styles";
import { Box, Typography, Grid, Container } from "@material-ui/core";
import { connect } from "react-redux";
import { addToCart, CartItem } from "../../src/actions";
import Card from "../Card";

interface ComponentProps {
  featuredBooks: CartItem[];
  addToCart: (item: CartItem, b?: number) => void;
}

const FeaturedProducts: FC<ComponentProps> = props => {
  const classes = useStyles();

  const renderCards = () => {
    return props.featuredBooks.map(book => (
      <Grid
        key={book.id}
        sm={6}
        lg={4}
        xs={12}
        item
        className={classes.gridItems}
      >
        <Card
          card={{
            item: book,
          }}
          addToCart={props.addToCart}
        />
      </Grid>
    ));
  };

  if (!props.featuredBooks.length) return <div></div>;

  return (
    <Container className={classes.root}>
      <Typography variant='h4' align='center' className={classes.heading}>
        Featured Products
      </Typography>
      <Grid container>{renderCards()}</Grid>
    </Container>
  );
};

export default connect(null, { addToCart })(FeaturedProducts);
