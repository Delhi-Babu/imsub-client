import React, {useEffect, useState} from 'react';
import {FaFileInvoiceDollar} from 'react-icons/fa';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import QRCode from 'qrcode.react';
import {ObjectID} from 'bson';
import {saveInvoice} from '../../../redux/actions/invoceuploadaction';
import {useSelector, useDispatch} from 'react-redux';

function Invoices({cName, cAddress1, cAddress2, cGst, cPhone, items}) {
  const dispatch = useDispatch();
  const data = useSelector(state => state.sync.data);
  const initialData = {
    id: '',
    customerName: cName,
    phone: cPhone,
    customerGST: cGst,
    totalAmout: 0,
    totalGST: 0,
    items: [],
    paymentStatus: false,
  };

  const [products, setProducts] = useState([]);
  const [subtotal, setStubtotal] = useState(0);
  const today = new Date().toLocaleDateString('in');
  const [invoiceData, setInvoiceData] = useState(initialData);
  const [id, setId] = useState('');

  useEffect(() => {
    const id = new ObjectID();
    setId(id);
  }, []);
  useEffect(() => {
    let totalPrice = items.reduce(function (accumulator, item) {
      return accumulator + item.rate;
    }, 0);
    setStubtotal(totalPrice);
    setProducts(items);
    const data = {
      id: id,
      customerName: cName,
      phone: cPhone,
      customerGST: cGst,
      items,
      totalAmout: totalPrice,
    };
    setInvoiceData(data);
  }, [cName, cGst, cPhone, items]);
  useEffect(() => {
    dispatch(saveInvoice(invoiceData));
    console.log(invoiceData);
  }, [invoiceData]);
  return (
    <div className='box p-d-flex p-flex-column p-p-5'>
      <div className='invoice-content'>
        <div className='invoice'>
          <div className='invoice-header p-d-flex p-jc-between'>
            <div className='invoice-header-left'>
              <FaFileInvoiceDollar size={40} />
              <div className='company-name'>IMSUB</div>
              <div>xyz, at 123st..</div>
              <div>xyzstate</div>
            </div>
            <div className='invoice-header-right'>
              <div className='title'>Invoice</div>
              <div className='invoice-details'>
                <div className='invoice-label'>Date</div>
                <div className='invoice-label'>{today}</div>
                <div className='invoice-label'>Invoice No</div>
                <div className='invoice-label'>12345</div>
                <div className='invoice-label'>GST No</div>
                <div className='invoice-label'>aabbccdd11</div>
              </div>
            </div>
          </div>
          <div className='invoice-to'>
            <div className='invoice-to-left'>
              <div className='bill-to'>Bill to</div>
              <div className='info'>
                <div className='name'>
                  {cName || 'John Doe'},
                  <span className='address1'> {cAddress1 || '1st area'}</span>
                </div>
                <div className='address2'>{cAddress2 || 'State, India'}</div>
              </div>
            </div>
            <div className='invoice-to-right'>
              <div className='title'>Details</div>
              <div className='customer-details'>
                <div className='customer-label'>GST NO</div>
                <div className='customer-label'>{cGst || 'aabbccdd11'}</div>
                <div className='customer-label'>phone</div>
                <div className='customer-label'>{cPhone || '1234567890'}</div>
              </div>
            </div>
          </div>
          <div className='invoice-items'>
            <div className='table'>
              <DataTable value={products}>
                <Column field='name' header='Name'></Column>
                <Column
                  field='price'
                  header='Price'
                  className='p-text-right'></Column>
                <Column
                  field='quantity'
                  header='Quantity'
                  className='p-text-right'></Column>
                <Column
                  field='gst'
                  header='GST'
                  className='p-text-right'></Column>
                <Column
                  field='rate'
                  header='Rate'
                  className='p-text-right'></Column>
              </DataTable>
            </div>
          </div>
          <div className='invoice-summary'>
            <div className='invoice-summary-left'>
              <QRCode
                value={`${id}X${items}X${subtotal}`}
                renderAs='svg'
                size={60}
              />
            </div>
            <div className='invoice-summary-right'>
              <div className='summary-details'>
                <div className='summary-label'>Sub Total</div>
                <div className='summary-label'>{subtotal}</div>
                <div className='summary-label'>Vat</div>
                <div className='summary-label'>0</div>
                <div className='summary-label'>Total</div>
                <div className='summary-label'>{subtotal}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {console.log(id.toString())}
    </div>
  );
}

export default Invoices;
