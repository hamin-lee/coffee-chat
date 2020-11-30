import React from 'react';
import Navbar from "./react-components/Navbar/Navbar";
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { checkSession } from "./actions/user";
import UserHomePage from './react-components/UserCard/UserHomePage';
import LoginPage from './react-components/Login/LoginPage';
import ExplorePage from './react-components/UserExplore/ExplorePage';
import AdminOrganizationHomePage from './react-components/AdminCard/AdminOrganizationHomePage';
import AdminUserHomePage from './react-components/AdminCard/AdminUserHomePage';
import UserExplorerPage from './react-components/UserExplore/UserExplorerPage';
import SplashPage from './react-components/LandingPage/SplashPage';

class App extends React.Component {
      constructor(props) {
            super(props);
            checkSession(this); // sees if a user is logged in.
      }
      
      // global state passed down includes the current logged in user.
      state = {
            currentUser: null
      }
      
      render() {
            const { currentUser } = this.state;
            return (
            <div id="app">
                  
                  <Navbar id="navbar"></Navbar>
                  <BrowserRouter>
                        <Switch>
                              <Route
                              exact path={["/", "/login", "/dashboard"] /* any of these URLs are accepted. */ }
                              render={ props => (
                                    <div className="app">
                                          { /* Different componenets rendered depending on if someone is logged in. */}
                                          {!currentUser ? <LoginPage {...props} app={this} /> : <ExplorePage {...props} app={this} />}
                                    </div>                   // ... spread operator - provides all of the props in the props object
                                    
                              )}
                              />
      
                              { /* Example of having a wildcard parameter in the url  */ } 
                              <Route exact path='/'
                                    render={() => <SplashPage/>} />
                              <Route exact path='/user'
                                    render={() => <UserHomePage />}/>
                              <Route exact path='/admin'
                                    render={() => <AdminOrganizationHomePage/>}/>
                              <Route exact path='/admin/user'
                                    render={() => <AdminUserHomePage/>}/>     
                              <Route exact path='/organization/:orgName'
                                    component={UserHomePage}/>
                              <Route exact path='/user/explorer'
                                    render={() => <UserExplorerPage/>}/>
      
                              { /* 404 if URL isn't expected. */}
                              <Route render={() => <div>404 Not found</div>} />
      
                        </Switch>
                  </BrowserRouter>
            </div>
        );
      }
}

export default App;
