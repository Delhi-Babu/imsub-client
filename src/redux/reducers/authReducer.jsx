const initState = {
  token: '',
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

const authReducer =  (state = initState, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {...state};
    default:
      return {...state};
  }
}

export default authReducer;
