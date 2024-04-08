/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';
import axios from "axios";

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // lifecycle method should include API requests 
  componentDidMount() {
    axios.get('https://johnnylaicode.github.io/api/credits.json')
      .then(response => {
        const creditList = response.data;
        const creditAmount = creditList.reduce((total, credit) => total + credit.amount, 0);
        this.setState({ creditList, accountBalance: this.state.accountBalance + creditAmount });
      })
      .catch(error => console.error('Error fetching credits:', error));

    axios.get('https://johnnylaicode.github.io/api/debits.json')
      .then(response => {
        const debitList = response.data;
        const debitAmount = debitList.reduce((total, debit) => total + debit.amount, 0);
        this.setState({ debitList, accountBalance: this.state.accountBalance - debitAmount });
      })
      .catch(error => console.error('Error fetching debits:', error));
  }

  addCredit = (newCredit) => { // function to update credit
    const { creditList } = this.state;
    const updatedCreditList = [...creditList, newCredit];
    this.setState(prevState => ({
      creditList: updatedCreditList,
      accountBalance: prevState.accountBalance + newCredit.amount
    }));
  };

  addDebit = (newDebit) => { // function to update debit
    const { debitList } = this.state;
    const updatedDebitList = [...debitList, newDebit];
    this.setState(prevState => ({
      debitList: updatedDebitList,
      accountBalance: prevState.accountBalance - newDebit.amount
    }));
  };

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/assignment-3-bank-of-react">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;