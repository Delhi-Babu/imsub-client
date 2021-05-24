import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loadInvoices} from '../../redux/actions/invoiceAction';

function GetInvoices() {
  const dispatch = useDispatch();
  const invoices = useSelector(state => state.invoice.invoices);
  useEffect(() => {
    dispatch(loadInvoices());
  }, [dispatch]);
  return <pre>{JSON.stringify(invoices, null, 2)}</pre>;
}

export default GetInvoices;
