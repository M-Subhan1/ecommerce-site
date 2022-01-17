import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { Box, Grid, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddItem from "../../components/dashboard/addItem";
import ViewItems from "../../components/dashboard/viewItems";
import { useRouter } from "next/dist/client/router";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: "#2e2e2e",
      minHeight: "80vh",
    },
  },

  container: {
    marginTop: "4rem",
  },
  sidebar: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "250px",
    height: "100vh",
    backgroundColor: "rgb(54, 54, 54)",
    display: "flex",
    flexDirection: "column",
    padding: "1.25rem 0 1.5rem 0",
    justifyContent: "space-between",
    zIndex: 10000,
    boxShadow: "1px 2px 8px #000",
  },

  sidebarClosed: {
    width: "70px",
  },

  contentContainer: {
    padding: "0 5rem 0 0",
    [`${theme.breakpoints.down(theme.breakpoints.values.md)}`]: {
      padding: "0",
    },
  },

  close: {
    width: "0",
    display: "none",
  },

  option: {
    width: "100%",
    position: "relative",
    color: "white",
    padding: "0.5rem 0 0.5rem 0",
    fontSize: "0.9rem",
    margin: "0.35rem 0 0.35rem 0",
  },

  menuLabels: {
    color: "white",
  },

  icon: {
    marginRight: "0.25rem",
  },

  content: {
    marginTop: "4.5rem",
    color: "white",
    fontSize: "5rem",
  },

  revenueCard: {
    padding: "1rem",
  },

  revenueInfo: {
    backgroundColor: "white",
    height: "14rem",
    borderRadius: "5px",
  },

  revenueSummary: {
    width: "100%",
    height: "30rem",
    backgroundColor: "#121212",
    borderRadius: "5px",
  },

  statistics: {
    width: "100%",
    height: "12rem",
    backgroundColor: "#121212",
    marginBottom: "5rem",
    borderRadius: "5px",
  },

  itemContainer: {
    padding: "2rem",
    marginBottom: "3rem",
    minHeight: "65vh",
    borderRadius: "5px",
    backgroundColor: "white",
    color: "black",
  },

  formControl: {
    width: "100%",
  },

  items: {
    padding: "0.5rem",
    height: "6rem",
  },

  headingsContainer: {
    padding: "0 0.5rem 0rem 0.5rem",
  },

  itemMenuHeading: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 400,
    fontSize: "1.25rem",
  },

  fileUploadContainer: {
    padding: "0.5rem",
  },

  fileUpload: {
    position: "relative",
  },

  fileInput: {
    display: "none",
  },

  imageLabel: {
    color: "white",
    height: "50px",
    width: "200px",
    backgroundColor: "#f5af09",
    position: "absolute",

    top: 0,
    left: 0,

    fontSize: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  saveBtn: {
    width: "200px",
    height: "50px",
  },

  ordersContainer: {
    background: "white",
    margin: "1rem 0 3rem 0",
    minHeight: "70vh",
  },

  editProductContainer: {
    borderRadius: "5px",
    background: "white",
    margin: "10rem 0 9rem 0",
    minHeight: "25vh",
    padding: "2rem",
  },

  submitBtn: {
    padding: "1rem",
  },

  multiLineColor: {
    backgroundColor: "white",
  },

  gridItem: {
    padding: "0 2rem 0 2rem",
    height: "5rem",
  },

  editContainer: {
    paddingTop: "10rem",
    minHeight: "70vh",
  },

  editForm: {
    borderRadius: "10px",
    padding: "3.5rem",
    color: "black",
    backgroundColor: "white",
  },

  updateButton: {
    padding: "0",
  },
}));

const Dashboard = props => {
  const router = useRouter();
  const classes = useStyles();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [option, setOption] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = props.user;

    if (!user) router.push("/login");
    if (user.account_type != "admin") router.push("/");
  }, []);

  const options = [
    <AddItem key='add' classes={classes} />,
    <ViewItems key='delete' classes={classes} />,
  ];

  const handleSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const Sidebar = () => {
    return (
      <Box
        className={`${classes.menuLabels} ${classes.sidebar} ${
          isSidebarOpen ? "" : classes.sidebarClosed
        }`}
      >
        <Button
          className={classes.option}
          onClick={handleSidebarOpen}
          variant='text'
        >
          <MenuIcon />
        </Button>
        <Box>
          <Button
            className={classes.option}
            onClick={() => setOption(0)}
            variant='text'
          >
            <AddIcon className={classes.icon} />
            <span
              align='center'
              className={`${isSidebarOpen ? "" : classes.close}`}
            >
              Add a Product
            </span>
          </Button>

          <Button
            className={classes.option}
            onClick={() => setOption(1)}
            variant='text'
          >
            <DeleteIcon className={classes.icon} />
            <span
              align='center'
              className={`${isSidebarOpen ? "" : classes.close}`}
            >
              Delete Product
            </span>
          </Button>
        </Box>
        <Button
          className={classes.option}
          onClick={() => setOption}
          variant='text'
        >
          <ExitToAppIcon className={classes.icon} />
          <span
            align='center'
            className={`${isSidebarOpen ? "" : classes.close}`}
          >
            Exit
          </span>
        </Button>
      </Box>
    );
  };

  return (
    <Box className={classes.container}>
      <Sidebar />
      <Grid container className={classes.contentContainer}>
        <Grid item xs={isSidebarOpen ? 2 : 1} />
        <Grid className={classes.content} item xs={isSidebarOpen ? 10 : 11}>
          {options[option]}
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Dashboard);
