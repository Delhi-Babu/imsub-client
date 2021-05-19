const formReducer = (state = true, action) => {
  switch (action.type) {
    case 'VALID':
      return state;
    case 'IN_VALID':
      return !state;
    default:
      return state;
  }
};

export default formReducer;
