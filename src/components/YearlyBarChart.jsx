import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
function YearlyBarChart({expenses}) {

    const monthlyTotal = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (const month of monthNames) {
        monthlyTotal[month] = 0;
    }
    const now = new Date();
    const currentYear = now.getFullYear();
    expenses.forEach(expense => {
        const date = new Date(expense.date);
        if(date.getFullYear() === currentYear){
            const month = monthNames[date.getMonth()];
            if(!monthlyTotal[month]){
                monthlyTotal[month] = 0;
            }
            monthlyTotal[month] += expense.amount;
        }
    });

    const graphData = Object.entries(monthlyTotal).map(([month, total]) => ({
        month,total: parseFloat(total.toFixed(2))
    }));      

    return (
        <div>
            <h4>Monthly Spendings</h4>
            <BarChart width={600} height={300} data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ 
                    value: 'Amount ($)', 
                    angle: -90, 
                    position: 'insideLeft',
                    offset: 0}}
                />
                <Tooltip />
                <Bar dataKey="total" fill="#4db6ac" />
            </BarChart>
        </div>

    );
}

export default YearlyBarChart;