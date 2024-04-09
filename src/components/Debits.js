import React, { Component } from "react";
import AccountBalance from './AccountBalance'; // Importing the AccountBalance component
import { Link } from "react-router-dom"; // Importing the Link component from react-router-dom

class Debits extends Component {
  render() {
    const { debits, addDebit } = this.props; // Destructuring debits and addDebit from props

    // Event handler function to handle adding a new debit
    const handleAddDebit = (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      const description = event.target.elements.description.value; // Get the value of the description input field
      const amount = parseFloat(event.target.elements.amount.value); // Get the value of the amount input field

      // Check if description is not empty and amount is a valid number
      if (description && !isNaN(amount)) {
        const newDebit = { // Create a new debit object
          id: Math.floor(Math.random() * 1000), // Generate a random ID for the new debit
          description: description, // Set the description of the new debit
          amount: amount, // Set the amount of the new debit
          date: new Date().toISOString(), // Set the current date and time as the date of the new debit
        };

        addDebit(newDebit); // Call the addDebit function passed as a prop with the new debit object as an argument

        event.target.reset(); // Reset the form fields after adding the debit
      }
    };

    // Function to render the list of debits
    const renderDebits = () => {
      return debits.map((debit) => {
        const formattedDateTime = new Date(debit.date).toISOString(); // Format the date and time of the debit
        return (
          <div className="credit-item" key={debit.id}>
            <div className="credit-info">
              <div>
                <span className="credit-amount">{debit.amount}</span> {/* Display the amount of the debit */}
              </div>
              <div>
                <span className="credit-description">{debit.description}</span> {/* Display the description of the debit */}
              </div>
              <div className="credit-time">{formattedDateTime}</div> {/* Display the formatted date and time of the debit */}
            </div>
          </div>
        );
      });
    };

    const debitAmount = debits.reduce((total, debit) => total + debit.amount, 0); // Calculate the total amount of debits

    return (
      <div className="credit-container">
        <div className="credit-header">
          <h1>Debits</h1>
          <p>Total Debit Amount: {debitAmount.toFixed(2)}</p> {/* Display the total amount of debits */}
          <AccountBalance accountBalance={this.props.accountBalance} /> {/* Render the AccountBalance component */}
        </div>
        <div className="credit-content">
          <div className="credit-form">
            <h2>Add Debit</h2>
            <form onSubmit={handleAddDebit}>
              <input
                type="text"
                name="description"
                placeholder="Description"
                className="credit-description-bar"
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                className="credit-amount-bar"
              />
              <button type="submit" className="add-credit">
                Add Debit
              </button>
            </form>
          </div>
          <div className="credit-list">
            <ul>{renderDebits()}</ul> {/* Render the list of debits */}
          </div>
        </div>
        <Link to="/">Return to Home</Link> {/* Link to return to the home page */}
      </div>
    );
  };
}

export default Debits;