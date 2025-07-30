import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import MonthlyBarChart from '../components/MonthlyBarChart';
import YearlyBarChart from '../components/YearlyBarChart';
import "./Home.css"
import DailyTip from '../components/DailyTip';
import {Link} from 'react-router-dom';
function Home({expenses,onAddExpense,onDeleteExpense}){
    let totalMonth  = 0;
    let totalYear  = 0;
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    expenses.forEach(expense => {
        const date = new Date(expense.date);
        const month = date.getMonth();
        const year = date.getFullYear();
        const amount = parseFloat(expense.amount);
        if (isNaN(amount)) return;
    
        if (month === currentMonth && year === currentYear) {
            totalMonth += amount;
        }
        if (year === currentYear) {
            totalYear += amount;
        }
    });

    return (
        <div className='home-container'>
            <h1>Expense Tracker</h1>
            <div className='expense-form'>
                <ExpenseForm onAddExpense = {onAddExpense}  />
            </div>
            <h2>Recent Expenses</h2>
            <div className="recent-expense-section">
                <div className="recent-expenses">
                    {expenses.length === 0 ? (
                        <p className='empty-placeholder'>No recent expenses yet</p>
                    ): (<ExpenseList expenses={[...expenses].slice(-5).reverse()} onDeleteExpense = {onDeleteExpense}/>)}
                    <div className="view-all-expenses">
                        <Link to = '/expenses'>📄 View All Expenses</Link>
                    </div>
                </div>
                <DailyTip/>
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
            <div className="expense-overview">
                <div className='overview-item'>Total this month: ${totalMonth.toFixed(2)}</div>
                <div className='overview-item'>Total this year: ${totalYear.toFixed(2)}</div>
            </div>
        </div>
    );
}
export default Home
