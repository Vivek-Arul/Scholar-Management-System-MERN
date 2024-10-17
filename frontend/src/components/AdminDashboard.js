import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addScholar, updateScholar, deleteScholar, fetchScholars } from '../redux/actions/scholarActions'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/AdminDashboard.css';

const AdminDashboard = ({ scholars, fetchScholars, addScholar, updateScholar, deleteScholar }) => {
  const [formData, setFormData] = useState({
    orcid: '',
    name: '',
    department: '',
    googleScholar: '',
    sciencedirect: '',
    scopus: '',
    researchWorks: {
      articles: 0,
      journals: 0,
      bookChapters: 0,
      conferences: 0,
      workshops: 0,
    },
  });
  
  const [isLoadingScholars, setIsLoadingScholars] = useState(true);

  useEffect(() => {
    const loadScholars = async () => {
      setIsLoadingScholars(true)
      await fetchScholars();
      setIsLoadingScholars(false);
    };

    loadScholars();
    resetForm();
  }, [fetchScholars]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('researchWorks.')) {
      const key = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        researchWorks: {
          ...prevData.researchWorks,
          [key]: Math.max(0, parseInt(value, 10)) || 0,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const checkScholar = ({ scholars }, orcid) => {
    const exists = scholars.some(scholar => scholar.orcid === orcid);
    return exists;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (checkScholar({ scholars }, formData.orcid)) {
        await updateScholar(formData);
      } else {
        await addScholar(formData);
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      orcid: '',
      name: '',
      department: '',
      googleScholar: '',
      sciencedirect: '',
      scopus: '',
      researchWorks: {
        articles: 0,
        journals: 0,
        bookChapters: 0,
        conferences: 0,
        workshops: 0,
      },
    });
  };

  const handleDelete = async (orcid) => {
    await deleteScholar(orcid);
  };

  const handleEdit = (scholar) => {
    setFormData(scholar);
  };

  return (
    <div className="container">
      <h2 className="my-4">Admin Dashboard</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="form-control mb-2"
            />
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="form-control mb-2"
            >
              <option value="">Select Department</option>
              <option value="Computer Science Engineering">Computer Science Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics and Communication Engineering">Electronics and Communication Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
            </select>
            <input
              type="text"
              name="orcid"
              value={formData.orcid}
              onChange={handleChange}
              placeholder="ORCID"
              required
              className="form-control mb-2"
            />
          </div>
          <div className="col-md-6">
            <input
              type="url"
              name="googleScholar"
              value={formData.googleScholar}
              onChange={handleChange}
              placeholder="Google Scholar Link"
              className="form-control mb-2"
            />
            <input
              type="url"
              name="sciencedirect"
              value={formData.sciencedirect}
              onChange={handleChange}
              placeholder="ScienceDirect Link"
              className="form-control mb-2"
            />
            <input
              type="url"
              name="scopus"
              value={formData.scopus}
              onChange={handleChange}
              placeholder="Scopus Link"
              className="form-control mb-2"
            />
          </div>
        </div>
        <h4>Research Works</h4>
        <div className="row">
          {Object.keys(formData.researchWorks).map((key) => (
            <div className="col-md-2 mb-2" key={key}>
              <input
                type="number"
                name={`researchWorks.${key}`}
                value={formData.researchWorks[key]}
                onChange={handleChange}
                placeholder={`${key.charAt(0).toUpperCase() + key.slice(1)}`}
                className="form-control"
                min="0"
              />
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <h3>Existing Scholars</h3>
      {isLoadingScholars ? (
        <div className="text-center mt-4">Fetching data...</div>
      ) : (
        <table className='custom-table'>
          <thead className="thead-light">
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Department</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(scholars) && scholars.length > 0 ? (
              scholars.map((scholar) => (
                <tr key={scholar.orcid}>
                  <td>{scholar.name}</td>
                  <td>{scholar.department}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => handleEdit(scholar)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(scholar.orcid)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">No scholars available.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

AdminDashboard.propTypes = {
  scholars: PropTypes.array.isRequired,
  addScholar: PropTypes.func.isRequired,
  updateScholar: PropTypes.func.isRequired,
  deleteScholar: PropTypes.func.isRequired,
  fetchScholars: PropTypes.func.isRequired, 
};

const mapStateToProps = (state) => ({
  scholars: state.scholarReducer.scholars || [],
});

const mapDispatchToProps = {
  addScholar,
  updateScholar,
  deleteScholar,
  fetchScholars,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);