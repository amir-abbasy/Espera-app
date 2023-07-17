import React, { useContext } from 'react';
import reducer from './Reducer';

const initialState = {
  user: null, 
  currency: null,
  todoList: [],
};

//Context and Provider
export const AppContext = React.createContext();

const Provider = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    // todoList: state.todoList,
    // addTodoItem: todoItemLabel => {
    //   dispatch({type: actions.ADD_TODO_ITEM, todoItemLabel});
    // },
    // removeTodoItem: todoItemId => {
    //   dispatch({type: actions.REMOVE_TODO_ITEM, todoItemId});
    // },
    // markAsCompleted: todoItemId => {
    //   dispatch({type: actions.TOGGLE_COMPLETED, todoItemId});
    // },
    ...state,
    setUser: payload => {
      dispatch({type: 'ADD_USER', payload});
    },
    setCurrency: payload => {
      dispatch({type: 'SET_CURRENCIES', payload});
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default Provider;
