import React from 'react';
import {Card} from 'primereact/card';

function Invoicecards({name, phone, totalAmount, status}) {
  // <span>{name}</span>
  // <span>{phone}</span>
  // <span>{totalAmount}</span>
  // {status ? <span>Paid</span> : <span>Not Paid</span>}
  return (
    <div>
      <Card title='INVOICE' style={{width: '25rem', marginBottom: '2em'}}>
        <div>{name}</div>
        <div>{phone}</div>
        <div>{totalAmount}</div>
        {status ? <div>Paid</div> : <div>Not Paid</div>}
      </Card>
    </div>
  );
}

export default Invoicecards;
