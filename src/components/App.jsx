import React, { Component } from 'react';
import {
	BrowserRouter,
	Route,
	Switch
} from 'react-router-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


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


export default class App extends Component {

	constructor() {
	    super();
	    this.state = {
	      	user:null,
	      	loading: true
	      	//all user data fetched from DB
	    	};
  	} 


	render() {
		return (
		<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
			<BrowserRouter>	 
			  	<div>
				  	<Route path="/" component={Header} />
				  	
				  	<Switch>
					  	<Route exact path="/" render={ () => <Home  /> }/>
					  	<Route path="/grupa" component={Grupa} />
					  	<Route path="/modlitwa" component={Modlitwa} />
					  	<Route path="/stats" component={Stats} />
					  	<Route path="/profil" component={Profil} />
					  	<Route path="/wiadomosci" component={Wiadomosci} />
					  	<Route path="/login" render={ () => <Login  /> }  />

					  	<Route path="/about" render={ () => <About title="about ..."/> } />  
					  	<Route component={NotFound} />
					</Switch>
			  	</div>
			</BrowserRouter>
		</MuiThemeProvider>
		);
	}
}