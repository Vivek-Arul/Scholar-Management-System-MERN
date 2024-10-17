import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addScholar, updateScholar } from '../redux/actions/scholarActions';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const AddScholar = ({ addScholar, updateScholar, scholarData }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (scholarData) {
      reset({
        name: scholarData.name,
        department: scholarData.department,
        orcid: scholarData.orcid,
        googleScholar: scholarData.googleScholar,
        sciencedirect: scholarData.sciencedirect,
        scopus: scholarData.scopus,
        articles: scholarData.researchWorks.articles,
        journals: scholarData.researchWorks.journals,
        bookChapters: scholarData.researchWorks.bookChapters,
        conferences: scholarData.researchWorks.conferences,
        workshops: scholarData.researchWorks.workshops,
      });
    }
  }, [scholarData, reset]);

  const onSubmit = (data) => {
    const newScholar = {
      id: scholarData ? scholarData.id : uuidv4(),
      ...data,
      researchWorks: {
        articles: parseInt(data.articles, 10),
        journals: parseInt(data.journals, 10),
        bookChapters: parseInt(data.bookChapters, 10),
        conferences: parseInt(data.conferences, 10),
        workshops: parseInt(data.workshops, 10),
      },
    };

    if (scholarData) {
      updateScholar(newScholar);
    } else {
      addScholar(newScholar);
    }

    reset();
  };

  return (
    <div className="mt-4">
      <h2>{scholarData ? 'Update Scholar' : 'Add Scholar'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            {...register('name', { required: true })}
          />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            className="form-control"
            {...register('department', { required: true })}
          />
        </div>
        <div className="form-group">
          <label>ORCID ID:</label>
          <input
            type="text"
            className="form-control"
            {...register('orcid')}
          />
        </div>
        <div className="form-group">
          <label>Google Scholar Profile:</label>
          <input
            type="text"
            className="form-control"
            {...register('googleScholar')}
          />
        </div>
        <div className="form-group">
          <label>ScienceDirect ID:</label>
          <input
            type="text"
            className="form-control"
            {...register('sciencedirect')}
          />
        </div>
        <div className="form-group">
          <label>Scopus ID:</label>
          <input
            type="text"
            className="form-control"
            {...register('scopus')}
          />
        </div>
        <div className="form-group">
          <label>Articles:</label>
          <input
            type="number"
            className="form-control"
            {...register('articles')}
          />
        </div>
        <div className="form-group">
          <label>Journals:</label>
          <input
            type="number"
            className="form-control"
            {...register('journals')}
          />
        </div>
        <div className="form-group">
          <label>Book Chapters:</label>
          <input
            type="number"
            className="form-control"
            {...register('bookChapters')}
          />
        </div>
        <div className="form-group">
          <label>Conferences:</label>
          <input
            type="number"
            className="form-control"
            {...register('conferences')}
          />
        </div>
        <div className="form-group">
          <label>Workshops:</label>
          <input
            type="number"
            className="form-control"
            {...register('workshops')}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          {scholarData ? 'Update Scholar' : 'Add Scholar'}
        </button>
      </form>
    </div>
  );
};

AddScholar.propTypes = {
  addScholar: PropTypes.func.isRequired,
  updateScholar: PropTypes.func.isRequired,
  scholarData: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  scholarData: state.scholars.find(scholar => scholar.id === ownProps.match.params.id),
});

export default connect(mapStateToProps, { addScholar, updateScholar })(AddScholar);
