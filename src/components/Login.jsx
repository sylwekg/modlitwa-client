import {login} from '../authorize';

import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import {Card, CardTitle, CardActions, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';;

export default class Login extends Component {
	static propTypes: {
	    onLogin: React.PropTypes.func.isRequired,
	    onLoading: React.PropTypes.func.isRequired,
	    history: PropTypes.object.isRequired,
	    isAuthorized: PropTypes.bool.isRequired,
	};

    constructor(props) {
	    super(props)
	    this.state = { 
	    	emailErrorText: '', 
	    	passwordErrorText: '',
	    	email: '',
	    	password: '', 
	    	redirectToReferrer: false,
	    	redirectPath: this.props.history.location.state ? this.props.history.location.state.from.pathname : '/',
	    	errorMessage: '',
	    }
    }

    componentWillMount() {
    	this.props.onLoading(true);
    }

    componentWillUnmount() {
    	this.props.onLoading(false);
    }

  	onChangeEmail(event) {
  		this.setState({errorMessage:''});
  		this.setState({email:event.target.value})
  		if(this.state.emailErrorText) {
  			if (event.target.value.match(/@/)) {
		      this.setState({ emailErrorText: '' });
		    } else {
		      this.setState({ emailErrorText: 'Invalid email address' })
		    }
  		}
 	}

  	onChangePassword(event) {
  		this.setState({errorMessage:''});
  		this.setState({password:event.target.value})
 		if(this.state.passwordErrorText){
 			if (event.target.value.length > 3) {
		      this.setState({ passwordErrorText: '' })
		    } else {
		      this.setState({ passwordErrorText: 'Password too short' })
		    }
 		} 		
 	}

 	submit(event){
 		//fields verification
		if (this.state.email.match(/@/)) {
	      this.setState({ emailErrorText: '' });
	    } else {
	      this.setState({ emailErrorText: 'Invalid email address' })
	    }

	    if (this.state.password.length > 3) {
	      this.setState({ passwordErrorText: '' })
	    } else {
	      this.setState({ passwordErrorText: 'Password too short' })
	    }

	    if(this.state.password.length > 3 && this.state.email.match(/@/)){
	    	// fetch data - display progress circle
	    	login(this.state.email,this.state.password)
	    	.then( user => {
	    		  localStorage.setItem('id_token', user.access_token);
	    		  localStorage.setItem('userId', user.user._id);
			      this.props.onLogin(user.user, user.access_token);
				  this.setState({ redirectToReferrer: true });
	    	})
	    	.catch( err => {
	    		console.log('component:',err);
	    		this.setState({errorMessage:err.message});
	    	});
	    }
 	}

	render() {
	    const { redirectToReferrer, errorMessage, redirectPath } = this.state
	    console.log('login render');

	    if (redirectToReferrer || this.props.isAuthorized) { //
	      return (
	        <Redirect to={redirectPath}/>
	      )
	    }

		return (
		  <div className="container">
		    <Card className="center">
		    	<CardTitle title="Login"  />
		    	{errorMessage.length>0 &&
		    	<div className="errorMessage">
		    		<p> {errorMessage} </p>
		    	</div>
		    	}
			    <TextField
			      id="email"
			      name="email"
			      errorText={this.state.emailErrorText}
			      hintText="E-mail"
			      floatingLabelText="E-mail"
			      onChange={this.onChangeEmail.bind(this)}
			    /><br />
			    <TextField
			      id="password"
			      name="password"
			      errorText={this.state.passwordErrorText}
			      hintText="Password"
			      floatingLabelText="Password"
			      type="password"
			      onChange={this.onChangePassword.bind(this)}
			    /><br />
			    <CardActions>
			      <RaisedButton 
			      	label="Submit" 
			      	onClick={this.submit.bind(this)}
			      	primary={true}  
			      	fullWidth={true} 
			      	/>
    			</CardActions>
				<br />
    			<a href="/">	<img src="images/fbLoginButton.png" className="fb-button" alt="fb-button" /></a>
    			<CardText> Not registered yet, Register now</CardText>
    			<CardActions>
			      <RaisedButton 
			      	href="/" 
			      	label="Register" 
			      	primary={true}  
			      	fullWidth={true} 
			      	/>
    			</CardActions>
    			<br />
			</Card>
		  </div>
		);
	}
}


