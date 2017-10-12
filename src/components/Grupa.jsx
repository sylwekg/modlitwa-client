import {getGroupData} from '../authorize';
import ErrorMessage from './ErrorMessage';
import ProgressIndicator from './ProgressIndicator';
import UsersList from './UsersList';
import React, {Component} from 'react';
import {Card, CardTitle, CardMedia} from 'material-ui/Card';

//icons
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {pinkA200} from 'material-ui/styles/colors';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Person from 'material-ui/svg-icons/social/person';
import ActionGrade from 'material-ui/svg-icons/action/grade';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export default class Grupa extends Component {
	static propTypes: {
	    groupId: PropTypes.object,
	    errorMessage: PropTypes.string,
	};

    constructor(props) {
	    super(props)
	    this.state = { 
	    	errorMessage: '',
	    	loading: false,
	    	name : "group doesn't exist",
	    	imageUrl: '',
	    	opiekun : { 
	    		name: 'opiekun is not assigned',
	    		tel: 'N/A',
	    		foto: 'avatar.jpg',
	    		},
	    	users : [],
	    }
  	};

  	componentWillMount() {
  		//load group data + users assigned to group
  		let token = localStorage.getItem('id_token') || '';
  		if(this.props.groupId) {
  			this.setState({ loading: true });
  			getGroupData(this.props.groupId, token)
	  		.then( data => {
				this.setState({ loading: false });
	  			//console.log(data);
	  			this.setState({
	  				name: data.group.name,
	  				imageUrl: baseURL+"/api/avatars/"+ data.group.foto,
	  				opiekun: data.group.opiekun,
	  				users: data.users,
	  			})
	  		})
			.catch( err => {
				this.setState({ 
					loading: false,
				 	errorMessage: err.message
				 });
				//console.log('Grupa >>>',err);
			});
  		}
  	}

	render() {
		const { name, imageUrl, opiekun, users, errorMessage, loading} = this.state
		return (
			<div className="container">
				<ProgressIndicator showProg={loading} />
				<ErrorMessage msg={errorMessage} />

				{/* --------------grup data------------------*/}
		    	<Card className="center">
		    	
				    <CardMedia overlay={<CardTitle title={name}  />} >
					    <div className="picBox">
					    	<img className="img-circle" src={imageUrl} 
					    	alt="not found" onError={(e)=>{e.target.src='./images/avatar.jpg'}} />
					    </div>
				    </CardMedia>
		    	
		    	{/* Items for opiekun */}
				    <List className="left">
				      <ListItem
				        primaryText={opiekun.name}
				        secondaryText={opiekun.tel}
				        rightIcon={<ActionGrade color={pinkA200} />}
				        leftAvatar={
				        	<Avatar 
				        	src={baseURL+"/api/avatars/"+ opiekun.foto} 
				        	icon={<Person />} 
				        	/> }
				      />
				    </List>

		    	{/* Items for each group user */}
				    <Divider inset={true} />
				    <UsersList users={users} />

				</Card>

		    </div>	
		);
	}
}

Grupa.defaultProps = {
  groupId: null
};