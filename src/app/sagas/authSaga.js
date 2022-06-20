import { post } from "../../tools/api";
import * as type from '../types';
import {call, all, put, fork, takeEvery} from 'redux-saga/effects';

async function getLogin(data) {
    return await post("/user/login", {...data});
}

function* fetchLogin(action) {
    console.log(action)
    try {
        const data = yield call(getLogin, action.payload)
        yield put({type: type.REQUEST_SUCCESS, data})
    } catch (error) {
       yield put({type: type.REQUEST_FAILED, error}) 
    }
}

function* loginSaga() {
    yield takeEvery(type.LOGIN_REQUEST, fetchLogin)
}

export default function* rootSaga() {
    yield all([
        fork(loginSaga)
    ]);
}