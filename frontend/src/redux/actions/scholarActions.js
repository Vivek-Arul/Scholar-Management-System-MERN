import axios from 'axios';

export const FETCH_SCHOLARS_REQUEST = 'FETCH_SCHOLARS_REQUEST';
export const FETCH_SCHOLARS_SUCCESS = 'FETCH_SCHOLARS_SUCCESS';
export const FETCH_SCHOLARS_FAILURE = 'FETCH_SCHOLARS_FAILURE';
export const ADD_SCHOLAR = 'ADD_SCHOLAR';
export const UPDATE_SCHOLAR = 'UPDATE_SCHOLAR';
export const DELETE_SCHOLAR = 'DELETE_SCHOLAR';

export const fetchScholars = () => async (dispatch) => {
  dispatch({ type: FETCH_SCHOLARS_REQUEST });
  try {
    const response = await axios.get('http://scholar-management-system-mern.vercel.app/api/scholars');
    dispatch({ type: FETCH_SCHOLARS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_SCHOLARS_FAILURE, payload: error.message });
  }
};

export const addScholar = (scholar) => async (dispatch) => {
  try {
    const response = await axios.post('http://scholar-management-system-mern.vercel.app/api/scholars', scholar);
    dispatch({ type: ADD_SCHOLAR, payload: response.data });
    alert("Scholar Added Successfully");
  } catch (error) {
    console.error('Error adding scholar:', error);
    alert("Error adding scholar");
  }
};

export const updateScholar = (scholar) => async (dispatch) => {
  try {
    const response = await axios.put(`http://scholar-management-system-mern.vercel.app/api/scholars/${scholar.orcid}`, scholar);
    dispatch({ type: UPDATE_SCHOLAR, payload: response.data });
    alert("Scholar Updated Successfully");
  } catch (error) {
    console.error('Error updating scholar:', error);
    alert("Error updating scholar");
  }
};

export const deleteScholar = (orcid) => async (dispatch) => {
  try {
    await axios.delete(`http://scholar-management-system-mern.vercel.app/api/scholars/${orcid}`);
    dispatch({ type: DELETE_SCHOLAR, payload: orcid });
    alert("Scholar Deleted Successfully");
  } catch (error) {
    console.error('Error deleting scholar:', error);
    alert("Error deleting scholar");
  }
};
