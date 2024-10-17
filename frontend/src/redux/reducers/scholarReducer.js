import {
  FETCH_SCHOLARS_REQUEST,
  FETCH_SCHOLARS_SUCCESS,
  FETCH_SCHOLARS_FAILURE,
  ADD_SCHOLAR,
  UPDATE_SCHOLAR,
  DELETE_SCHOLAR,
} from '../actions/scholarActions';

const initialState = {
  scholars: [],
  isLoading: false,
  error: null,
};

const scholarReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SCHOLARS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SCHOLARS_SUCCESS:
      return {
        ...state,
        scholars: action.payload,
        isLoading: false,
      };
    case FETCH_SCHOLARS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case ADD_SCHOLAR:
      return {
        ...state,
        scholars: [...state.scholars, action.payload],
      };
    case UPDATE_SCHOLAR:
      return {
        ...state,
        scholars: state.scholars.map((scholar) =>
          scholar.orcid === action.payload.orcid ? action.payload : scholar
        ),
      };
    case DELETE_SCHOLAR:
      return {
        ...state,
        scholars: state.scholars.filter((scholar) => scholar.orcid !== action.payload),
      };
    default:
      return state;
  }
};

export default scholarReducer;