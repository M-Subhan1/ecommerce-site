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
import { fetchItems, addToCart } from "../src/actions";
import useStyles from "../styles";
import { IState } from "../src/reducers";
import Card from "../components/Card";
import { prisma } from "../src/db";

interface PageProps {
  books: IState["books"];
  fetchItems: () => void;
  addToCart: (item: CartItem, qty?: number) => void;
}

enum Category {
  qBank = "question-bank",
  solution = "textbook-solution",
  guide = "textbook-guide",
  selfTest = "self-test-paper",
  upToDatePapers = "up-to-date-paper",
  solvedUpToDatePapers = "solved-up-to-date-paper",
}

enum Medium {
  EN = "english",
  UR = "urdu",
}

const config = {
  medium: "All",
  grade: "All",
  category: "All",
};

const ViewCategory: NextPage<PageProps> = props => {
  const classes = useStyles();
  const [filtersObj, setFiltersObj] = React.useState(config);

  const searchResults = props.books.filter(book => {
    if (
      filtersObj.category !== "All" &&
      book.category.type !== filtersObj.category
    )
      return false;
    if (filtersObj.grade !== "All" && book.class !== parseInt(filtersObj.grade))
      return false;
    if (filtersObj.medium !== "All" && book.medium !== filtersObj.medium)
      return false;
    return true;
  });

  useEffect(() => {
    if (!props.books.length) props.fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (property: string, event: any) => {
    setFiltersObj({ ...filtersObj, [property]: event.target.value });
  };

  return (
    <Container className={classes.root}>
      <Grid container justifyContent='center'>
        <Grid
          className={`${classes.gridItem} ${classes.gridFilters}`}
          item
          md={4}
          lg={3}
          xs={10}
        >
          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel id='demo-simple-select-outlined-label'>
              Product
            </InputLabel>
            <Select
              fullWidth
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              value={filtersObj.category}
              onChange={e => handleChange("category", e)}
              label='Product'
            >
              <MenuItem value='All'>All </MenuItem>
              <MenuItem value={Category.solution}>Textbook Solutions</MenuItem>
              <MenuItem value={Category.qBank}>Question Banks</MenuItem>
              <MenuItem value={Category.guide}>Guides</MenuItem>
              <MenuItem value={Category.upToDatePapers}>
                Up-to-date Papers
              </MenuItem>
              <MenuItem value={Category.solvedUpToDatePapers}>
                Solved Up-to-date Papers
              </MenuItem>
              <MenuItem value={Category.selfTest}>Self Test Papers</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          className={`${classes.gridItem} ${classes.gridFilters}`}
          item
          md={3}
          xs={10}
        >
          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel id='demo-simple-select-outlined-label'>
              Class
            </InputLabel>
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              value={filtersObj.grade}
              onChange={e => handleChange("grade", e)}
              label='Age'
            >
              <MenuItem value='All'>All</MenuItem>
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
              <MenuItem value={3}>Three</MenuItem>
              <MenuItem value={4}>Four</MenuItem>
              <MenuItem value={5}>Five</MenuItem>
              <MenuItem value={6}>Six</MenuItem>
              <MenuItem value={7}>Seven</MenuItem>
              <MenuItem value={8}>Eight</MenuItem>
              <MenuItem value={9}>Nine</MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={11}>Eleven</MenuItem>
              <MenuItem value={12}>Twelve</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid
          className={`${classes.gridItem} ${classes.gridFilters}`}
          item
          md={3}
          xs={10}
        >
          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel>Medium</InputLabel>
            <Select
              labelId='demo-smedium'
              id='medium'
              value={filtersObj.medium}
              onChange={e => handleChange("medium", e)}
              label='Medium'
            >
              <MenuItem value='All'>All</MenuItem>
              <MenuItem value={Medium.UR}>Urdu</MenuItem>
              <MenuItem value={Medium.EN}>English</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container className={classes.product}>
        {searchResults.map(book => (
          <Grid
            key={book.id}
            item
            sm={6}
            lg={4}
            xs={12}
            className={classes.gridItem}
          >
            <Card
              card={{
                item: book,
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
  const books = await prisma.$queryRaw`SELECT * FROM Product`;
  return {
    props: {
      books,
    },
  };
};

export default connect(null, { fetchItems, addToCart })(ViewCategory);
