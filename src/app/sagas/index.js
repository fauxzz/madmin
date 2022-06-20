import {all} from 'redux-saga/effects'
import authSaga from './authSaga';
import categoriesSaga from './categoriesSaga';
import subcategoriesSaga from './subcategoriesSaga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        categoriesSaga(),
        subcategoriesSaga()
    ]);
}
