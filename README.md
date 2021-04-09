# Apartment App

**Day 1**
### Rails App
- $ rails new apartment_app -d postgresql -T
- $ cd apartment_app
- $ rails db:create

### RSpec Install
- $ bundle add rspec-rails
- $ rails generate rspec:install

### Devise
- $ bundle add devise
- $ rails generate devise:install
- $ rails generate devise User
- $ rails db:migrate
- Set action mailer in *config/environments/development.rb*
- Update a line in the file *config/initializers/devise.rb* from this: `config.sign_out_via = :delete` and replace it with this: `config.sign_out_via = :get`

### Apartment Resource
- Apartments have: a street designation, a city, state, a manager's name, manager's contact email, monthly rental price, bedrooms, bathrooms, and whether they allow pets
- $ rails g resource Apartment street:string city:string state:string manager:string email:string price:string bedrooms:integer bathrooms:integer pets:string user_id:integer
- $ rails db:migrate
- defined relationships between model classes

### React in Rails
- $ bundle add react-rails
- $ rails webpacker:install
- $ rails webpacker:install:react
- $ rails generate react:install
- $ rails g react:component App
- $ rails g controller Home
- Add a file in *app/views/home* called *index.html.erb*
- *index.html.erb*:
```
<%= react_component("App", {
    logged_in: user_signed_in?,
    sign_in_route: new_user_session_path,
    sign_out_route: destroy_user_session_path
}) %>
```
- Add `root to: 'home#index'` to *config/routes.rb*
- Add constraints to routes: `get '*path', to: 'home#index', constraints: ->(request){ request.format.html? }`

### File Structure
- pages, components, assets
- pages: Home, ApartmentIndex, ApartmentShow, ApartmentNew, ApartmentEdit, NotFound
- components: Header, Footer

### Add Sign In/Out Buttons
*app/javascript/components/App.js*
```javascript
import React, { Component } from "react"

class App extends Component {
  render () {
    const {
      logged_in,
      sign_in_route,
      sign_out_route
    } = this.props
    return (
      <React.Fragment>
        <h1>Hello World!!!</h1>
        { logged_in &&
          <div>
            <a href={ sign_out_route }>Sign Out</a>
          </div>
        }

        { !logged_in &&
          <div>
            <a href={ sign_in_route }>Sign In</a>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default App
```

### Extra Installs
- $ bundle add bootstrap (Restart the rails server if running!!)
- Modify the application.css to be a "sass" file: $ mv app/assets/stylesheets/application.css app/assets/stylesheets/application.scss
- Add an import to the "sass" file @import 'bootstrap'
- $ yarn add reactstrap
- $ yarn add react-router-dom

### Imports
- Import all files
- Import all components
- Route to all components
- Import BrowserRouter

### Mock Data
- Add a file to *app/javascript/components* to hold frontend mock data
- Set mock data to state

**Day 2**
### Update Devise Routes
- *index.html.erb*
```
<%= react_component("App", {
  logged_in: user_signed_in?,
  sign_in_route: new_user_session_path,
  sign_up_route: new_user_registration_path,
  sign_out_route: destroy_user_session_path,
  current_user: current_user
}) %>
```
- Add to destructuring in *App.js*


### Add Page
- MyApartments

### Color Palette
- `#eeebdd`
- `#ce1212`
- `#810000`
- `#1b1717`

### Adding Font Awesome Icons
- yarn add @fortawesome/fontawesome-svg-core
- yarn add @fortawesome/free-solid-svg-icons
- yarn add @fortawesome/react-fontawesome
- import { faHome, faCity } from "@fortawesome/free-solid-svg-icons";
- import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
- <FontAwesomeIcon icon={ faHome } />
- <FontAwesomeIcon icon={ faCity } />

### Favicon
- Add image to *app/assets/images*
- Add `<%= favicon_link_tag asset_path('house.png') %>` to the head tag in *app/views/layout/application.html.erb*

### Custom Font
- Add `@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');` to the stylesheet

```css
* {
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans KR', sans-serif;
}
```
