import { combineReducers } from 'redux';

const INITIAL_STATE = {
  favorites: []
};

const repoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_FAVORITES':
        return { favorites: action.payload };
    case 'TOGGLE_FAVORITE':
        const { favorites } = state;
        const isInside = favorites.findIndex(item => item.id === action.payload.id);
        let newState = {};
        
        if (isInside > -1) {
            favorites.splice(isInside, 1);
            newState = { favorites };
        } else {
            favorites.push(action.payload);
            newState = { favorites };
        }

        return newState;
    default:
      return state
  }
};

export default combineReducers({
  repos: repoReducer,
});