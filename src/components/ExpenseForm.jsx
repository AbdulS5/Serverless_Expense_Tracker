import {useState} from 'react';
import "./ExpenseForm.css";
import { FaPlus } from 'react-icons/fa';

function ExpenseForm({onAddExpense}) {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !amount || !date) {
            alert("Please fill in all fields.");
            return;
        }
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
          alert("Amount must be a positive number.");
          return;
        }
        const newExpense = {
            id: Date.now(),
            title,
            amount : parsedAmount,
            date,
        };
        onAddExpense(newExpense);
        setTitle("");
        setAmount("");
        setDate("");
    }
    return (
        <form className = "expenses-form"  onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor='title'>Title</label>
                <input 
                    id='title'
                    type = "text"
                    placeholder="Expense Name" 
                    value={title} 
                    onChange = {(e) => setTitle(e.target.value) }
                />
            </div>
            <div className="form-group">
                <label htmlFor='amount'>Amount</label>
                <input 
                    id='amount'
                    type = "number" 
                    placeholder="Expense Amount" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor='date'>Date</label>
                <input 
                    id='date'
                    type = "date" 
                    value={date}
                    onChange={(e)=> setDate(e.target.value)}
                />
            </div>
            <button type='submit'> 
                <FaPlus className="plus-icon" />
                Add Expense
            </button>
        </form>
    )
}
export default ExpenseForm;