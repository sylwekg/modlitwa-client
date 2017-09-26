import {getProfile} from '../authorize';

import React, { Component } from 'react';
import {
	BrowserRouter,
	Route,
	Switch,
	withRouter,
//	Redirect
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
//import Stats from './Stats';
import Wiadomosci from './Wiadomosci';
import Login from './Login';

import PrivateRoute from './Privateroute';


const HeaderWithRouter = withRouter(Header);

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

  	componentWillMount() {
  		let token = localStorage.getItem('id_token') || '';
  		let userId = localStorage.getItem('userId') || '';
  		if(token && userId) {
  			getProfile(userId, token)
  				.then(user => {
  					this.loginUser(user.user, user.access_token);
  				})
  				.catch(err => {
  					console.log(err);
  					this.onLogout();
  				});
  		} 
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
  		this.setState({ loading: loading });
  	};

  	onLogout = () => {
  		this.setState({
	    	access_token :"",
	      	user:{},
	      	loading: false,
	      	isAuthorized: false,
  		});
  		localStorage.removeItem('id_token');
  		localStorage.removeItem('userId');
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

					  	<PrivateRoute path="/grupa" isAuthorized={isAuthorized} component={ () => <Grupa /> }/>
{/*					  	<Route path="/grupa" render= { () => (isAuthorized) ? ( <Grupa /> ) : 
					  		(<Login onLogin={this.loginUser} onLoading={this.onLoading}/>) } />       */}
					  	<PrivateRoute path="/modlitwa" isAuthorized={isAuthorized} component={ () => <Modlitwa /> }/>
					  	<PrivateRoute path="/profil" isAuthorized={isAuthorized} component={ () => <Profil /> }/>
					  	<PrivateRoute path="/wiadomosci" isAuthorized={isAuthorized} component={ () => <Wiadomosci /> }/>

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