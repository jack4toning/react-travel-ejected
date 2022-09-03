import { Middleware } from 'redux';

export const actionLog: Middleware = (store) => (next) => (action) => {
  console.log('Current state: ', store.getState());
  console.log('first action: ', action);
  next(action);
  console.log('Updated state: ', store.getState());
};
