import React, {useState, useEffect} from 'react';
import {Avatar} from 'primereact/avatar';

function DashboardContents(props) {
  const [data, setData] = useState({
    firstName: ' ',
    secondName: ' ',
  });
  useEffect(() => {
    setData(props.data);
  }, []);
  return (
    <div className='p-m-4'>
      <h1>
        Welcome {data.firstName} {data.secondName}
      </h1>
      <Avatar
        label={`${data.firstName[0]}${data.secondName[0]}`}
        style={{backgroundColor: '#9c27b0', color: '#ffffff'}}
        className='p-mr-2'
        size='xlarge'
      />
      <h3>email: {data.email}</h3>
      <h1>gst: {data.gst}</h1>
      <h3>company name: {data.companyName}</h3>
      <h2>role: {data.role}</h2>
    </div>
  );
}

export default DashboardContents;
