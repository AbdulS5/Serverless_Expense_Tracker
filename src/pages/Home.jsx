import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
function Home({expenses,onAddExpense,onDeleteExpense}){
    return (
        <div>
            <h1>Home</h1>
            <h1>Expense Tracker</h1>
            <ExpenseForm onAddExpense = {onAddExpense}  />
            <ExpenseList expenses={expenses} onDeleteExpense = {onDeleteExpense}/>
        </div>
    );
}
export default Home
