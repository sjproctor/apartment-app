import React, { useState } from 'react'
import {
  Collapse,
  Container,
  Jumbotron,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'

const Header = (props) => {
  const [collapsed, setCollapsed] = useState(true)
  const toggleNavbar = () => setCollapsed(!collapsed)
  const {
    logged_in,
    sign_in_route,
    sign_up_route,
    sign_out_route,
    current_user
  } = props
  return(
    <React.Fragment>
      <div id="header">
        <h1 className="display-3">Apartment App</h1>
        <Navbar light>
          <NavbarBrand href="/" className="mr-auto"></NavbarBrand>
            <NavbarToggler onClick={ toggleNavbar } className="mr-2"/>
            <Collapse isOpen={ !collapsed } navbar>
              <Nav navbar>
              <NavItem>
                <a className="links" href="/">Home</a>
              </NavItem>
              <NavItem>
                <a href="/apartmentindex">All the Apartments</a>
              </NavItem>
              { logged_in &&
                <NavItem>
                  <a className="links" href={ sign_out_route }>Sign Out</a>
                </NavItem>
              }
              { !logged_in &&
                <>
                  <NavItem>
                    <a href={ sign_in_route }>Sign In</a>
                  </NavItem>
                  <NavItem>
                    <a href={ sign_up_route }>Sign Up</a>
                  </NavItem>
                </>
              }
              </Nav>
            </Collapse>
        </Navbar>
      </div>
    </React.Fragment>
  )
}

export default Header
