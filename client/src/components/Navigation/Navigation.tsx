import React, { useState, ReactChildren } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Link from 'next/link';
import cookie from 'js-cookie';
import Router, { useRouter } from 'next/router';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdbreact';

const NavLink: React.FC<{ children: any; href: string }> = ({
  children,
  href,
}) => {
  const router = useRouter();

  return (
    <MDBNavItem active={router.pathname === href}>
      <Link href={href}>
        <a className="nav-link">{children}</a>
      </Link>
    </MDBNavItem>
  );
};

export const Navigation = () => {
  const logout = () => {
    cookie.remove('jwtToken');
    cookie.remove('user');
    Router.push('/products');
  };

  const user = cookie.get('user');

  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const userLinks = (
    <MDBNavbarNav right>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/products">Products</NavLink>
      <NavLink href="/cart">Cart</NavLink>
      <MDBNavItem>
        <a href="/" onClick={logout} className="nav-link">
          Logout
        </a>
      </MDBNavItem>

      <MDBDropdown>
        <MDBDropdownToggle nav caret>
          <span className="mr-2">Profile</span>
        </MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem href="#!">Orders</MDBDropdownItem>
          <MDBDropdownItem href="#!">Account</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </MDBNavbarNav>
  );

  const guestLinks = (
    <MDBNavbarNav right>
      <NavLink href="/">Home</NavLink>

      <NavLink href="/products">Products</NavLink>

      <NavLink href="/login">Login</NavLink>

      <NavLink href="/register">SignUp</NavLink>

      <NavLink href="/cart">Cart</NavLink>
    </MDBNavbarNav>
  );

  return (
    <MDBNavbar color="indigo" dark expand="md">
      <MDBNavbarBrand>
        <Link href="/">
          <strong className="white-text">Wishmart</strong>
        </Link>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        {user ? userLinks : guestLinks}
      </MDBCollapse>
    </MDBNavbar>
  );
};

export default Navigation;
