import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadInvoices} from '../../redux/actions/invoiceAction';
import InvoiceList from './invoiceList';

function GetInvoices() {
  const dispatch = useDispatch();
  const invoices = useSelector(state => state.invoice.invoices);
  const isLoading = useSelector(state => state.invoice.isLoading);
  const [data, setdata] = useState([]);
  const mounted = useRef();

  useEffect(() => {
    // if (!mounted.current) {
    dispatch(loadInvoices()).then(console.log('something'));
    // mounted.current = true;
    // } else {
    // }
  }, []);
  useEffect(() => {
    setdata(invoices);
  }, [invoices]);

  // <pre>{JSON.stringify(invoices, null, 2)}</pre>
  // {isLoading ? <div>Loading....</div> : <InvoiceList invoices={data} />}
  return (
    <div>
      {isLoading ? <div>Loading....</div> : <InvoiceList invoices={data} />}
    </div>
  );
}

export default GetInvoices;
