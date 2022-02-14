import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Signout extends Component {
  componentDidMount() {
    this.props.signUserOut();
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default connect(null, actions)(Signout);
