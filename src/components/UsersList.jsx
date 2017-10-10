import React from 'react';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';

const UsersList = props => { 

  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  const results = props.users;
  let usersList;

  if(results.length) {
    usersList=results.map( user => 
      <ListItem
        primaryText={user.name}
        leftAvatar={<Avatar src={baseURL+"/api/avatars/"+ user.foto} />}
        key={user._id}
        /> );
  } else {

    usersList= <ListItem
        primaryText="users not assigned"
        leftAvatar={<Avatar src={baseURL+"/api/avatars/avatar.jpg"} />}
        />
  }

  return(
    <List className="left">
    {usersList}
    </List>
  );
}

export default UsersList;
