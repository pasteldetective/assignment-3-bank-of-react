import React from "react";
import { Link } from "react-router-dom";

const Debits = (props) => {
  const { debits, addDebit } = props;

  const handleAddDebit = (event) => {
    event.preventDefault();
    const description = event.target.elements.description.value;
    const amount = parseFloat(event.target.elements.amount.value);

    if (description && !isNaN(amount)) {
      const newDebit = {
        id: Math.floor(Math.random() * 1000), // Generate a unique ID (for demonstration purposes)
        description: description,
        amount: amount,
        date: new Date().toISOString(), // Store current date in ISO format
      };

      // Call the addDebit function from props to update state with the new debit
      addDebit(newDebit);

      // Reset form fields after adding the debit
      event.target.reset();
    }
  };

  const renderDebits = () => {
    return debits.map((debit) => {
      // Format the date with time in ISO format
      const formattedDateTime = new Date(debit.date).toISOString();
      return (
        <li key={debit.id}>
          {debit.amount} {debit.description} {formattedDateTime}
        </li>
      );
    });
  };

  const debitAmount = debits.reduce((total, debit) => total + debit.amount, 0); // calculate debit amount in total

  return (
    <div>
      <div className="debit-header">
        <h1>Debits</h1>
      </div>

      <p>**Total Debit Amount: {debitAmount.toFixed(2)}**</p>

      <ul>{renderDebits()}</ul>

      <form onSubmit={handleAddDebit}>
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="debit-description-bar"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="debit-amount-bar"
        />
        <button type="submit" className="add-debit">
          Add Debit
        </button>
      </form>

      <br />
      <button
        className="debit-return"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Return to Home
      </button>
    </div>
  );
};

export default Debits;
