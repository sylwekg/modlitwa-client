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
const LoginWR = withRouter(Login);

export default class App extends Component {
	constructor() {
	    super();
	    this.state = {
	    	access_token :"",
	      	user:{},
	      	loading: false,
	      	isAuthorized: false,
          errorMessage: '',
	    	};
  	};

  	componentWillMount() {
  		let token = localStorage.getItem('id_token') || '';
  		let userId = localStorage.getItem('userId') || '';
  		if(token && userId) {
  			this.setState({loading:true});
  			getProfile(userId, token)
  				.then(user => {
  					this.loginUser(user.user, token);
  					console.log('user data received:',user);
  					//this.props.history.push('/');
  				})
  				.catch(err => {
  					console.log(err);
  					this.onLogout(err.message);
  				});
  		} 
  		console.log('componentWillMount');
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

  	onLogout = (err) => {
  		this.setState({
	    	access_token :"",
	      	user:{},
	      	loading: false,
	      	isAuthorized: false,
          errorMessage: err,
  		});
  		localStorage.removeItem('id_token');
  		localStorage.removeItem('userId');
  	};

  	onUserUpdate = () => {
  		let token = localStorage.getItem('id_token') || '';
  		let userId = localStorage.getItem('userId') || '';
  		if(token && userId) {
  			this.setState({loading:true});
  			getProfile(userId, token)
  				.then(user => {
  					this.loginUser(user.user, token);
  					console.log('user data received:',user);
  					//this.props.history.push('/');
  				})
  				.catch(err => {
  					console.log(err);
  					this.onLogout(err.message);
  				});
  		}
  	};
//muiTheme={getMuiTheme(darkBaseTheme)}
	render() {
		const { isAuthorized, loading, user, errorMessage } = this.state

		return (
		<MuiThemeProvider >
			<BrowserRouter>	 
			  	<div>
				  	<Route path="/" render={ () => <HeaderWithRouter 
				  		isAuthorized={isAuthorized} 
				  		loading={loading}
				  		onLogout={this.onLogout} /> 
				  	}  />
				  	
				  	<Switch>
					  	<Route exact path="/" render={ () => <Home  /> }/>

					  	<PrivateRoute path="/grupa" isAuthorized={isAuthorized} component={ () => 
                <Grupa groupId={ user.grupa ? user.grupa._id : null} errorMessage={errorMessage} /> 
              }/>
{/*					  	<Route path="/grupa" render= { () => (isAuthorized) ? ( <Grupa /> ) : 
					  		(<Login onLogin={this.loginUser} onLoading={this.onLoading}/>) } />       */}
					  	<PrivateRoute path="/modlitwa" isAuthorized={isAuthorized} component={ () => <Modlitwa /> }/>

					  	<PrivateRoute path="/profil" isAuthorized={isAuthorized} component={ () =>
					  		<Profil user={user} onLoading={this.onLoading} onUserUpdate={this.onUserUpdate} />
					  	}/>
					  				

					  	<PrivateRoute path="/wiadomosci" isAuthorized={isAuthorized} component={ () => <Wiadomosci /> }/>

					  	<Route path="/login" render={ () => 
                <LoginWR isAuthorized={isAuthorized} onLogin={this.loginUser}  
                onLoading={this.onLoading} errorMessage={errorMessage}  />
              } />

					  	<Route path="/about" render={ () => <About title="about ..."/> } />  

					  	<Route component={NotFound} />
					</Switch>
			  	</div>
			</BrowserRouter>
		</MuiThemeProvider>
		);
	}
}