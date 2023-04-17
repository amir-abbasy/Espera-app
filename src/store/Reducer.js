//Initial State and Actions
const reducer = (state, action) => {
  console.log("action", action);
  switch (action.type) {
    // case actions.ADD_TODO_ITEM:
    //   return {
    //     todoList: [
    //       ...state.todoList,
    //       {
    //         id: new Date().valueOf(),
    //         label: action.todoItemLabel,
    //         completed: false,
    //       },
    //     ],
    //   };
    // case actions.REMOVE_TODO_ITEM: {
    //   const filteredTodoItem = state.todoList.filter(
    //     todoItem => todoItem.id !== action.todoItemId,
    //   );
    //   return {todoList: filteredTodoItem};
    // }
    // case actions.TOGGLE_COMPLETED: {
    //   const updatedTodoList = state.todoList.map(todoItem =>
    //     todoItem.id === action.todoItemId
    //       ? {...todoItem, completed: !todoItem.completed}
    //       : todoItem,
    //   );
    //   return {todoList: updatedTodoList};
    // }

    case 'ADD_USER': {
      return {...state, user: action.payload};
    }

    case 'SET_CURRENCIES': {
      return {...state, currency: action.payload};
    }

    default:
      return state;
  }
};

export default reducer;
