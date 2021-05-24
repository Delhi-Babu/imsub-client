import React, {useState, useRef} from 'react';
import Invoices from './subComponents/invoices.jsx';
import {TabView, TabPanel} from 'primereact/tabview';
import {useFormik} from 'formik';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Dialog} from 'primereact/dialog';
import {InputNumber} from 'primereact/inputnumber';
import {classNames} from 'primereact/utils';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';

function CreateInvoice() {
  // ((emptyProduct.price * emptyProduct.quantity) / emptyProduct.gst) * 100,
  let emptyProduct = {
    id: null,
    name: '',
    price: 1,
    quantity: 1,
    gst: 1,
    rate: 0,
  };

  const [selectedProducts, setSelectedProducts] = useState(null);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [submitted, setSubmitted] = useState(false);
  const [productDialog, setProductDialog] = useState(false);

  const [products, setProducts] = useState([]);
  const dt = useRef(null);

  const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = [...products];
      let _product = {...product};
      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
      } else {
        _product.id = createId();
        _product.image = 'product-placeholder.svg';
        _products.push(_product);
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter(val => !selectedProducts.includes(val));
    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
  };

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };
  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };
  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };
  const customerDetails = useFormik({
    initialValues: {
      cName: '',
      cAddress1: '',
      cAddress2: '',
      cGst: '',
      cPhone: '',
    },
    onSubmit: data => {
      console.log(data);
    },
  });
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = {...product};
    _product[`${name}`] = val;

    setProduct(_product);
  };
  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = {...product};
    _product[`${name}`] = val;

    setProduct(_product);
  };
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label='Cancel'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideDialog}
      />
      <Button
        label='Save'
        icon='pi pi-check'
        className='p-button-text'
        onClick={saveProduct}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label='No'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label='Yes'
        icon='pi pi-check'
        className='p-button-text'
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );
  const createId = () => {
    let id = '';
    let chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };
  const findIndexById = id => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };
  return (
    <div className='create-invoice'>
      <div className='create'>
        <div className='buyer-details'>
          <TabView className='tabview-custom'>
            <TabPanel header='Customer Details' leftIcon='pi-fw pi pi-user'>
              <div className='customer-form p-mt-5'>
                <form
                  onSubmit={customerDetails.handleSubmit}
                  className='p-fluid'>
                  <div className='p-field'>
                    <span className='p-float-label'>
                      <InputText
                        id='cName'
                        name='cName'
                        value={customerDetails.values.cName}
                        onChange={customerDetails.handleChange}
                      />
                      <label htmlFor='name'>Customer Name*</label>
                    </span>
                  </div>
                  <div className='p-field'>
                    <span className='p-float-label'>
                      <InputText
                        id='cAddress1'
                        name='cAddress1'
                        value={customerDetails.values.cAddress1}
                        onChange={customerDetails.handleChange}
                      />
                      <label htmlFor='name'>Address 1*</label>
                    </span>
                  </div>
                  <div className='p-field'>
                    <span className='p-float-label'>
                      <InputText
                        id='cAddress2'
                        name='cAddress2'
                        value={customerDetails.values.cAddress2}
                        onChange={customerDetails.handleChange}
                      />
                      <label htmlFor='name'>Address 2*</label>
                    </span>
                  </div>
                  <div className='p-field'>
                    <span className='p-float-label'>
                      <InputText
                        id='cGst'
                        name='cGst'
                        value={customerDetails.values.cGst}
                        onChange={customerDetails.handleChange}
                      />
                      <label htmlFor='name'>Customer Gst*</label>
                    </span>
                  </div>
                  <div className='p-field'>
                    <span className='p-float-label'>
                      <InputText
                        id='cPhone'
                        name='cPhone'
                        value={customerDetails.values.cPhone}
                        onChange={customerDetails.handleChange}
                      />
                      <label htmlFor='name'>Customer Phone*</label>
                    </span>
                  </div>
                </form>
              </div>
            </TabPanel>
            <TabPanel header=' Items' leftIcon='pi-fw pi pi-shopping-cart'>
              <Button
                label='New'
                icon='pi pi-plus'
                className='p-button-success p-mr-2'
                onClick={openNew}
              />

              <Button
                label='Delete'
                icon='pi pi-trash'
                className='p-button-danger'
                onClick={confirmDeleteSelected}
                disabled={!selectedProducts || !selectedProducts.length}
              />

              <Dialog
                visible={productDialog}
                style={{width: '450px'}}
                header='Product Details'
                modal
                className='p-fluid'
                footer={productDialogFooter}
                onHide={hideDialog}>
                <div className='p-field'>
                  <label htmlFor='name'>Name</label>
                  <InputText
                    id='name'
                    value={product.name}
                    onChange={e => onInputChange(e, 'name')}
                    required
                    autoFocus
                    className={classNames({
                      'p-invalid': submitted && !product.name,
                    })}
                  />
                  {submitted && !product.name && (
                    <small className='p-error'>Name is required.</small>
                  )}
                </div>
                <div className='p-field'>
                  <label htmlFor='price'>Price</label>
                  <InputNumber
                    id='price'
                    value={product.price}
                    onValueChange={e => onInputNumberChange(e, 'price')}
                    mode='currency'
                    currency='INR'
                  />
                </div>
                <div className='p-field'>
                  <label htmlFor='quantity'>Quantity</label>
                  <InputNumber
                    id='quantity'
                    value={product.quantity}
                    onValueChange={e => onInputNumberChange(e, 'quantity')}
                    integeronly
                  />
                </div>
                <div className='p-field'>
                  <label htmlFor='gst'>GST</label>
                  <InputNumber
                    id='gst'
                    value={product.gst}
                    onValueChange={e => onInputNumberChange(e, 'gst')}
                    integeronly
                  />
                </div>

                <div className='p-field'>
                  <label htmlFor='price'>Rate</label>
                  <InputNumber
                    id='rate'
                    value={
                      (product.rate =
                        product.quantity * product.price +
                        ((product.quantity * product.price) / 100) *
                          product.gst)
                    }
                    onValueChange={e => onInputNumberChange(e, 'price')}
                    mode='currency'
                    currency='INR'
                    locale='en-IN'
                    disabled
                  />
                </div>
              </Dialog>

              <DataTable
                ref={dt}
                value={products}
                selection={selectedProducts}
                onSelectionChange={e => setSelectedProducts(e.value)}>
                <Column
                  selectionMode='multiple'
                  headerStyle={{width: '3rem'}}></Column>
                <Column field='name' header='Name'></Column>
                <Column field='quantity' header='quantity'></Column>
              </DataTable>
            </TabPanel>
          </TabView>
        </div>
        {console.log(product.price)}
      </div>
      <div className='preview'>
        <Invoices
          cName={customerDetails.values.cName}
          cAddress1={customerDetails.values.cAddress1}
          cAddress2={customerDetails.values.cAddress2}
          cGst={customerDetails.values.cGst}
          cPhone={customerDetails.values.cPhone}
          items={products}
        />
      </div>
    </div>
  );
}

export default CreateInvoice;
