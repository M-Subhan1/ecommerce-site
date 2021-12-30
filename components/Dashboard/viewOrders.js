import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Grid, Button, Container } from "@material-ui/core";
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
import axios from "axios";
import { FormControl, MenuItem, InputLabel, Select } from "@material-ui/core";

function createData(
  id,
  items,
  cost,
  status,
  payment,
  details,
  purchaser,
  address
) {
  return {
    id,
    items,
    cost,
    status,
    payment,
    details,
    purchaser,
    address,
  };
}

function Row(props) {
  const { row, selectOrder } = props;
  const [open, setOpen] = React.useState(false);
  const classes = props.classes;

  const handleDelete = async orderId => {
    await axios.delete(`/api/orders/${orderId}`);
    props.setOrdersArray(
      props.ordersArray.filter(order => order._id !== orderId)
    );
  };

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
        <TableCell align='right'>{row.items}</TableCell>
        <TableCell align='right'>{row.cost}</TableCell>
        <TableCell align='right'>{row.status}</TableCell>
        <TableCell align='right'>{row.payment}</TableCell>
        <TableCell align='center'>
          <Button onClick={() => selectOrder(row)}>
            <EditIcon />
          </Button>
          <Button color='secondary' onClick={() => handleDelete(row.id)}>
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
                    Name: {row.purchaser.fullName}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography
                    align='center'
                    variant='body2'
                    gutterBottom
                    component='div'
                  >
                    Email: {row.purchaser.email}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography
                    align='center'
                    variant='body2'
                    gutterBottom
                    component='div'
                  >
                    Phone: {row.purchaser.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography
                    align='left'
                    variant='body2'
                    gutterBottom
                    component='div'
                  >
                    Address: {`${row.address.street}, ${row.address.city}`}
                  </Typography>
                </Grid>
              </Grid>

              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Id</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell align='right'>Quantity</TableCell>
                    <TableCell align='right'>Total price (Rs)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map(detailsRow => (
                    <TableRow key={detailsRow.productId}>
                      <TableCell component='th' scope='row'>
                        {detailsRow.productId}
                      </TableCell>
                      <TableCell>{detailsRow.name}</TableCell>
                      <TableCell align='right'>{detailsRow.quantity}</TableCell>
                      <TableCell align='right'>
                        {` ${detailsRow.price} X ${detailsRow.quantity} = ${
                          detailsRow.price * detailsRow.quantity
                        }`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    items: PropTypes.number.isRequired,
    cost: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    payment: PropTypes.string.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const rows = [];

const initialState = {
  fullName: "",
  street: "",
  city: "",
  country: "",
  email: "",
  phoneNumber: "",
};

export default function Orders(props) {
  const classes = props.classes;
  const [rows, setRows] = useState([]);
  const [ordersArray, setOrdersArray] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const handleChangeOrder = event => {
    setOrderStatus(event.target.value);
  };

  const handleChangePayment = event => {
    setPaymentStatus(event.target.value);
  };

  useEffect(() => {
    if (ordersArray.length) return;

    (async () => {
      const {
        data: { orders },
      } = await axios.get("/api/orders");
      setOrdersArray(orders);
    })();
  }, []);

  useEffect(() => {
    console.log(ordersArray);
    setRows(
      ordersArray.map(order =>
        createData(
          order._id,
          order.order.reduce((acc, val) => acc + val.quantity, 0),
          order.bill.amount,
          order.status,
          order.bill.status,
          order.order,
          order.purchaser,
          order.address
        )
      )
    );
  }, [ordersArray]);

  useEffect(() => {
    if (!selectedOrder) return;
    setPaymentStatus(selectedOrder.payment);
    setOrderStatus(selectedOrder.status);
  }, [selectedOrder]);

  if (!ordersArray.length)
    return (
      <Box className={props.classes.ordersContainer}>No Active Orders</Box>
    );

  if (!selectedOrder)
    return (
      <Box>
        <Typography variant='h5' align='center'>
          Active Orders
        </Typography>
        <TableContainer
          component={Paper}
          className={props.classes.ordersContainer}
        >
          <Table aria-label='collapsible table'>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Order Id</TableCell>
                <TableCell align='right'>Items</TableCell>
                <TableCell align='right'>Amount Payable (Rs)</TableCell>
                <TableCell align='right'>Status</TableCell>
                <TableCell align='right'>Payment</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <Row
                  key={row.name}
                  row={row}
                  selectOrder={setSelectedOrder}
                  ordersArray={ordersArray}
                  setOrdersArray={setOrdersArray}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );

  console.log(selectedOrder);
  return (
    <Box>
      <Typography variant='h6' align='center' className={classes.heading}>
        Edit Order
      </Typography>
      <Container className={classes.editContainer}>
        <Box className={classes.editForm}>
          <Grid container>
            <Grid item xs={6} md={3}>
              <Typography align='center'>{selectedOrder.id}</Typography>
            </Grid>
            <Grid item xs={6} md={3} className={classes.gridItem}>
              <FormControl className={classes.formControl}>
                <InputLabel id='demo-simple-select-label'>
                  Payment Status
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={paymentStatus}
                  onChange={handleChangePayment}
                >
                  <MenuItem value={"paid"}>Paid</MenuItem>
                  <MenuItem value={"unpaid"}>Unpaid</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} className={classes.gridItem}>
              <FormControl className={classes.formControl}>
                <InputLabel id='demo-simple-select-label'>
                  Order Status
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={orderStatus}
                  onChange={handleChangeOrder}
                >
                  <MenuItem value={"processing"}>Processing</MenuItem>
                  <MenuItem value={"shipped"}>Shipped</MenuItem>
                  <MenuItem value={"delivered"}>Delivered</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3} className={classes.updateButton}>
              <Button>Update</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
