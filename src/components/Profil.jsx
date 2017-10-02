import React, {Component} from 'react';
import {Card, CardTitle, CardMedia} from 'material-ui/Card';
import AvatarEditor from 'react-avatar-editor'
//icons
import Email from 'material-ui/svg-icons/maps/local-post-office';
import Phone from 'material-ui/svg-icons/maps/local-phone';
import Crop from 'material-ui/svg-icons/image/crop';
import RotateRight from 'material-ui/svg-icons/image/rotate-right';
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
import Slider from 'material-ui/Slider';


import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


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
  appBar: {
  	// flexWrap: 'wrap',
   //  width: '100%',
   //  paddingLeft: '10px',
   //  paddingRight: '10px',
    position: "fixed",
  }
};


// const dialogWindow = {
//   	width: '100%',
//   	maxWidth: 'none',
//   	height: '100%',
//   	maxHeight: 'none',
//   };

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
	    	editFotoMode: false,
	    	imageScale: 1.2,
	    	rotate: 0,
	    	file: this.props.user.foto,
	    	imagePreviewUrl: './images/avatar.jpg',
	    	imageUrl: baseURL+"/api/avatars/"+this.props.user.foto,
	    }
  	};

	handleOpen = () => {
  		this.setState({
  			editWindowOpen: true,
  			imagePreviewUrl:this.state.imageUrl
  		});	
	};

	handleClose = () => {
	   this.setState({editWindowOpen: false});
	};

	handleSave = () => {
	   this.setState({
	   	editWindowOpen: false,
	   	imageUrl: this.state.imagePreviewUrl
		});
	};

  	onEmailChange = (event) => {
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
 		console.log('on image change triggered');
 		event.preventDefault();
 		let reader = new FileReader();
    	let file = event.target.files[0];

	    reader.onloadend = () => {
	      	this.setState({
		        file: file,
		        imagePreviewUrl: reader.result,
		        editFotoMode: true
	    	});
 		}
    	reader.readAsDataURL(file)
 	};

 	onSliderChange = (event, value) => {
 		this.setState({imageScale:value})
 	};

 	onCrop = () => {
	    if (this.editor) {
	      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob, 
	      // drawn on another canvas, or added to the DOM. 
	      const img = this.editor.getImageScaledToCanvas().toDataURL()
	      //console.log(img);
	 	  this.setState({
	 	  	imagePreviewUrl: img,
	 	  	editFotoMode: false,
	 	  });

	      // If you want the image resized to the canvas size (also a HTMLCanvasElement) 
	      //const canvasScaled = this.editor.getImageScaledToCanvas()
	    }
 	};

 	setEditorRef = editor => {
    	if (editor) this.editor = editor
  	};

  	onRotateRight = (e) => {
	    e.preventDefault()

	    this.setState({
	      rotate: this.state.rotate + 90
	    })
  	};

  	onCancel = (e) => {
  		e.preventDefault()

  		this.setState({
  			imagePreviewUrl: baseURL+"/api/avatars/"+this.props.user.foto,
  			editFotoMode:false,
  		})
  	};

	render() {
		const { user } = this.props
	    // const actions = [
	    //   <FlatButton
	    //     label="Cancel"
	    //     primary={true}
	    //     keyboardFocused={true}
	    //     onClick={this.handleClose}
	    //   />,
	    //   <FlatButton
	    //     label="Save"
	    //     primary={true}
	    //     onClick={this.handleSave}
	    //   />,
	    // ];

		return (
			<div className="container">
		    	<Card className="center">
				    <CardMedia overlay={<CardTitle title={user.name}  />} >
					    <div className="picBox">
					    	<img className="img-circle" src={this.state.imageUrl} 
					    	alt="not found" onError={(e)=>{e.target.src='./images/avatar.jpg'}} />
					    </div>
				    </CardMedia>

		    		<FloatingActionButton className="editFloatingButton" onClick={this.handleOpen}>
	  					<Edit />
					</FloatingActionButton>

				{/* ----------------------edit profile window----------------------- */}

			        <Dialog
			          //contentClassName="profileEditWindow"			       
			          //title="Edit profile"
			          //actions={actions}
			          modal={true}
			          open={this.state.editWindowOpen}
			          onRequestClose={this.handleClose}	
			          autoDetectWindowHeight={true}
					  autoScrollBodyContent={true}
					  repositionOnUpdate={true}
					  //contentStyle={dialogWindow}
					  bodyClassName="global--modal-body"
					  contentClassName="global--modal-content"
				      paperClassName="global--modal-paper"							
			        >
			        	<AppBar
					    title={<span >Edit Profile</span>}
					    style={styles.appBar}
					    //onTitleTouchTap={handleTouchTap}
					    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
					    iconElementRight={<FlatButton label="Save" />}
					    onLeftIconButtonTouchTap={this.handleClose}
					    onRightIconButtonTouchTap={this.handleSave}
					 	/>

					 	<div className="containerModal">
				        	{!this.state.editFotoMode &&
							<div className="center">
		                       	<img id="upload-demo" src={this.state.imagePreviewUrl}
		                            width="250" height="250" alt="not found"/>
		                    </div> }

							{this.state.editFotoMode &&	
					        <div className="center">
							    <AvatarEditor
							    	ref={this.setEditorRef}
							        image={this.state.imagePreviewUrl}
							        width={250}
							        height={250}
							        border={50}
							        color={[255, 255, 255, 0.6]} // RGBA 
							        scale={this.state.imageScale}
							        rotate={this.state.rotate}
							    />
							    <Slider value={this.state.imageScale} 
							    	min={0.5} max={3} 
							    	onChange={this.onSliderChange} 
							    	style={{width: 300, margin: 'auto' }}
							    	sliderStyle={{'marginTop': '5px', 'marginBottom':'5px' }}
							    	step={3 / 100}
							    />
							</div> }

							{!this.state.editFotoMode &&
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
								</div>
							}					    
							    
						    {this.state.editFotoMode &&
							    <div className="center">
								    <RaisedButton
								      label="Crop"
								      onClick={this.onCrop}
								      labelPosition="before"
								      style={styles.button}
								      containerElement="label"
								      icon={<Crop />}
								    >
								    </RaisedButton>
								    <RaisedButton							      
								      onClick={this.onRotateRight}							      
								      style={styles.button}
								      containerElement="label"
								      icon={<RotateRight />}
								    >
								    </RaisedButton>
								    <RaisedButton	
								      label="Cancel"						      
								      onClick={this.onCancel}							     
								      style={styles.button}
								      containerElement="label"

								    >
								    </RaisedButton>							    
								</div>
							}


							<div className="center">
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
									      //onChange={this.onEmailChange}
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
									      onChange={this.onEmailChange}
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
									      //onChange={this.onEmailChange}
									    /> }
			    					> 
			    					</ListItem>

							    </List>
						    </div>
						</div>

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