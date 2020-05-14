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

import Grid from "@material-ui/core/Grid";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
    const { hasDataBeenLoaded } = this.state;
    const classes = withStyles();

    let listItems = (
      <div>
        {this.state.clientsFromFire.map((user) => (
       

          <Card className={classes.root} key={user.id}>
            <CardHeader
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title= {user.data().LastName + " " + user.data().FristName} 

            />

            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
              {user.data().BillingAddress.Address + " " + user.data().BillingAddress.City +  " "+ user.data().BillingAddress.Zipcode}
         </Typography>
         <Typography variant="body2" color="textSecondary" component="p">
             {user.data().PhoneNumber}
         </Typography>
         <Typography variant="body2" color="textSecondary" component="p">
             {user.data().ServiceDay}
         </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Button size="small" color="primary">
                Contact
          </Button>
              <Button size="small" color="primary" style={{ textAlign: 'right' }}>
                Complete Service
            </Button>

            </CardActions>
          </Card>
        
        ))}
      </div>
    );

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
        <Container maxWidth="sm">{listItems}</Container>

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
