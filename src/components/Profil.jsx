import {getEditProfileData} from '../authorize';

import React, {Component} from 'react';
import {Card, CardTitle, CardMedia} from 'material-ui/Card';
//icons
import Email from 'material-ui/svg-icons/maps/local-post-office';
import Phone from 'material-ui/svg-icons/maps/local-phone';
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
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const itemsTajemnica = [];
const itemsGrupa = [];

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
	    	tajemnica: null,
	    	grupa: '',
			//items : [],
	    }
  	};

  	componentWillMount() {
		getEditProfileData(localStorage.getItem('id_token'))
	    	.then( data => {
				for (let i = 0; i < data.tajemnice.length; i++ ) 
					itemsTajemnica.push(<MenuItem value={i} key={data.tajemnice[i]._id} primaryText={data.tajemnice[i].name} />);
				
				for (let i = 0; i < data.grupy.length; i++ ) 
					itemsGrupa.push(<MenuItem value={data.grupy[i]._id} key={i} primaryText={data.grupy[i].name} />);


			    //this.props.onLoading(false);
	    	})
	    	.catch( err => {
	    		console.log('component:',err);
	    		this.setState({errorMessage:err.message});
	    		this.props.onLoading(false);
	    	});

  	};


	handleOpen = () => {
  		//this.props.onLoading(true);
  		this.setState({tajemnica: this.props.user.tajemnica.number});	
  		this.setState({grupa: this.props.user.grupa._id});	
  		this.setState({editWindowOpen: true});	

	};

	handleClose = () => {
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


	handleTajemnica = (event, index, value) => {
	    this.setState({tajemnica:value});
	};

	handleGrupa = (event, index, value) => {
	    this.setState({grupa:value});
	};


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
	        onClick={this.handleClose}
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

	 				    	<ListItem
					    	  disabled={true}
	      					  leftAvatar={ <Avatar  icon={<Favorite />}   /> } 
	      					  primaryText={
	      					    <SelectField
	      					    	style={{marginTop:'-10px'}}
							        value={this.state.tajemnica}
							        onChange={this.handleTajemnica}
							        maxHeight={200}
							      >
							        {itemsTajemnica}
							    </SelectField>	
	      					  }
	    					> 
	    					</ListItem> 

	 				    	<ListItem
					    	  disabled={true}
	      					  leftAvatar={ <Avatar icon={<People />} /> }
	      					  primaryText={
	      					    <SelectField
	      					    	style={{marginTop:'-10px'}}
							        value={this.state.grupa}
							        onChange={this.handleGrupa}
							        maxHeight={200}
							      >
							        {itemsGrupa}
							    </SelectField>	
	      					  }	      					  
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