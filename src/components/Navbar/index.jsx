import React from 'react';
import {NavLink} from 'react-router-dom';

import {FaFileInvoiceDollar} from 'react-icons/fa';

import {Menubar} from 'primereact/menubar';

// function NavBar() {
const NavBar = () => {
  const start = (
    <div className='logo p-mr-2'>
      <FaFileInvoiceDollar size={30} />
    </div>
  );
  const end = (
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
          SignUp
        </NavLink>
      </li>
      <li className='p-menuitem'>
        <NavLink
          to='/dashboard'
          className='p-menuitem-link'
          activeClassName='active'>
          Dashboard
        </NavLink>
      </li>
    </ul>
  );
  return (
    <div className='nav'>
      <Menubar start={start} end={end} />
    </div>
  );
};

export default NavBar;
