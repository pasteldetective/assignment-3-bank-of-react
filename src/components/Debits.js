import React from "react";
import { useHistory } from 'react-router-dom';

const Debits = (props) => {
  const { debits, addDebit, accountBalance } = props; // Receive the accountBalance prop
  const history = useHistory();

  const handleAddDebit = (event) => {
    event.preventDefault();
    const description = event.target.elements.description.value;
    const amount = parseFloat(event.target.elements.amount.value);

    if (description && !isNaN(amount)) {
      const newDebit = {
        id: Math.floor(Math.random() * 1000),
        description: description,
        amount: amount,
        date: new Date().toISOString(),
      };

      addDebit(newDebit);

      event.target.reset();
    }
  };

  const renderDebits = () => {
    return debits.map((debit) => {
      const formattedDateTime = new Date(debit.date).toISOString().slice(0, 10);
      return (
        <div className="credit-item" key={debit.id}>
          <div className="credit-info">
            <div>
              <span className="credit-amount">{debit.amount}</span>
            </div>
            <div>
              <span className="credit-description">{debit.description}</span>
            </div>
            <div className="credit-time">{formattedDateTime}</div>
          </div>
        </div>
      );
    });
  };

  const debitAmount = debits.reduce((total, debit) => total + debit.amount, 0);

  const returnToHome = () => {
    history.push('/');
  };

  return (
    <div className="credit-container">
      <div className="credit-header">
        <h1>Debits</h1>
        <p>Total Debit Amount: {debitAmount.toFixed(2)}</p>
        <p>Account Balance: {accountBalance.toFixed(2)}</p> {/* Display account balance */}
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
          <ul>{renderDebits()}</ul>
        </div>
      </div>
      <div className="return-home">
        <button className="credit-return" onClick={returnToHome}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Debits;
