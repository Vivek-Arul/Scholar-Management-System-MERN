import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchScholars } from '../redux/actions/scholarActions';
import { Link } from 'react-router-dom';
import '../styles/ScholarList.css';

const ScholarList = ({ fetchScholars, scholars, isLoading, error }) => {
  
  useEffect(() => {
    fetchScholars();
  }, [fetchScholars]);

  if (isLoading) {
    return <div>Fetching data...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const groupedScholars = scholars.reduce((acc, scholar) => {
    if (!acc[scholar.department]) {
      acc[scholar.department] = [];
    }
    acc[scholar.department].push(scholar);
    return acc;
  }, {});

  return (
    <div className="mt-4">
      <h2>Scholar List</h2>
      {Object.entries(groupedScholars).map(([department, scholars]) => (
        <div key={department} className="mb-4">
          <h4>{department}</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>ORCID</th>
              </tr>
            </thead>
            <tbody>
              {scholars.map((scholar) => (
                <tr key={scholar.orcid}>
                  <td>
                    <Link to={`/scholar/${scholar.orcid}`} className="scholar-name">
                      {scholar.name}
                    </Link>
                  </td>
                  <td>
                    <span className="orcid-tooltip">
                      {scholar.orcid}
                      <span className="tooltip-text">Open Researcher and Contributor ID</span>
                    </span>
                  </td>
                </tr>
              ))}
              {scholars.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center">No scholars available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  scholars: state.scholarReducer.scholars,
  isLoading: state.scholarReducer.isLoading,
  error: state.scholarReducer.error,
});

export default connect(mapStateToProps, { fetchScholars })(ScholarList);