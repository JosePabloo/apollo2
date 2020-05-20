import React, { Component } from "react";

import moment from "moment";

import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import { firestore } from "../../firebase";

import Button from "@material-ui/core/Button";

import AddIcon from "@material-ui/icons/Add";

import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";

import Snackbar from "@material-ui/core/Snackbar";

import ClientList from "./ClientCard";

import Fab from "@material-ui/core/Fab";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// import MaterialTableDemo from "./DataTable"

// import  isMobileOnly from 'react-device-detect';

const styles = (theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
  fab: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: "relative",
    minHeight: 200,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },

});

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      setOpen: false,

      snackbarMessage: "",
      snackbarOpen: false,
      snackbarSetOpen: false,

      Fname: "",
      Lname: "",
      Address: "",
      City: "",
      Zipcode: "",
      phoneNumber: "",
      Email: "",

      clientsFromFire: [],
      isLoaded: false,
      renderedList: [],
      hasItBeenDoneLoading: "No",

      isReady: false,
      data: [],
    };
    this.handleFnameChange = this.handleFnameChange.bind(this);
    this.handleLnameChange = this.handleLnameChange.bind(this);
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleChangeZipcode = this.handleChangeZipcode.bind(this);
    this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }

  handleClickOpen = () => {
    this.setState({
      setOpen: true,
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      setOpen: false,
      open: false,
    });
    this.handleClearDataFromNewClientForm();
  };

  snackbarOpen = (numbers, type) => {
    var message = "";
    //Type is the type of message that youre setting.
    // 1 = Field need to be filed out.
    // 2 success!
    // 3 error.
    if (type === 1) {
      message = "There are " + numbers + " fields that need to be filled out.";
    }
    if (type === 2) {
      message = numbers;
    }
    if (type === 3) {
      message = "Error adding document: " + numbers;
    }

    this.setState({
      snackbarMessage: message,
      snackbarOpen: true,
      snackbarSetOpen: true,
    });
    console.log(message);
  };

  snackbarClose = () => {
    this.setState({
      snackbarOpen: false,
      snackbarSetOpen: false,
    });
  };

  testClientData = () => {
    const { clientsFromFire } = this.state;
    const clonelistItems = clientsFromFire.slice();
    this.setState({
      renderedList: clonelistItems,
      isLoaded: true,
    });
  };

  getClientData = () => {
    let { clientsFromFire } = this.state;
    var db = firestore;
    db.collection("clients")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          clientsFromFire.push(doc);
        });
      });
  };

  setTheLoadingState = () => {
    this.setState({
      isLoaded: true,
    });
    console.log("checking the data:", this.state.clientsFromFire);
  };

  addClientClick = () => {
    this.handleClickOpen();
  };

  handleFnameChange(event) {
    this.setState({
      Fname: event.target.value,
    });
  }
  handleLnameChange(event) {
    this.setState({
      Lname: event.target.value,
    });
  }

  handleChangeAddress(event) {
    this.setState({
      Address: event.target.value,
    });
  }
  handleChangeCity(event) {
    this.setState({
      City: event.target.value,
    });
  }
  handleChangeZipcode(event) {
    this.setState({
      Zipcode: event.target.value,
    });
  }
  handleChangePhoneNumber(event) {
    this.setState({
      phoneNumber: event.target.value,
    });
  }
  handleChangeEmail(event) {
    this.setState({
      Email: event.target.value,
    });
  }

  handleClearDataFromNewClientForm() {
    this.setState({
      Fname: "",
      Lname: "",
      Address: "",
      phoneNumber: "",
      City: "",
      Zipcode: "",
      Email: "",
    });
  }
  onLoad = (e) => {
    const docRef = firestore.collection("clients");

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          let data = doc.data();
          this.setState({ data: data });
          console.log("Document data:", data);
        } else {
          // doc.data() will be undefined in this case
          this.setState({ data: null });
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        this.setState({ data: null });
        console.log("Error getting document:", error);
      });
  };

  handleAddClientButtonHasBeenClicked = () => {
    const {
      Fname,
      Lname,
      Address,
      City,
      Zipcode,
      Email,
      phoneNumber,
    } = this.state;
    var db = firestore;
    var flagTrigger = 0;
    //Checking to see if the data is filled in.
    Fname !== "" ? console.log("YES") : (flagTrigger = flagTrigger + 1);
    Lname !== "" ? console.log("YES") : (flagTrigger = flagTrigger + 1);
    Address !== "" ? console.log("YES") : (flagTrigger = flagTrigger + 1);
    City !== "" ? console.log("YES") : (flagTrigger = flagTrigger + 1);
    Zipcode !== "" ? console.log("YES") : (flagTrigger = flagTrigger + 1);
    Email !== "" ? console.log("YES") : (flagTrigger = flagTrigger + 1);
    phoneNumber !== "" ? console.log("YES") : (flagTrigger = flagTrigger + 1);

    if (flagTrigger !== 0) {
      this.snackbarOpen(flagTrigger, 1);
    } else {
      db.collection("clients")
        .add({
          FristName: Fname,
          LastName: Lname,
          //timestamp: dateAndTime,
          BillingAddress: { Address: Address, City: City, Zipcode: Zipcode },
          PhoneNumber: phoneNumber,
          Email: Email,
        })
        .catch(function (error) {
          console.log("errirrrr!!!", error);
        });
      this.handleClose();
    }
  };

  render() {
    let dateAndTime = moment().format("DD/MM/YYYY HH:mm:ss");

    //const { user } = this.props;
    const classes = withStyles();
    console.log(dateAndTime);

    let currentBalanceCard = (
      <div>
        <h1>Current Balance: </h1>
        <ul>{dateAndTime}</ul>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={this.addClientClick}
        >
          {" "}
          New Client
        </Button>
      </div>
    );

    return (
      <div className={classes.root}>
        {currentBalanceCard}

        {/* this is the code to check if its mobile or not.  */}
        {/* {isMobileOnly ? <ClientList /> :  <MaterialTableDemo />}  */}
        <ClientList />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Client</DialogTitle>
          <DialogContent>
            <form noValidate autoComplete="off">
              <div>
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="Fname"
                  label="Frist Name"
                  type="name"
                  fullWidth
                  value={this.state.Fname}
                  onChange={this.handleFnameChange}
                />

                <TextField
                  margin="dense"
                  id="Lname"
                  label="Last Name"
                  type="name"
                  fullWidth
                  value={this.state.Lname}
                  onChange={this.handleLnameChange}
                />

                <TextField
                  margin="dense"
                  id="Address"
                  label="Address"
                  type="name"
                  fullWidth
                  value={this.state.Address}
                  onChange={this.handleChangeAddress}
                />

                <TextField
                  margin="dense"
                  id="City"
                  label="City"
                  type="name"
                  fullWidth
                  value={this.state.City}
                  onChange={this.handleChangeCity}
                />

                <TextField
                  margin="dense"
                  id="zipcode"
                  label="Zipcode"
                  type="name"
                  fullWidth
                  value={this.state.Zipcode}
                  onChange={this.handleChangeZipcode}
                />

                <TextField
                  margin="dense"
                  id="phoneNumber"
                  label="Phone"
                  type="name"
                  fullWidth
                  value={this.state.phoneNumber}
                  onChange={this.handleChangePhoneNumber}
                />

                <TextField
                  margin="dense"
                  id="email"
                  label="Email"
                  type="name"
                  fullWidth
                  value={this.state.Email}
                  onChange={this.handleChangeEmail}
                />
                <FormControl className={classes.formControl}  style={{ minWidth: 260}}>
        <InputLabel id="demo-simple-select-label">Service Date</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          // onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleAddClientButtonHasBeenClicked}
              color="primary"
            >
              Sumbit
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={6000}
          onClose={this.snackbarClose}
          message={this.state.snackbarMessage}
        />

        <Fab
          color="primary"
          aria-label="add"
          style={{ bottom: 30, position: "fixed", right: 25 }}
          onClick={this.addClientClick}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }

  async componentDidMount() {
    // await this.getClientData();
    // await this.setTheLoadingState();
    // this.onLoad()
    //  await this.testClientData()
  }
}

DashboardPage.propTypes = {
  user: PropTypes.object,
};

export default withRouter(withStyles(styles)(DashboardPage));
