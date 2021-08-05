import React from 'react';
import {useEffect, useState} from 'react';

import Invoicecards from './invoicescards';
function InvoiceList(props) {
  const [invoices, setInvoices] = useState([]);
  const [count, setCount] = useState(1);
  useEffect(() => {
    //rerender when invoices changes
    console.log('changed');
    setInvoices(props.invoices);
    console.log(invoices);
    setCount(count + 1);
  }, [props.invoices]);

  return (
    <div className='p-grid p-justify-even' style={{margin: '1rem'}}>
      {console.log(invoices)}
      {invoices.map(invoiceItem => (
        <Invoicecards
          key={invoiceItem._id}
          name={invoiceItem.customerName}
          phone={invoiceItem.phone}
          totalAmount={invoiceItem.totalAmout}
          status={invoiceItem.paymentStatus}
        />
      ))}
    </div>
  );
}

export default InvoiceList;
