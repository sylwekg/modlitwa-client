import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardTitle, CardActions, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';;

export default class Login extends Component {
	static propTypes: {
	    login: React.PropTypes.func.isRequired,
	};

    constructor(props) {
	    super(props)
	    this.state = { 
	    	emailErrorText: '', 
	    	passwordErrorText: '',
	    	email: '',
	    	password: '', 
	    }
    }

  	onChangeEmail(event) {
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
  		this.setState({password:event.target.value})
 		if(this.state.passwordErrorText){
 			if (event.target.value.length > 3) {
		      this.setState({ passwordErrorText: '' })
		    } else {
		      this.setState({ passwordErrorText: 'Password too short' })
		    }
 		} 		
 	}

 	submit(event) {
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
	    	alert('wysylam dane...');
	    	this.props.login(this.state.email, this.state.password);
	    }
 	}

	render() {
		return (
		  <div className="container">
		    <Card className="center">
		    	<CardTitle title="Login"  />
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


