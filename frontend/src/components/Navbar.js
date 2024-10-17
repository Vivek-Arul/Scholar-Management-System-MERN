import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const defaultDepartments = [
  'Computer Science Engineering',
  'Information Technology',
  'Electronics and Communication Engineering',
  'Mechanical Engineering',
  'Civil Engineering'
];

const Navbar = ({ departments = defaultDepartments }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark text-white px-5 mt-3">
      <a className="navbar-brand text-white" href="/">Scholar Management System</a>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/admin">Admin Dashboard</Link>
          </li>
          <li className="nav-item dropdown">
            <a 
              className="nav-link dropdown-toggle text-white" 
              href="/" 
              id="navbarDropdown" 
              role="button" 
              data-toggle="dropdown" 
              aria-haspopup="true" 
              aria-expanded="false"
            >
              Departments
            </a>
            <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
              {departments.map((dept, index) => (
                <Link 
                  key={index} 
                  className="dropdown-item text-white" 
                  to={`/department/${encodeURIComponent(dept)}`}
                >
                  {dept}
                </Link>
              ))}
              <Link className="dropdown-item text-white" to="/overall">Overall</Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;