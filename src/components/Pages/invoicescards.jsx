import React from 'react';
import {Card} from 'primereact/card';

function Invoicecards({name, phone, totalAmount, status}) {
  return (
    <div className='p-col-4'>
      <Card title='INVOICE' style={{width: '25rem', marginBottom: '5em'}}>
        <div>{name}</div>
        <div>{phone}</div>
        <div>{totalAmount}</div>
        {status ? <div>Paid</div> : <div>Not Paid</div>}
      </Card>
    </div>
  );
}

export default Invoicecards;
