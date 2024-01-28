import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query/react';
import {combineReducers} from 'redux';
import postReducer from './slices/postSlice';

const reducers = combineReducers({
  post: postReducer,
});

let createDebugger: any;

if (process.env.REACT_APP_NODE_ENV !== 'production') {
  createDebugger = require('redux-flipper').default;
}

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.REACT_APP_NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    process.env.REACT_APP_NODE_ENV === 'production'
      ? getDefaultMiddleware({
          serializableCheck: false,
        })
      : getDefaultMiddleware({
          serializableCheck: false,
        }).concat(createDebugger()),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
