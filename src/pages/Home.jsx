import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import MonthlyBarChart from '../components/MonthlyBarChart';
import YearlyBarChart from '../components/YearlyBarChart';
import "./Home.css"
function Home({expenses,onAddExpense,onDeleteExpense}){
    return (
        <div className='home-container'>
            <h1>Expense Tracker</h1>
            <div className='expense-form'>
                <ExpenseForm onAddExpense = {onAddExpense}  />
            </div>
            <h2>Recent Expenses</h2>
            <div className="recent-expenses">
                <ExpenseList expenses={[...expenses].slice(-10).reverse()} onDeleteExpense = {onDeleteExpense}/>
            </div>
            <h2>Expenses Report</h2>
            <div className='charts-container'>
                <div className="chart-box">
                    <MonthlyBarChart expenses={expenses}/>
                </div>
                <div className="chart-box">
                    <YearlyBarChart expenses={expenses}/>
                </div>
            </div>
            <div className='quick-links-section'>
                <div className='all-expenses'></div>
                <div className='all-charts'></div>
            </div>
        </div>
    );
}
export default Home
