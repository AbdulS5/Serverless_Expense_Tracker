import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Your Name</h2>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/expenses">Expense List</Link></li>
          <li><Link to="/chart">Expense Chart</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
