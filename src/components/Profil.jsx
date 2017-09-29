

import React, {Component} from 'react';
import {Card, CardTitle, CardMedia} from 'material-ui/Card';
//icons
import Email from 'material-ui/svg-icons/maps/local-post-office';
import Phone from 'material-ui/svg-icons/maps/local-phone';
import Crop from 'material-ui/svg-icons/image/crop';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import People from 'material-ui/svg-icons/social/people';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Person from 'material-ui/svg-icons/social/person';
//components
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const styles = {
  button: {
    margin: 6,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

export default class Profil extends Component {
	static propTypes: {
	    user: PropTypes.object.isRequired,
	    onLoading: React.PropTypes.func.isRequired,
	};

    constructor(props) {
	    super(props)
	    this.state = { 
	    	editWindowOpen: false,
	    	emailErrorText: '',
	    	errorMessage: '',
	    	file: this.props.user.foto,
	    	imagePreviewUrl: baseURL+"/api/avatars/"+this.props.user.foto
	    }
  	};

  	componentWillMount() {

  	};


	handleOpen = () => {
  		this.setState({editWindowOpen: true});	
	};

	handleClose = () => {
	   this.setState({editWindowOpen: false});
	};

	handleSave = () => {
	   this.setState({editWindowOpen: false});
	};

  	onChangeEmail = (event) => {
  		this.setState({errorMessage:''});
  		this.setState({email:event.target.value})
  		if(this.state.emailErrorText) {
  			if (event.target.value.match(/@/)) {
		      this.setState({ emailErrorText: '' });
		    } else {
		      this.setState({ emailErrorText: 'Invalid email address' })
		    }
  		}
 	};

 	onImageChange = (event) => {
 		event.preventDefault();
 		let reader = new FileReader();
    	let file = event.target.files[0];

	    reader.onloadend = () => {
	      	this.setState({
		        file: file,
		        imagePreviewUrl: reader.result
	    	});
 		}
    	reader.readAsDataURL(file)
 	}


	render() {
		const { user } = this.props
	    const actions = [
	      <FlatButton
	        label="Cancel"
	        primary={true}
	        keyboardFocused={true}
	        onClick={this.handleClose}
	      />,
	      <FlatButton
	        label="Save"
	        primary={true}
	        onClick={this.handleSave}
	      />,
	    ];

		return (
			<div className="container">
		    	<Card className="center">
				    <CardMedia overlay={<CardTitle title={user.name}  />} >
					    <div className="picBox">
					    	<img className="img-circle" src={`${baseURL}/api/avatars/${user.foto}`} 
					    	alt="not found" onError={(e)=>{e.target.src='./images/avatar.jpg'}} />
					    </div>
				    </CardMedia>

		    		<FloatingActionButton className="editFloatingButton" onClick={this.handleOpen}>
	  					<Edit />
					</FloatingActionButton>

				{/* ----------------------editable list----------------------- */}
			        <Dialog
			          contentClassName="profileEditWindow"			       
			          title="Edit profile"
			          actions={actions}
			          modal={true}
			          open={this.state.editWindowOpen}
			          onRequestClose={this.handleClose}			
			        >
			        	<div className="center">
							<img id="upload-demo" src={this.state.imagePreviewUrl} 
							  	width="150" height="150" alt="not found"/>	 
						</div>
						<input type="hidden" name="foto" id="imageData64"/>
						
						<div className="center">
						    <RaisedButton
						      label="New Image"
						      labelPosition="before"
						      style={styles.button}
						      containerElement="label"
						      icon={<FileUpload />}
						    >
						      <input type="file" onChange={this.onImageChange} style={styles.exampleImageInput} />
						    </RaisedButton>
						    <RaisedButton
						      label="Crop"
						      labelPosition="before"
						      style={styles.button}
						      containerElement="label"
						      icon={<Crop />}
						    >
						    </RaisedButton>
						</div>

						<List className="left">
							<ListItem
					    	  disabled={true}
	      					  leftAvatar={ <Avatar icon={<Person />} /> }
	      					  primaryText={							    
	      					  	<TextField 
	      					  	  className="profileTextField"
							      id="name"
							      name="name"
							      //errorText={this.state.emailErrorText}
							      defaultValue={user.name}
							      floatingLabelText="Name"
							      //onChange={this.onChangeEmail}
							    /> }
	    					> 
	    					</ListItem>
					    	<ListItem
					    	  disabled={true}
	      					  leftAvatar={ <Avatar icon={<Email />} /> }
	      					  primaryText={							    
	      					  	<TextField 
	      					  	  className="profileTextField"
							      id="email"
							      name="email"
							      errorText={this.state.emailErrorText}
							      defaultValue={user.email}
							      floatingLabelText="E-mail"
							      onChange={this.onChangeEmail}
							    /> }
	    					> 
	    					</ListItem>
					    	<ListItem
					    	  disabled={true}
	      					  leftAvatar={ <Avatar icon={<Phone />} /> }
	      					  primaryText={							    
	      					  	<TextField 
	      					  	  className="profileTextField"
							      id="tel"
							      name="tel"
							      //errorText={this.state.emailErrorText}
							      defaultValue={user.tel}
							      floatingLabelText="Tel"
							      //onChange={this.onChangeEmail}
							    /> }
	    					> 
	    					</ListItem>

					    </List>
			        </Dialog>			

			        {/* --------------static list read-only------------------*/}
				    <List className="left">
				    	<ListItem
				    	  disabled={true}
      					  leftAvatar={ <Avatar icon={<Email />} /> }
    					> 
    					{user.email}
    					</ListItem>

				    	<ListItem
				    	  disabled={true}
      					  leftAvatar={ <Avatar icon={<Phone />} /> }
    					> 
    					{user.tel}
    					</ListItem>

 				    	<ListItem
				    	  disabled={true}
      					  leftAvatar={ <Avatar  icon={<Favorite />}   /> } 
    					> 
    					{user.tajemnica.name}
    					</ListItem> 

 				    	<ListItem
				    	  disabled={true}
      					  leftAvatar={ <Avatar icon={<People />} /> }
    					> 
    					{user.grupa.name}
    					</ListItem>  
				    </List>
		    	</Card>
		    </div>	
		);
	}
}