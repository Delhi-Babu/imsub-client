import React from 'react';
import {useEffect, useState} from 'react';

import Invoicecards from './invoicescards';
function InvoiceList(props) {
  const [invoices, setInvoices] = useState([]);
  const [count, setCount] = useState(1);
  useEffect(() => {
    //rerender when invoices changes
    setInvoices(props.invoices);
    console.log(invoices);
    setCount(count + 1);
  }, [props.invoices]);

  // <div>
  //   <Invoicecards
  //     key={invoiceItem._id}
  //     name={invoiceItem.customerName}
  //     phone={invoiceItem.phone}
  //     totalAmount={invoiceItem.totalAmout}
  //     status={invoiceItem.paymentStatus}
  //   />
  // </div>

  // <h1>
  //   HI
  //   {console.log(invoiceItem)}
  // </h1>
  return (
    <div>
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
