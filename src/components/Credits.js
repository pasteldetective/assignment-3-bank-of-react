import React, { Component } from "react"; // Import React and Component from react package
import AccountBalance from './AccountBalance'; // Import the AccountBalance component
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom

class Credit extends Component  { // Define a class component called Credit
  render() { // Render method to render the component
    const { credits, addCredit} = this.props; // Destructure credits and addCredit from props
    const handleAddCredit = (event) => { // Function to handle adding a new credit
      event.preventDefault(); // Prevent default form submission behavior
      const description = event.target.elements.description.value; // Get the value of the description input field
      const amount = parseFloat(event.target.elements.amount.value); // Get the value of the amount input field

      // Check if description is not empty and amount is a valid number
      if (description && !isNaN(amount)) {
        const newCredit = { // Create a new credit object
          id: Math.floor(Math.random() * 1000), // Generate a random ID for the new credit
          description: description, // Set the description of the new credit
          amount: amount, // Set the amount of the new credit
          date: new Date().toISOString(), // Set the current date and time as the date of the new credit
        };
        
        addCredit(newCredit); // Call the addCredit function passed as a prop with the new credit object as an argument

        event.target.reset(); // Reset the form fields after adding the credit
      }
    };

    // Function to render the list of credits
    const renderCredits = () => {
      return credits.map((credit) => {
        const formattedDateTime = new Date(credit.date).toISOString(); // Format the date and time of the credit
        return (
          <div className="credit-item" key={credit.id}>
            <div className="credit-info">
              <div>
                <span className="credit-amount">{credit.amount}</span> {/* Display the amount of the credit */}
              </div>
              <div>
                <span className="credit-description">{credit.description}</span> {/* Display the description of the credit */}
              </div>
              <div className="credit-time">{formattedDateTime}</div> {/* Display the formatted date and time of the credit */}
            </div>
          </div>
        );
      });
    };

    const creditAmount = credits.reduce((total, credit) => total + credit.amount, 0); // Calculate the total amount of credits

    // Render the JSX for the Credit component
    return (
      <div className="credit-container">
        <div className="credit-header">
          <h1>Credits</h1>
          <p>Total Credit Amount: {creditAmount.toFixed(2)}</p> {/* Display the total amount of credits */}
          <AccountBalance accountBalance={this.props.accountBalance} /> {/* Render the AccountBalance component */}
        </div>
        <div className="credit-content">
          <div className="credit-form">
            <h2>Add Credit</h2>
            <form onSubmit={handleAddCredit}>
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
                Add Credit
              </button>
            </form>
          </div>
          <div className="credit-list">
            <ul>{renderCredits()}</ul> {/* Render the list of credits */}
          </div>
        </div>
        <Link to="/">Return to Home</Link> {/* Link to return to the home page */}
      </div>
    );
  }
}

export default Credit; // Export the Credit component