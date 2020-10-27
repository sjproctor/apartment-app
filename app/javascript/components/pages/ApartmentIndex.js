import React, { Component } from 'react'
import { Button, Card, CardTitle, Col, Row } from 'reactstrap'
import { NavLink } from 'react-router-dom'

class ApartmentIndex extends Component{
  render(){
    return(
      <React.Fragment>
      <h3>All the Apartments</h3>
      <Row id="cards">
          { this.props.apartments.map((apartment, index) => {
            return (
              <Col sm="4" key={ index }>
                <Card body>
                  <CardTitle>
                    <h5>{ apartment.street }</h5>
                    <h5>{ apartment.city }</h5>
                    <h5>{ apartment.state }</h5>
                    <p>
                      <NavLink to={`/apartmentshow/${apartment.id}`}>
                        <Button color="secondary">
                          More Info
                        </Button>
                      </NavLink>
                    </p>
                  </CardTitle>
                </Card>
              </Col>
            )
          })}
      </Row>
      </React.Fragment>
    )
  }
}
export default ApartmentIndex
