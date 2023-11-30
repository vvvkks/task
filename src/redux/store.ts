import { createStore, Store } from 'redux';
import appReducer, { AppState, AppAction } from './appReducer';

const store: Store<AppState, AppAction> = createStore(appReducer);

export default store;
