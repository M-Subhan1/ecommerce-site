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
import axios from "axios";
import { connect } from "react-redux";

const config = {
  name: "",
  description: "",
  product_type: "",
  brand: "",
  quantity: 0,
  price: 0,
  discount: 0,
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
          name='name'
          // value={itemDetails.title}
          label='Name'
          required
          fullWidth
          variant='outlined'
        />
      </Grid>
      <Grid item md={6} xs={12} className={classes.items}>
        <TextField
          onChange={handleInputChange}
          name='description'
          // value={itemDetails.description}
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
      <Grid className={classes.items} item md={6} xs={12}>
        <TextField
          onChange={handleInputChange}
          // value={itemDetails.price}
          name='product_type'
          label='Product Type'
          required
          fullWidth
          variant='outlined'
        />
      </Grid>
      <Grid className={classes.items} item md={6} xs={12}>
        <TextField
          onChange={handleInputChange}
          // value={itemDetails.price}
          name='brand'
          label='Brand'
          required
          fullWidth
          variant='outlined'
        />
      </Grid>
      <Grid item xs={12} className={classes.headingsContainer}>
        <Typography align='left' variant='subtitle2'>
          Product Quantity and Price
        </Typography>
      </Grid>
      <Grid className={classes.items} item md={4} xs={6}>
        <TextField
          onChange={handleInputChange}
          // value={itemDetails.price}
          name='price'
          label='Price'
          required
          fullWidth
          variant='outlined'
        />
      </Grid>
      <Grid className={classes.items} item md={4} xs={6}>
        <TextField
          onChange={handleInputChange}
          // value={itemDetails.quantity}
          name='stock'
          label='Stock'
          required
          fullWidth
          variant='outlined'
        />
      </Grid>
      <Grid className={classes.items} item md={4} xs={6}>
        <TextField
          onChange={handleInputChange}
          // value={itemDetails.discount}
          name='discount'
          label='Discount'
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
