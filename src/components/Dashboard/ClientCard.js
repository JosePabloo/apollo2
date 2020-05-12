import React, { Component } from "react";

import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import { firestore } from "../../firebase";

import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";

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
      open: false,
      setOpen: false,
      hasDataBeenLoaded: false,
      clientsFromFire: [],
    };
  }

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
  };

  testClientData = () => {
    const { isLoaded } = this.state;

    this.setState({
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
      return (
        <div>
          <Button variant="contained" onClick={this.handleClickOpen}>
            Show Clients
          </Button>
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
          <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
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
    this.getClientData();
    await this.testClientData();
  }
}

ClientList.propTypes = {
  user: PropTypes.object,
};

export default withRouter(withStyles(styles)(ClientList));
