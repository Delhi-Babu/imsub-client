const loginUser = userData => {
  return {
    type: 'LOGIN_USER',
    payload: userData,
  };
};
