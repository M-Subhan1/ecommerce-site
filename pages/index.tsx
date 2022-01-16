import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NextPage } from "next";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { CartItem } from "../src/actions";
import { fetchItems, addToCart, selectItem } from "../src/actions";
import useStyles from "../styles";
import { IState } from "../src/reducers";
import Card from "../components/Card";
import { prisma } from "../src/db";

interface PageProps {
  items: IState["items"];
  fetchItems: () => void;
  addToCart: (item: CartItem, qty?: number) => void;
  selectItem: (item: CartItem) => void;
}

const config = {
  medium: "All",
  grade: "All",
  category: "All",
};

const ViewCategory: NextPage<PageProps> = props => {
  const classes = useStyles();
  const [filtersObj, setFiltersObj] = React.useState(config);

  const searchResults = props.items.filter(book => {
    if (
      filtersObj.category !== "All"
      // book.category.type !== filtersObj.category
    )
      return false;
    if (filtersObj.grade !== "All") return false;
    if (filtersObj.medium !== "All") return false;
    return true;
  });

  useEffect(() => {
    if (!props.items.length) props.fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (property: string, event: any) => {
    setFiltersObj({ ...filtersObj, [property]: event.target.value });
  };

  return (
    <Container className={classes.root}>
      <Grid container className={classes.product}>
        {searchResults.map(item => (
          <Grid
            key={item.product_id}
            item
            sm={6}
            lg={4}
            xs={12}
            className={classes.gridItem}
            onClick={() => props.selectItem(item)}
          >
            <Card
              card={{
                item,
              }}
              addToCart={props.addToCart}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export const getStaticProps = async () => {
  const products = await prisma.$queryRaw`SELECT * FROM Product`;
  const types =
    await prisma.$queryRaw`SELECT distinct product_type FROM Product`;

  return {
    props: {
      items: products,
      types,
    },
  };
};

export default connect(null, { fetchItems, addToCart, selectItem })(
  ViewCategory
);
