import React, { Component} from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import ApartmentIndex from './pages/ApartmentIndex'
import ApartmentShow from './pages/ApartmentShow'
import MyApartmentIndex from './pages/MyApartmentIndex'
import ApartmentNew from './pages/ApartmentNew'
import ApartmentEdit from './pages/ApartmentEdit'
import NotFound from './pages/NotFound'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
// import mockApartments from './mockApartments.js'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      apartments: []
    }
  }

  componentDidMount(){
    this.indexApartment()
  }

  indexApartment = () => {
    fetch("/apartments")
    .then(response => {
      return response.json()
    })
    .then(payload => {
      this.setState({ apartments: payload })
    })
    .catch(errors => {
      console.log("index errors:", errors)
    })
  }

  createNewApartment = (newApartment) => {
    fetch("/apartments", {
      body: JSON.stringify(newApartment),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then(response => {
      if(response.status === 422){
        alert("There is something wrong with your submission.")
      }
      return response.json()
    })
    .then(() => {
      this.indexApartment()
    })
    .catch(errors => {
      console.log("create errors:", errors)
    })
  }

  editApartment = (apartment, id) => {
    fetch(`/apartments/${id}`, {
      body: JSON.stringify(apartment),
      headers: {
        "Content-Type": "application/json"
      },
      method: "PATCH"
    })
    .then(response => {
      console.log(response)
      if(response.status === 422){
        alert("There is something wrong with your submission.")
      }
      return response.json()
    })
    .then(() => {
      this.indexApartment()
    })
    .catch(errors => {
      console.log("edit errors:", errors)
    })
  }

  deleteApartment = (id) => {
    alert("Delete this listing?")
    fetch(`/apartments/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
    .then(response => {
      if(response.status === 422){
        alert("There is something wrong with your submission.")
      }
      return response.json()
    })
    .then(() => {
      this.indexApartment()
    })
    .catch(errors => {
      console.log("delete errors:", errors)
    })
  }

  render() {
    const {
      logged_in,
      current_user,
      sign_in_route,
      sign_out_route,
      sign_up_route
    } = this.props
    const { apartments } = this.state
    console.log("logged_in:", logged_in)
    console.log("current user:", current_user)
    console.log("apartments:", apartments)
    return (
      <Router>
        <Header
          logged_in={ logged_in }
          sign_in_route={ sign_in_route }
          sign_out_route={ sign_out_route }
        />
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route
            path="/apartment-index"
            render={ (props) => <ApartmentIndex apartments={ apartments } /> }
          />
          <Route
            path="/apartment/:id"
            render={ (props) => {
              let id = +props.match.params.id
              let apartment = apartments.find(a => a.id === id)
              return <ApartmentShow apartment={ apartment } />
            }}
          />
          { logged_in &&
            <Route
              path="/myapartments"
              render={ (props) => {
                let myApartments = apartments.filter(apartment => apartment.user_id === current_user.id)
                return (
                  <MyApartmentIndex
                    myApartments={ myApartments }
                    deleteApartment={ this.deleteApartment }
                  />
                )
              }}
            />
          }
          { logged_in &&
            <Route
              path="/new"
              render={ (props) =>
                <ApartmentNew
                  createNewApartment={ this.createNewApartment }
                  current_user={ current_user }
                />
              }
            />
          }
          { logged_in &&
            <Route
              path="/apartment-edit/:id"
              render={ (props) => {
                let apartment = apartments.find(apartment => apartment.id === +props.match.params.id)
                return (
                  <ApartmentEdit
                    editApartment={ this.editApartment }
                    current_user={ current_user }
                    apartment={ apartment }
                  />
                )
              }}
            />
          }
          <Route component={ NotFound } />
        </Switch>
      </Router>
    )
  }
}

export default App
