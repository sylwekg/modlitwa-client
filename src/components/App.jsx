import React, { Component } from 'react';
import {
	BrowserRouter,
	Route,
	Switch,
	withRouter
} from 'react-router-dom';
//import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import getMuiTheme from 'material-ui/styles/getMuiTheme';


//app components
import Header from './Header';
import About from './About';
import Home from './Home';
import NotFound from './NotFound';

import Grupa from './Grupa';
import Modlitwa from './Modlitwa';
import Profil from './Profil';
import Stats from './Stats';
import Wiadomosci from './Wiadomosci';
import Login from './Login';

const HeaderWithRouter = withRouter(Header);


// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     fakeAuth.isAuthenticated ? (
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )

export default class App extends Component {

	constructor() {
	    super();
	    this.state = {
	    	access_token :"",
	      	user:{},
	      	loading: false,
	      	isAuthorized: false,
	    	};
  	};

  	loginUser = (user, token) => {
  		  this.setState({
          	access_token: token,
          	loading: false,
          	isAuthorized: true,
          	user: user,
        });
  	};

  	onLoading = (loading) => {
  		//this.state.loading=loading;
  		this.setState({ loading: loading });
  	};

  	onLogout = () => {
  		//this.state.history.push('/');
  		this.setState({
	    	access_token :"",
	      	user:{},
	      	loading: false,
	      	isAuthorized: false,
  		});
  	}

//muiTheme={getMuiTheme(darkBaseTheme)}
	render() {
		const { isAuthorized } = this.state

		return (
		<MuiThemeProvider >
			<BrowserRouter>	 
			  	<div>
				  	<Route path="/" render={ () => <HeaderWithRouter 
				  		isAuthorized={this.state.isAuthorized} 
				  		onLogout={this.onLogout} /> 
				  	}  />
				  	
				  	<Switch>
					  	<Route exact path="/" render={ () => <Home  /> }/>

					  	<Route path="/grupa" render= { () => (isAuthorized) ? ( <Grupa /> ) : 
					  		(<Login onLogin={this.loginUser} onLoading={this.onLoading}/>) } />
					  	<Route path="/modlitwa" render= { () => isAuthorized ? <Modlitwa /> : 
					  		<Login onLogin={this.loginUser} onLoading={this.onLoading}/>}  />
					  	<Route path="/stats" render= { () => isAuthorized ? <Stats /> : 
					  		<Login onLogin={this.loginUser} onLoading={this.onLoading}/>}  />
					  	<Route path="/profil" render= { () => isAuthorized ? <Profil /> : 
					  		<Login onLogin={this.loginUser} onLoading={this.onLoading}/>}  />
					  	<Route path="/wiadomosci" render= { () => isAuthorized ? <Wiadomosci /> : 
					  		<Login onLogin={this.loginUser} onLoading={this.onLoading}/>}  />
					  	<Route path="/login" render={ () => <Login  onLogin={this.loginUser} onLoading={this.onLoading}/> }  />
					  	<Route path="/about" render={ () => <About title="about ..."/> } />  

					  	<Route component={NotFound} />
					</Switch>
			  	</div>
			</BrowserRouter>
		</MuiThemeProvider>
		);
	}
}