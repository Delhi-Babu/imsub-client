import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';

import {FaFileInvoiceDollar} from 'react-icons/fa';

import {Menubar} from 'primereact/menubar';
import {useSelector} from 'react-redux';

const NavBar = () => {
  let history = useHistory();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const items = [
    {
      icon: 'pi pi-fw pi-file',
      label: 'Invoices',
      command: () => {
        history.push('/getInvoices');
      },
    },
    {
      icon: 'pi pi-fw pi-file',
      label: 'Create invoice',
      command: () => {
        history.push('/dashboard');
      },
    },
  ];

  const start = (
    <div className='logo p-mr-2'>
      <FaFileInvoiceDollar size={30} />
    </div>
  );
  const end = (() => {
    if (isAuthenticated) {
      return (
        <ul className='p-d-flex'>
          <li className='p-menuitem'>
            <NavLink
              to='/logout'
              className='p-menuitem-link'
              activeClassName='active'>
              <span className='p-menuitem-icon pi pi-fw pi-sign-out'> </span>
              <span className='p-menuitem-text'>Logout</span>
            </NavLink>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className='p-d-flex'>
          <li className='p-menuitem'>
            <NavLink
              to='/login'
              className='p-menuitem-link'
              activeClassName='active'>
              <span className='p-menuitem-icon pi pi-fw pi-sign-in'> </span>
              <span className='p-menuitem-text'>Login</span>
            </NavLink>
          </li>
          <li className='p-menuitem'>
            <NavLink
              to='/signup'
              className='p-menuitem-link'
              activeClassName='active'>
              <span className='p-menuitem-icon pi pi-fw pi-user-plus'></span>
              <span className='p-menuitem-text'>Login</span>
            </NavLink>
          </li>
        </ul>
      );
    }
  })();
  return (
    <div className='nav'>
      <Menubar
        className={`${isAuthenticated ? '' : 'notAuthenticated'}`}
        model={items}
        start={start}
        end={end}
      />
    </div>
  );
};

export default NavBar;
