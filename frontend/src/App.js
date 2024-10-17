import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminDashboard from './components/AdminDashboard';
import ScholarList from './components/ScholarList';
import ScholarProfile from './components/ScholarProfile';
import DepartmentOverview from './components/DepartmentOverview';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OverallOverview from './components/OverallOverview';
import { fetchScholars } from './redux/actions/scholarActions';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const scholars = useSelector((state) => state.scholarReducer.scholars);


  useEffect(() => {
    dispatch(fetchScholars());
  }, [dispatch]);

  const departmentData = () => {
    const departments = scholars.reduce((acc, scholar) => {
      if (!acc[scholar.department]) {
        acc[scholar.department] = { articles: 0, journals: 0, bookChapters: 0, conferences: 0, workshops: 0 };
      }
      acc[scholar.department].articles += scholar.researchWorks.articles;
      acc[scholar.department].journals += scholar.researchWorks.journals;
      acc[scholar.department].bookChapters += scholar.researchWorks.bookChapters;
      acc[scholar.department].conferences += scholar.researchWorks.conferences;
      acc[scholar.department].workshops += scholar.researchWorks.workshops;
      return acc;
    }, {});

    return Object.keys(departments).map(department => ({
      name: department,
      researchWorks: departments[department],
    }));
  };

  return (
    <Router>
      <Navbar />
      <hr />
      <main role="main" className="flex-shrink-0">
        <div className="root container">
          <Routes>
            <Route path="/" element={<ScholarList scholars={scholars} />} />
            <Route path="/admin" element={<AdminDashboard scholars={scholars} />} />
            <Route path="/scholar/:orcid" element={<ScholarProfile scholars={scholars} />} />
            <Route path="/department/:name" element={<DepartmentOverview scholars={scholars} />} />
            <Route path="/overall" element={<OverallOverview departmentData={departmentData()} />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </Router>
  );
};

export default App;