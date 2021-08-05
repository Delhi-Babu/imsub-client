import React, {useEffect} from 'react';
import {loadUser} from '../../redux/actions/authAction';
import {useDispatch, useSelector} from 'react-redux';
import DashboardContents from './DashboardContents';

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
        <div>
          {isLoading ? 'Loading.....' : <DashboardContents data={UserData} />}
          {console.log(UserData)}
        </div>
      ) : (
        <h1>401</h1>
      )}
    </div>
  );
}

export default Dashboard;
