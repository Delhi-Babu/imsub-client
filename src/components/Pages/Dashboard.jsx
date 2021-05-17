import React, {useState, useEffect} from 'react';

const axios = require('axios');
axios.defaults.withCredentials = true;

const host = 'http://localhost:5000';
const version = 'v1';
const url = `${host}/api/${version}/auth/me`;

function Dashboard() {
  const [UserData, setUserData] = useState({userData: 'null'});
  const [IsLoading, setIsLoading] = useState(false);
  const [Authorised, setAuthorised] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url, {withCredentials: true})
      .then(function (response) {
        setUserData(response.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setIsLoading(false);
          setAuthorised(false);
        }
      });
  }, []);
  return (
    <div>
      {Authorised ? (
        <pre>
          {IsLoading ? 'Loading.....' : JSON.stringify(UserData, null, 2)}
        </pre>
      ) : (
        <h1>401</h1>
      )}
    </div>
  );
}

export default Dashboard;
