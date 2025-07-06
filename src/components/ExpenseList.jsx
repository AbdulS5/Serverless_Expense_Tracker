import "./ExpenseList.css"
function ExpenseList({ expenses ,onDeleteExpense}) {
    return (
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li className="expense-item" key={expense.id}>
            <div className="expense-info">
              <strong>{expense.title}</strong>
              <div className="expense-amount">${expense.amount}</div>
              <div className="expense-date">{new Date(expense.date).toLocaleDateString("en-US", {
                month: "long", day: "numeric", year: "numeric"
              })}</div>
            </div>
            <button onClick={() => onDeleteExpense(expense.id)}>❌</button>
          </li>
        ))}
      </ul>
    );
  }
  export default ExpenseList;
// This component renders a list of expenses passed as props