import {login} from '../authorize';
import ErrorMessage from './ErrorMessage';
import ProgressIndicator from './ProgressIndicator';
import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import {Card, CardTitle, CardActions, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';



export default class Login extends Component {
	static propTypes: {
	    onLogin: React.PropTypes.func.isRequired,
	    //onLoading: React.PropTypes.func.isRequired,
	    history: PropTypes.object.isRequired,
	    isAuthorized: PropTypes.bool.isRequired,
	    errorMessage: PropTypes.string,
	};

    constructor(props) {
	    super(props)
	    this.state = { 
	    	loading: false,
	    	emailErrorText: '', 
	    	passwordErrorText: '',
	    	email: '',
	    	password: '', 
	    	redirectPath: this.props.history.location.state ? this.props.history.location.state.from.pathname : '/',
	    	errorMessage: this.props.errorMessage,//? this.props.errorMessage : '',
	    }
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
 		event.preventDefault();
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
	    	//this.props.onLoading(true);
	    	this.setState({ loading: true });
	    	login(this.state.email,this.state.password)
	    	.then( user => {
	    		this.setState({ loading: false });
	    		localStorage.setItem('id_token', user.access_token);
	    		localStorage.setItem('userId', user.user._id);
			    this.props.onLogin(user.user, user.access_token);
	    	})
	    	.catch( err => {
	    		console.log('component:',err);
	    		this.setState({
	    			errorMessage:err.message,
	    			loading: false,
	    		});
	    		//this.props.onLoading(false);
	    	});
	    }
 	}

	render() {
	    const { errorMessage, redirectPath, loading } = this.state
	    console.log('login render');

	    if ( this.props.isAuthorized) {
	      return (
	        <Redirect to={redirectPath}/>
	      )
	    }

		return (
		  <form className="container" onSubmit={this.submit.bind(this)}>
		  	<ProgressIndicator showProg={loading} />
		    <Card className="center">

		    	<CardTitle title="Login"  />

		    	<ErrorMessage msg={errorMessage} />

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
			      	type="submit"
			      	//onClick={this.submit.bind(this)}
			      	primary={true}  
			      	fullWidth={true} 
			      	/>
    			</CardActions>
				<br />
    			<a href="/">	<img src="images/fbLoginButton.png" className="fb-button" alt="fb-button" /></a>
    			<CardText> Not registered yet? Register now</CardText>
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
		  </form>
		);
	}
}


