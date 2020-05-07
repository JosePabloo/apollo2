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

const styles = (theme) => ({
  button: {
    margin: theme.spacing(1),
  },
});

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      setOpen: false,
      value: ''
      
    };
    this.handleChange = this.handleChange.bind(this);
    
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
  };

  getClientData = () => {
    var db = firestore;
    db.collection("clients")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      });
  };

  addClientClick = () => {
    //  var db = firestore;
    console.log("the button has been pressed adding clitn ");
    this.handleClickOpen();

    //   db.collection("clients").add({
    //     FristName: "Tokyo",
    //     LastName: "Japan",
    //     timestamp: dateAndTime,
    //     BillingAddress: { Address: "3000 9th Lane", City: "Anoka", Zipcode: "55421" },
    //     PhoneNumber: "612-324-432",

    // })
    // .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //     console.error("Error adding document: ", error);
    // });
  };

  handleChange(event) {
    console.log(event.target.value)
    //this.setState({value: event.target.value});
    this.setState({
      value: event.target.value,
    });
    
  }

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
      <div>
        {currentBalanceCard}
        <h1>test</h1>
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
                  value={this.state.value} 
                  onChange={this.handleChange}
                 
                />

                <TextField
                  margin="dense"
                  id="Lname"
                  label="Last Name"
                  type="name"
                  fullWidth
                />

                <TextField
                  margin="dense"
                  id="Address"
                  label="Address"
                  type="name"
                  fullWidth
                />

                <TextField
                  margin="dense"
                  id="City"
                  label="City"
                  type="name"
                  fullWidth
                />

                <TextField
                  margin="dense"
                  id="zipcode"
                  label="Zipcode"
                  type="name"
                  fullWidth
                />

                <TextField
                  margin="dense"
                  id="phoneNumber"
                  label="Phone"
                  type="name"
                  fullWidth
                />

                <TextField
                  margin="dense"
                  id="email"
                  label="Email"
                  type="name"
                  fullWidth
                />
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  componentDidMount() {
    this.getClientData();
  }
}

DashboardPage.propTypes = {
  user: PropTypes.object,
};

export default withRouter(withStyles(styles)(DashboardPage));
