import React, { Component } from "react";

import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";

import { red } from "@material-ui/core/colors";


const styles = (theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  root: {
    minWidth: 275,
    paddingTop: 10,
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
});

class ServiceConfrim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      setOpen: false,
    
    };


  }

 


  render() {

    const classes = withStyles();

  
    return (
      <div>
        <Button variant="contained" onClick = {console.log("CLIENT INFO: ",this.props.clientName)} >
            HELLOWW
          </Button>
      </div>
    );
  }

  async componentDidMount() {

  }
}

ServiceConfrim.propTypes = {
  user: PropTypes.object,
};

export default withRouter(withStyles(styles)(ServiceConfrim));
