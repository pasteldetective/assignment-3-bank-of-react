/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';

const Credits = (props) => {
  const { credits, addCredit } = props;

  const handleAddCredit = (event) => {
    event.preventDefault();
    const description = event.target.elements.description.value;
    const amount = parseFloat(event.target.elements.amount.value);

    if (description && !isNaN(amount)) {
      const newCredit = {
        id: Math.floor(Math.random() * 1000), // Generate a unique ID (for demonstration purposes)
        description: description,
        amount: amount,
        date: new Date().toISOString() // Store current date in ISO format
      };

      // Call the addCredit function from props to update state with the new credit
      addCredit(newCredit);

      // Reset form fields after adding the credit
      event.target.reset();
    }
  };

  const renderCredits = () => {
    return credits.map((credit) => {
      // Format the date with time in ISO format
      const formattedDateTime = new Date(credit.date).toISOString(); 
      return (
        <li key={credit.id}>
          {credit.amount} {credit.description} {formattedDateTime}
        </li>
      );
    });
  };

  const creditAmount = credits.reduce((total, credit) => total + credit.amount, 0); // calculate credit amount in total

  return (
    <div>
      <h1>Credits</h1>

      <p>**Total Credit Amount: {creditAmount.toFixed(2)}**</p>

      <ul>{renderCredits()}</ul>

      <form onSubmit={handleAddCredit}>
        <input type="text" name="description" placeholder="Description" />
        <input type="number" name="amount" placeholder="Amount" />
        <button type="submit">Add Credit</button>
      </form>

      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Credits;