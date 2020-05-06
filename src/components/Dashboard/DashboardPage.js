import React, { Component } from "react";
import moment from "moment";

import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";

import { auth, firestore,  } from "../../firebase";


let dateAndTime = moment().format("DD/MM/YYYY HH:mm:ss");


class DashboardPage extends Component {

  getClientData = () => {
    var db = firestore;
    db.collection("clients").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
    });
  }

  
  render() {
    const { user } = this.props;
    console.log(dateAndTime);

    let currentBalanceCard = (
      <div>
        <h1>Current Balance: </h1>
        <ul>{dateAndTime}</ul>
      </div>
    );

    return <div>{currentBalanceCard}</div>;
  }

  componentDidMount() { 
    this.getClientData()
  }
 
}

DashboardPage.propTypes = {
  user: PropTypes.object,
};

export default withRouter(DashboardPage);
