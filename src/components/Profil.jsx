import React, {Component} from 'react';
import {Card, CardTitle, CardMedia} from 'material-ui/Card';
import Email from 'material-ui/svg-icons/maps/local-post-office';
import Phone from 'material-ui/svg-icons/maps/local-phone';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import People from 'material-ui/svg-icons/social/people';
import Favorite from 'material-ui/svg-icons/action/favorite';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Edit from 'material-ui/svg-icons/editor/mode-edit';


export default class Profil extends Component {
	
	onEdit() {
		alert('edycja');
	}

	render() {
		return (
			<div className="container">
		    	<Card className="center">
				    <CardMedia overlay={<CardTitle title="Imie Nazwisko"  />} >
					    <div className="picBox">
					    	<img className="img-circle" src="images/george-clooney.jpg" alt="foto" />
					    </div>
				    </CardMedia>

		    		<FloatingActionButton className="editFloatingButton" onClick={this.onEdit.bind(this)}>
	  					<Edit />
					</FloatingActionButton>

				    <List className="left">
				    	<ListItem
				    	  disabled={true}
      					  leftAvatar={ <Avatar icon={<Email />} /> }
    					> 
    					adres@email.com
    					</ListItem>

				    	<ListItem
				    	  disabled={true}
      					  leftAvatar={ <Avatar icon={<Phone />} /> }
    					> 
    					123456789
    					</ListItem>

 				    	<ListItem
				    	  disabled={true}
      					  leftAvatar={ <Avatar  icon={<Favorite />}   /> } 
    					> 
    					nazwa tajemnicy
    					</ListItem> 

 				    	<ListItem
				    	  disabled={true}
      					  leftAvatar={ <Avatar icon={<People />} /> }
    					> 
    					nazwa grupy
    					</ListItem>  
				    </List>
		    	</Card>
		    </div>	
		);
	}
}