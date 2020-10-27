// Apartments have: a street designation, a city, state, a manager's name, manager's contact email, monthly rental price, bedrooms, bathrooms, and whether they allow pets
import React, { Component } from 'react'
import { Button, Card, CardTitle, Col, Row } from 'reactstrap'
import { NavLink } from 'react-router-dom'

class ApartmentShow extends Component{
  render(){
    let { apartment } = this.props
    return(
      <React.Fragment>
        <h3>One Apartment</h3>
        <Row id="cards">
            <Col md="6">
              <Card body>
                <CardTitle>
                  <h5>Street Address:</h5>
                  <p>
                    { apartment.street }
                    <br />
                    { apartment.city }, { apartment.state }
                  </p>
                  <p>Manager name: { apartment.manager }</p>
                  <p>Manager email: { apartment.email }</p>
                  <p>Monthly rent: ${ apartment.price }</p>
                  <p>Bedrooms: { apartment.bedrooms }</p>
                  <p>Bathrooms: { apartment.bathrooms }</p>
                  <p>Pets Allowed: { apartment.pets }</p>
                  <NavLink
                    to="/apartmentindex"
                  >
                    <Button color="secondary">
                      Back to All Apartments
                    </Button>
                  </NavLink>
                </CardTitle>
              </Card>
            </Col>
        </Row>
      </React.Fragment>
    )
  }
}
export default ApartmentShow
