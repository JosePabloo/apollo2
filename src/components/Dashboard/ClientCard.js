import React, { Component } from "react";

import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import { firestore } from "../../firebase";

import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Dialog from "@material-ui/core/Dialog";

import DialogActions from "@material-ui/core/DialogActions";

import DialogContent from "@material-ui/core/DialogContent";

import DialogContentText from "@material-ui/core/DialogContentText";

import DialogTitle from "@material-ui/core/DialogTitle";

import Container from "@material-ui/core/Container";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import IconButton from "@material-ui/core/IconButton";

import { red } from "@material-ui/core/colors";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import Divider from "@material-ui/core/Divider";

import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import TextField from "@material-ui/core/TextField";

import moment from "moment";

import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

import MaterialTableDemo from "./DataTable";
import { Flag } from "@material-ui/icons";

import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Slide from "@material-ui/core/Slide";

//TODO: Add Client name to snack bar when service is done.

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = (theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    minWidth: 275,
    paddingTop: 20,
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

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  root6: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
  appBar: {
    position: 'relative',
  },
  title2: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
});

const options = [
  "Weekly Lawn Mowing",
  "ByWeekly Lawn Mowing",
  "Edging",
  "Dethatch",
  "Aerator",
  "S/F Clean Up",
];

class ClientList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openClientWasClicked: false,
      setClientModalOpen: false,
      open: false,
      setOpen: false,
      hasDataBeenLoaded: false,
      clientsFromFire: [],
      ClientInfoFromSelection: [],
      ClientInfoFromSelectionID: "",
      isReadyToLoad: false,
      value: "Weekly Lawn Mowing",
      setValue: false,
      ClientPrice: "ADD A PRICE",
      ClientPriceChangedFlag: false,
      CurrentDate: moment().format("MM/DD/YY"),
      snackbarOpen: false,
      setSnackBarOpen: false,
      loadFinalMonthView: false,
      endReport: [],

      editClientViewOpen: false,
      clientsServiceRecords: [],
      clientServiceRecordsName: "",
      editViewLoaded: false,
    };

    this.consoleTest = this.consoleTest.bind(this);
    this.getClientServiceRecords = this.getClientServiceRecords.bind(this);
  }
  handleClickModalClientOpen = () => {
    this.setState({
      openClientWasClicked: true,
      setClientModalOpen: true,
    });
  };

  handleCloseClientModal = () => {
    this.setState({
      openClientWasClicked: false,
      setClientModalOpen: false,
      ClientPriceChangedFlag: false,
    });
  };

  handleClickOpen = () => {
    this.getClientData();
    this.setState({
      setOpen: true,
      open: true,
      hasDataBeenLoaded: true,
    });
  };

  handleClickRenderDataTable = () => {
    console.log("handleClickRenderDataTable");
  };

  handleClose = () => {
    this.setState({
      setOpen: false,
      open: false,
    });
  };

  testClientData = () => {
    this.setState({
      isLoaded: true,
    });
  };

  getEndOfTheMonthReport = () => {
    let { endReport } = this.state;
    var db = firestore;
    db.collection("serviceRecords")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          endReport.push(doc);
        });
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

  getClientServiceRecords = (theInfo) => {
    var db = firestore;
    let { clientsServiceRecords } = this.state;
    var CLIENTS = "clients";
    var SERVICE_RECORDS = "serviceRecords";
    db.collection(CLIENTS)
      .doc(theInfo.id)
      .collection(SERVICE_RECORDS)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          clientsServiceRecords.push(doc.data());
        });
      });
    this.handleEditClientViewOpen();
    this.setClientDataReady()
  };
  setClientDataReady = () => {
    this.setState({
      editViewLoaded: true,
    });
  }
  handleClickOpenClients = () => {
    console.log("pressed")
    this.openSnackBarSuccess()
  }

  consoleTest = (theInfo) => {
    console.log("data(): ", theInfo.data());
    console.log("ID: ", theInfo.id);
    this.setState({
      ClientInfoFromSelection: theInfo.data(),
      isReadyToLoad: true,
      ClientInfoFromSelectionID: theInfo.id,
    });

    this.handleClickModalClientOpen();
  };

  handleServiceChange = (event) => {
    console.log(event.target.value);
    this.setState({
      value: event.target.value,
    });
  };
  clientPriceChange = (event) => {
    console.log(event.target.value);
    this.setState({
      ClientPrice: event.target.value,
      ClientPriceChangedFlag: true,
    });
  };

  submitClientServiceDateToDataBase = () => {
    const SERVICE_RECORDS = "serviceRecords";
    const CLIENTS = "clients";
    var db = firestore;
    console.log(this.state.ClientInfoFromSelection);
    if (this.state.ClientPriceChangedFlag) {
      console.log("The client price does not equal the same as the database ");
    } else {
      console.log("the Client Has not changed the Price!");
    }
    db.collection(CLIENTS)
      .doc(this.state.ClientInfoFromSelectionID)
      .collection(SERVICE_RECORDS)
      .add({
        Client: this.state.ClientInfoFromSelectionID,
        ClientFirstName: this.state.ClientInfoFromSelection.FristName,
        ClientLastName: this.state.ClientInfoFromSelection.LastName,
        ServiceDate: this.state.CurrentDate,
        ServicePrice: this.state.ClientPrice,
        ServiceType: this.state.value,
        paid: false,
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    this.handleCloseClientModal();
    this.openSnackBarSuccess();
  };
  //TODO: ADD CLIENT ID to id

  openSnackBarSuccess = () => {
    console.log("snackback Success");
    this.setState({
      snackbarOpen: true,
      setSnackBarOpen: true,
    });
  };

  closeSnackBackSuccess = (event, reason) => {
    this.setState({
      snackbarOpen: false,
      setSnackBarOpen: false,
    });
  };

  handleEditClientViewOpen = () => {
    this.setState({
      editClientViewOpen: true,
    });
    console.log("INDISDE", this.state.clientsServiceRecords);
  };

  handleEditClientView = () => {
    this.setState({
      editClientViewOpen: false,
      clientsServiceRecords: []

    });
  };

  render() {
    const { hasDataBeenLoaded, loadFinalMonthView } = this.state;
    const classes = withStyles();

    let listItems = (
      <div style={{ paddingTop: 20 }}>
        {this.state.clientsFromFire.map((user) => (
          <div key={user.id} style={{ paddingTop: 20 }}>
            <Card className={classes.root}>
              <CardHeader
                action={
                  <IconButton
                    aria-label="settings"
                    onClick={() => this.getClientServiceRecords(user)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
                title={user.data().LastName + " " + user.data().FristName}
              />

              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {user.data().BillingAddress.Address +
                    " " +
                    user.data().BillingAddress.City +
                    " " +
                    user.data().BillingAddress.Zipcode}
                </Typography>
                <Divider />

                <Typography variant="body2" color="textSecondary" component="p">
                  {user.data().PhoneNumber}
                </Typography>
                <Divider />

                <Typography variant="body2" color="textSecondary" component="p">
                  Service Day is on: {user.data().ServiceDay}
                  {console.log(user.data())}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                {/* <Button
                size="small"
                color="primary"
                style={{ textAlign: "right" }}
                variant="contained"
                autoFocus
              >
                Contact
              </Button> */}
                <Button
                  size="small"
                  color="primary"
                  onClick={() => this.consoleTest(user)}
                  variant="contained"
                  autoFocus
                >
                  Service Completed
                </Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    );

   

    let fullScreenClientEdit = (
     
     <div>
       
        <Dialog
    fullScreen
    open={this.state.editClientViewOpen}
    onClose={this.handleEditClientView}
    TransitionComponent={Transition}
  >
    <AppBar style={{ position: 'relative' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={this.handleEditClientView}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" style={{ marginLeft:  2, flex: 1 }}>
        edit Client
        </Typography>
        <Button
          autoFocus
          color="inherit"
          onClick={this.handleEditClientView}
        >
          save
        </Button>
      </Toolbar>
    </AppBar>
    <List style={{ padding:  10 }}>
      {this.state.clientsServiceRecords.map((service, index) => (
        <ListItem button key={index}>
        <ListItemText primary={service.ServiceDate} secondary={service.ServicePrice} />
      </ListItem>
       
      ))}
    </List>
    {this.state.editViewLoaded ?  <div style={{ paddingTop: 720, paddingLeft: 200, position: "fixed" }}>
            <Button variant="contained" onClick={this.handleClickOpenClients}>
              Show Clients
            </Button> </div> : null }
  
  </Dialog>
  
     </div>
     
    );

    if (!hasDataBeenLoaded) {
      return (
        <div>
          <div style={{ paddingTop: 250, paddingLeft: 120 }}>
            <Button variant="contained" onClick={this.handleClickOpen}>
              Show Clients
            </Button>

            {
              //TODO: Create a print button}
            }
          </div>

          <div style={{ paddingTop: 10, paddingLeft: 80 }}>
            <Button
              variant="contained"
              onClick={this.handleClickRenderDataTable}
            >
              End of the month Report
            </Button>

            {
              //TODO: Create a print button}
            }
          </div>
        </div>
      );
    }

    return (
      <div>
        <Container maxWidth="sm">{listItems} {fullScreenClientEdit}</Container>
        <Dialog
          open={this.state.openClientWasClicked}
          onClose={this.handleCloseClientModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {this.state.ClientInfoFromSelection.FristName +
              " " +
              this.state.ClientInfoFromSelection.LastName}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Service Date: {this.state.CurrentDate}
            </DialogContentText>

            <TextField
              required
              id="standard-required"
              label="Service Cost"
              onChange={this.clientPriceChange}
              defaultValue={
                this.state.ClientInfoFromSelection.ServicePrice
                  ? this.state.ClientInfoFromSelection.ServicePrice
                  : this.state.ClientPrice
              }
            />

            <RadioGroup
              // ref={radioGroupRef}
              aria-label="ringtone"
              name="ringtone"
              value={this.state.value}
              onChange={this.handleServiceChange}
            >
              {options.map((option) => (
                <FormControlLabel
                  value={option}
                  key={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCloseClientModal}
              color="primary"
              autoFocus
              variant="contained"
            >
              Cancel
            </Button>

            <Button
              onClick={this.submitClientServiceDateToDataBase}
              color="primary"
              autoFocus
              variant="contained"
            >
              Continue
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.open}
          onClose={this.closeSnackBackSuccess}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              clients have been loaded.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Continue
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={4000}
          onClose={this.closeSnackBackSuccess}
          message="Service Date Added"
          action={
            <React.Fragment>
              <Button
                color="secondary"
                size="small"
                onClick={this.closeSnackBackSuccess}
              >
                Continue
              </Button>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.closeSnackBackSuccess}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
        {
          //CREATE a FULL SCREEN edit DIALOG that shows if the client has paid
          //TODO: load the data to the fill screen dialog. 
          //CLOSE and clear the state of the data when the close or submit button is pressed. 
        }


    
      </div>
    );
  }

  async componentDidMount() {
    await this.testClientData();
  }
}

ClientList.propTypes = {
  user: PropTypes.object,
};

export default withRouter(withStyles(styles)(ClientList));
