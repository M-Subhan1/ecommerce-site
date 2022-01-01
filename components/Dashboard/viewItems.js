import React, { useEffect, useState } from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import { fetchItems, deleteItem } from "../../src/actions/index";
import axios from "axios";
import Image from "next/image";

function createData(id, name, type, price, discount, stock, units_sold) {
  return {
    id,
    name,
    type,
    price,
    discount,
    stock,
    units_sold,
  };
}

function Row(props) {
  const { row, selectProduct } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.id}
        </TableCell>
        <TableCell align='center'>{`${row.name}`.toUpperCase()}</TableCell>
        <TableCell align='center'>{`${row.type}`.toUpperCase()}</TableCell>
        <TableCell align='right'>{row.price}</TableCell>
        <TableCell align='right'>{row.stock}</TableCell>
        <TableCell align='right'>{row.units_sold}</TableCell>
        <TableCell align='right'>{row.discount}</TableCell>
        <TableCell align='center'>
          <Button onClick={() => selectProduct(row)}>
            <EditIcon />
          </Button>
          <Button color='secondary' onClick={() => props.deleteItem(row.id)}>
            <DeleteIcon />
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Grid container>
                <Grid item xs={6} md={4}>
                  <Typography
                    align='left'
                    variant='body2'
                    gutterBottom
                    component='div'
                  >
                    Name: Hello
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography
                    align='center'
                    variant='body2'
                    gutterBottom
                    component='div'
                  >
                    Email: Hmmmm
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography
                    align='center'
                    variant='body2'
                    gutterBottom
                    component='div'
                  >
                    Phone: k
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography
                    align='left'
                    variant='body2'
                    gutterBottom
                    component='div'
                  >
                    Address: Okok
                  </Typography>
                  {/* change */}
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [];

function ViewItems(props) {
  const classes = props.classes;
  const [rows, setRows] = useState([]);

  // For Editing a Product
  const [selectedProduct, setSelectedProduct] = useState(null);

  const initialState = {
    price: 0,
    stock: 0,
    discount: 0,
    image: null,
  };

  const [formValues, setFormValues] = useState(initialState);

  const handleSubmit = () => {
    const formData = new FormData();

    Object.keys(formValues).forEach(key =>
      formData.append(key, formValues[key])
    );

    formData.append("token", localStorage.getItem("token"));
    axios.patch(`/api/products/upload/${selectedProduct.productId}`, formData);
  };

  const setNewValue = (prop, e) => {
    let value;
    if (prop !== "image") value = e.target.value;
    else value = e.target.files[0];
    setFormValues({ ...formValues, [prop]: value });
    console.log(formValues);
  };

  useEffect(() => {
    if (!selectedProduct) return;
    setFormValues({
      quantity: selectedProduct.quantity,
      price: selectedProduct.price,
      discount: selectedProduct.discount,
      image: null,
    });
  }, [selectedProduct]);

  useEffect(() => {
    console.log(props.products);
    if (props.products.length) return;
    props.fetchItems();
  }, []);

  useEffect(() => {
    setRows(
      props.products.map(item =>
        createData(
          item.product_id,
          item.product_name,
          item.product_type,
          item.price,
          item.discount,
          item.stock,
          item.units_sold
        )
      )
    );
  }, [props.products]);

  if (!props.products?.length)
    return <Box className={props.classes.ordersContainer}>No Active Items</Box>;

  if (!selectedProduct)
    return (
      <Box>
        <Typography variant='h6' align='center'>
          Active Products
        </Typography>
        <TableContainer
          component={Paper}
          className={props.classes.ordersContainer}
        >
          <Table aria-label='collapsible table'>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Product Id</TableCell>
                <TableCell align='center'>Name</TableCell>
                <TableCell align='right'>Product Type</TableCell>
                <TableCell align='right'>Price (Rs)</TableCell>
                <TableCell align='right'>Stock</TableCell>
                <TableCell align='right'>Units Sold</TableCell>
                <TableCell align='right'>Discount</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <Row
                  key={row.id}
                  row={row}
                  deleteItem={props.deleteItem}
                  selectProduct={product => setSelectedProduct(product)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );

  return (
    <Box className={classes.editProductContainer}>
      <Grid container>
        <Grid item lg={4} md={6} xs={12}>
          <Image width={180} height={250} src={product.image_url} />
        </Grid>
        <Grid item container lg={8} md={6} xs={12}>
          <Grid item xs={4} className={classes.gridItem}>
            <TextField
              onChange={e => setNewValue("stock", e)}
              value={formValues.stock}
              fullWidth
              variant='outlined'
              required
              label='In Stock'
            />
          </Grid>
          <Grid item xs={4} className={classes.gridItem}>
            <TextField
              onChange={e => setNewValue("price", e)}
              value={formValues.price}
              fullWidth
              variant='outlined'
              required
              label='Price'
            />
          </Grid>
          <Grid item xs={4} className={classes.gridItem}>
            <TextField
              onChange={e => setNewValue("discount", e)}
              value={formValues.discount}
              fullWidth
              variant='outlined'
              required
              label='Discount'
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Box className={classes.fileUpload}>
              <div className={classes.fileInput}>
                <input
                  onChange={e => setNewValue("image", e)}
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
            item
            xs={6}
            className={classes.gridItem}
            container
            justifyContent='flex-end'
            alignItems='flex-start'
          >
            <Button
              onClick={handleSubmit}
              variant='contained'
              color='primary'
              className={classes.submitBtn}
              disabled={Object.values(formValues).some(
                val => val === 0 || val === null
              )}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

const mapStateToProps = state => {
  console.log(state);
  return {
    products: state.items,
  };
};

export default connect(mapStateToProps, { fetchItems, deleteItem })(ViewItems);
