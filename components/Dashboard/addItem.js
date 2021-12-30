import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import * as productTypes from "../../PRODUCT_TYPES";
import axios from "axios";
import { connect } from "react-redux";

const config = {
  title: "",
  description: "",
  type: "",
  medium: "",
  quantity: "",
  price: "",
  productId: "",
  discount: "",
};

const Add = props => {
  const { classes } = props;
  const [itemDetails, setItemDetails] = useState(config);
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);

  const handleImageUpload = event => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData();

    const data = {
      image,
      ...itemDetails,
      token: localStorage.getItem("token"),
    };

    Object.keys(data).forEach(key => formData.append(key, data[key]));

    const res = await axios.post("/api/products/upload", formData);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setItemDetails({ ...itemDetails, [name]: value });
    setError(Object.keys(itemDetails).some(item => item === ""));
  };

  const handleSelectCategory = event => {
    setItemDetails({ ...itemDetails, type: event.target.value });
  };

  const handleSelectGrade = event => {
    setItemDetails({ ...itemDetails, class: event.target.value });
  };

  const handleSelectMedium = event => {
    setItemDetails({ ...itemDetails, medium: event.target.value });
  };

  return (
    <Grid container className={classes.itemContainer}>
      <Grid item xs={12} className={classes.headingsContainer}>
        <Typography
          className={classes.itemMenuHeading}
          align='left'
          variant='h6'
        >
          Add Item
        </Typography>
        <Typography align='left' variant='subtitle2'>
          Please Fill the form below
        </Typography>
      </Grid>
      <Grid item md={6} xs={12} className={classes.items}>
        <TextField
          onChange={handleInputChange}
          name='title'
          value={itemDetails.title}
          label='Title'
          required
          fullWidth
          variant='outlined'
        />
      </Grid>
      <Grid item md={6} xs={12} className={classes.items}>
        <TextField
          onChange={handleInputChange}
          name='description'
          value={itemDetails.description}
          label='Description'
          required
          fullWidth
          variant='outlined'
        />
      </Grid>
      <Grid item xs={12}>
        <Typography
          align='left'
          variant='subtitle2'
          className={classes.headingsContainer}
        >
          Product Type
        </Typography>
      </Grid>
      <Grid className={classes.items} item md={4} xs={12}>
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel id='demo-simple-select-outlined-label'>
            Product
          </InputLabel>
          <Select
            fullWidth
            labelId='demo-simple-select-outlined-label'
            id='demo-simple-select-outlined'
            value={itemDetails.category}
            onChange={handleSelectCategory}
            label='Product'
          >
            <MenuItem value={productTypes.SOLUTIONS}>
              Textbook Solutions
            </MenuItem>
            <MenuItem value={productTypes.QUESTION_BANKS}>
              Question Banks
            </MenuItem>
            <MenuItem value={productTypes.GUIDES}>Guides</MenuItem>
            <MenuItem value={productTypes.UP_TO_DATE}>
              Up-to-date Papers
            </MenuItem>
            <MenuItem value={productTypes.SOLVED_UP_TO_DATE}>
              Solved Up-to-date Papers
            </MenuItem>
            <MenuItem value={productTypes.SELF_TEST_PAPERS}>
              Self Test Papers
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid className={classes.items} item md={4} xs={12}>
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel id='demo-simple-select-outlined-label'>Class</InputLabel>
          <Select
            labelId='demo-simple-select-outlined-label'
            id='demo-simple-select-outlined'
            value={itemDetails.grade}
            onChange={handleSelectGrade}
            label='Age'
          >
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
      <Grid className={classes.items} item md={4} xs={12}>
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel>Medium</InputLabel>
          <Select
            id='medium'
            value={itemDetails.medium}
            onChange={handleSelectMedium}
            label='Medium'
          >
            <MenuItem value='urdu'>Urdu</MenuItem>
            <MenuItem value='english'>English</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} className={classes.headingsContainer}>
        <Typography align='left' variant='subtitle2'>
          Product Quantity and Price
        </Typography>
      </Grid>
      <Grid className={classes.items} item md={3} xs={6}>
        <TextField
          onChange={handleInputChange}
          value={itemDetails.price}
          name='price'
          label='Price'
          required
          fullWidth
          variant='outlined'
        />
      </Grid>
      <Grid className={classes.items} item md={3} xs={6}>
        <TextField
          onChange={handleInputChange}
          value={itemDetails.quantity}
          name='quantity'
          label='Quantity'
          required
          fullWidth
          variant='outlined'
        />
      </Grid>
      <Grid className={classes.items} item md={3} xs={6}>
        <TextField
          onChange={handleInputChange}
          value={itemDetails.discount}
          name='discount'
          label='Discount'
          required
          fullWidth
          variant='outlined'
        />
      </Grid>
      <Grid className={classes.items} item md={3} xs={6}>
        <TextField
          onChange={handleInputChange}
          value={itemDetails.productId}
          name='productId'
          label='Product ID'
          required
          fullWidth
          variant='outlined'
        />
      </Grid>
      <Grid item xs={12} className={classes.headingsContainer}>
        <Typography align='left' variant='subtitle2'>
          Image
        </Typography>
      </Grid>
      <Grid className={classes.fileUploadContainer} item xs={6}>
        <Box className={classes.fileUpload}>
          <div className={classes.fileInput}>
            <input
              onChange={handleImageUpload}
              id='file'
              type='file'
              accept='image/*'
            ></input>
          </div>
          <label className={classes.imageLabel} htmlFor='file'>
            Choose a title Image
          </label>
        </Box>
      </Grid>
      <Grid
        // className={classes.saveBtn}
        container
        justifyContent='flex-end'
        item
        xs={6}
      >
        <Button
          disabled={error}
          onClick={handleSubmit}
          color='primary'
          variant='contained'
          className={classes.saveBtn}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  );
};

export default connect()(Add);
