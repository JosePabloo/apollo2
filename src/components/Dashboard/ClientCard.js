import React, { Component } from "react";

import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import { firestore } from "../../firebase";

import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";

import { ReactComponent as CabinIllustration } from "../../illustrations/cabin.svg";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = (theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class ClientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialstate: {
        dataRole: null,
        ready: false,
      },
      clientArray: {
        NameFisrt: null,
        NameLast: false,
      },
      open: false,
      setOpen: false,

      snackbarMessage: "",
      snackbarOpen: false,
      snackbarSetOpen: false,

      hasDataBeenLoaded: false,

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

  checkcomponent = () => {
    console.log("HELLO");
  };

  handleClickOpen = () => {
    this.setState({
      setOpen: true,
      open: true,
      hasDataBeenLoaded: true,
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
    const { clientsFromFire, isLoaded, renderedList } = this.state;
    const clonelistItems = clientsFromFire.slice();
    this.setState({
      renderedList: clonelistItems,
      isLoaded: true,
    });
  };

  getClientData = () => {
    let { clientsFromFire, isLoaded, initialstate, clientArray } = this.state;
    let {
      clientArray: { NameFisrt, NameLast },
    } = this.state;
    var db = firestore;
    db.collection("clients")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          clientsFromFire.push(doc);
        });
      });
    this.setTheLoadingState();
  };

  showClientsReload = () => {
    console.log("thiiiiiiiisss");
  };

  setTheLoadingState = () => {
    this.setState({
      initialstate: { ready: true },
    });
    this.convertStuffOverToStrings();
  };

  convertStuffOverToStrings = () => {
    let { clientsFromFire, isLoaded, initialstate, clientArray } = this.state;
    console.log("convertStuffOverToStrings", clientsFromFire);
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
    var { initialstate } = this.state;
    let { clientsFromFire, isLoaded } = this.state;
    if (clientsFromFire) {
      console.log("EUYHUYBUB", clientsFromFire);
      this.getClientData();
    } else {
      console.log("fgs");
    }
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

    if (flagTrigger != 0) {
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
    const { isLoaded, hasDataBeenLoaded } = this.state;

    const { user } = this.props;
    const classes = withStyles();

    let listItems = this.state.clientsFromFire.map((user) => (
      <div key={user.id}>
        <Card>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {user.data().FristName}
            </Typography>
            <Typography variant="h5" component="h2">
              {user.data().LastName}
            </Typography>
          </CardContent>
        </Card>
      </div>
    ));
    if (!hasDataBeenLoaded) {
      return( 
        <div>
        <Button variant="contained" onClick={this.handleClickOpen}>
          Show Clients
        </Button>
      </div>
      )
     
    }

    if (!isLoaded) {
      return (
        <div>
          <h2> Not ready :) {console.log(user)}</h2>
        </div>
      );
    }
    return (
      <div>
        {listItems}

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Success"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
             {this.state.clientsFromFire.length} clients have been loaded. 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  async componentDidMount() {
    // await this.getClientData();
    //await this.setTheLoadingState();
    this.onLoad();
    await this.testClientData();
    this.checkcomponent();
  }
}

ClientList.propTypes = {
  user: PropTypes.object,
};

export default withRouter(withStyles(styles)(ClientList));
