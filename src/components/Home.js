/*==================================================
src/components/Home.js

The Home component is used to demonstrate the use of Link.
==================================================*/
import React, { Component } from "react";
import AccountBalance from "./AccountBalance";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1>Welcome to The Bank of React</h1>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/First_Bank_of_the_United_States%2C_Philadelphia%2C_Pennsylvania_LCCN2011633532_%28edited%29.jpg/800px-First_Bank_of_the_United_States%2C_Philadelphia%2C_Pennsylvania_LCCN2011633532_%28edited%29.jpg"
          alt="bank"
          className="bank"
        />
        <div className="link-group">
          <Link to="/userProfile" className="custom-link">
            User Profile
          </Link>
          <br />
          <Link to="/login" className="custom-link">
            Login
          </Link>
          <br />
          <Link to="/credits" className="custom-link">
            Credits
          </Link>
          <br />
          <Link to="/debits" className="custom-link">
            Debits
          </Link>
        </div>
        <br />
        <br />
        <AccountBalance accountBalance={this.props.accountBalance} />
      </div>
    );
  }
}

export default Home;
