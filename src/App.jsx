import React from 'react';
import {useState} from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
  // This is the main App component that renders the ExpenseForm component
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (expense) => {
    // Function to handle adding a new expense
    setExpenses(prevExpenses => [...prevExpenses, expense]);
  };
  const handleDeleteExpense  = (id) => {
    // Function to handle deleting an expense
    setExpenses(prevExpenses => prevExpenses.filter(e => e.id !== id));
  } 
  
  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense = {handleAddExpense}  />
      <ExpenseList expenses={expenses} onDeleteExpense = {handleDeleteExpense}/>
    </div>
  );
}

export default App;
