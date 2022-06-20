import {combineReducers} from '@reduxjs/toolkit';
import auth from './authReducer';
import categories from './categoriesReducer';
import subcategories from './subcategoriesReducer';

const rootReducer = combineReducers({
    auth,
    categories,
    subcategories
});

export default rootReducer;