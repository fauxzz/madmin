import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducer";
import rootSaga from "./sagas/index";
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const store = compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__(),
    )(createStore)(rootReducer);

sagaMiddleware.run(rootSaga);

export default store;