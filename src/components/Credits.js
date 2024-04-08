import { useHistory } from 'react-router-dom';

const Credits = (props) => {
  const { credits, addCredit } = props;
  const history = useHistory();

  const handleAddCredit = (event) => {
    event.preventDefault();
    const description = event.target.elements.description.value;
    const amount = parseFloat(event.target.elements.amount.value);

    if (description && !isNaN(amount)) {
      const newCredit = {
        id: Math.floor(Math.random() * 1000),
        description: description,
        amount: amount,
        date: new Date().toISOString(),
      };

      addCredit(newCredit);

      event.target.reset();
    }
  };

  const renderCredits = () => {
    return credits.map((credit) => {
      const formattedDateTime = new Date(credit.date).toISOString();
      return (
        <div className="credit-item" key={credit.id}>
          <div className="credit-info">
            <div>
              <span className="credit-amount">{credit.amount}</span>
            </div>
            <div>
              <span className="credit-description">{credit.description}</span>
            </div>
            <div className="credit-time">{formattedDateTime}</div>
          </div>
        </div>
      );
    });
  };

  const creditAmount = credits.reduce((total, credit) => total + credit.amount, 0);

  const returnToHome = () => {
    history.push('/');
  };

  return (
    <div className="credit-container">
      <div className="credit-header">
        <h1>Credits</h1>
        <p>Total Credit Amount: {creditAmount.toFixed(2)}</p>
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
          <ul>{renderCredits()}</ul>
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

export default Credits;
