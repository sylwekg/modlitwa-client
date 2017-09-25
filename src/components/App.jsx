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
		return (
		<MuiThemeProvider >
			<BrowserRouter>	 
			  	<div>
				  	<Route path="/" render={ () => <HeaderWithRouter isAuthorized={this.state.isAuthorized} onLogout={this.onLogout} /> } />
				  	
				  	<Switch>
					  	<Route exact path="/" render={ () => <Home  /> }/>

					  	<Route path="/grupa" component={Grupa} />
					  	<Route path="/modlitwa" component={Modlitwa} />
					  	<Route path="/stats" component={Stats} />
					  	<Route path="/profil" component={Profil} />
					  	<Route path="/wiadomosci" component={Wiadomosci} />
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