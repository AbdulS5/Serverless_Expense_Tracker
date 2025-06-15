function ExpenseList({ expenses ,onDeleteExpense}) {
    return (
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <strong>{expense.title}</strong> – ${expense.amount} on {new Date(expense.date).toLocaleDateString()}
            <button onClick = {() => onDeleteExpense(expense.id)}>❌</button>
          </li>
        ))}
      </ul>
    );
  }
  export default ExpenseList;
// This component renders a list of expenses passed as props