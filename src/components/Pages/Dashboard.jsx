import React, {useEffect} from 'react';
import {loadUser} from '../../redux/actions/authAction';
import {useDispatch, useSelector} from 'react-redux';

function Dashboard() {
  const dispatch = useDispatch();
  const UserData = useSelector(state => state.auth.user);
  const isLoading = useSelector(state => state.auth.isLoading);
  const isAuthorised = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <div>
      {isAuthorised ? (
        <pre>
          {isLoading ? 'Loading.....' : JSON.stringify(UserData, null, 2)}
        </pre>
      ) : (
        <h1>401</h1>
      )}
    </div>
  );
}

export default Dashboard;
