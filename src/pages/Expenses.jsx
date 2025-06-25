import React from 'react';
import ExpenseList from '../components/ExpenseList';
import {Link} from 'react-router-dom';
import './Expenses.css';

function Expenses({expenses,onDeleteExpense}){
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    return (
        <div className='expenses-page'>
            <h2>All Expenses</h2>
            <h4>Total Expense = ${total.toFixed(2)}</h4>
            {expenses.length === 0 ? (
                <p className = "empty-placeholder">You haven't added any expenses yet.</p>
            ) : (
                <ExpenseList expenses = {[...expenses].reverse()} onDeleteExpense = {onDeleteExpense} />
            ) }
            <div className="back-home-link">
                <Link to = "/">← Back to Home</Link>
            </div>
        </div>
    );
}
export default Expenses;