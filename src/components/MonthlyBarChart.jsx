import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
function MonthlyBarChart({expenses}) {

    const weeklyTotal = {};
    const weekNames  = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
    for (const week of weekNames) {
        weeklyTotal[week] = 0;
    }
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    expenses.forEach(expense => {
        const date = new Date(expense.date);
        if(date.getMonth() === currentMonth && date.getFullYear() === currentYear){
            const week = `Week ${Math.ceil(date.getDate()/7)}`;
            weeklyTotal[week] += expense.amount;
        }
    });

    const graphData = Object.entries(weeklyTotal).map(([week, total]) => ({
        week,total: parseFloat(total.toFixed(2))
    }));      

    return (
        <div>
            <h4>Weekly Spendings</h4>
            <BarChart width={600} height={300} data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis label={{ 
                    value: 'Amount ($)', 
                    angle: -90, 
                    position: 'insideLeft',
                    offset: 0}}
                />
                <Tooltip />
                <Bar dataKey="total" fill="#38bdf8" />
            </BarChart>
        </div>

    );
}

export default MonthlyBarChart;