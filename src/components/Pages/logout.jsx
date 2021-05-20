import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {userLogout} from '../../redux/actions/authAction';

function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userLogout());
  });
  return (
    <div>
      <h1>Logging out......</h1>
    </div>
  );
}

export default Logout;
