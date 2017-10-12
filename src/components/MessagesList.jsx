import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {darkBlack, lightBlack} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import DateDisplay from './DateDisplay';

const MessagesList = props => { 

  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  const results = props.messages;
  let messagesList;

  if(results.length) {
    messagesList=results.map( msg => {
      return (
        <div key={msg._id}>
          <ListItem
            leftAvatar={<Avatar src={baseURL+"/api/avatars/"+ msg.from.foto}  />}
            primaryText={msg.from.name}
            secondaryText={
              <p>
           {/*     <span style={{color: darkBlack}}> {msg.from.name} </span> -- */}
                {msg.content}
              </p>
            }
            //secondaryTextLines={2}
            //rightAvatar={<DateDisplay date={msg.from.date}/>}
          />
          <Divider inset={true} />
        </div>
      );
    });
  } 
  else {
    messagesList= <p> no messages </p> 
  }

  return(
    <List className="left">
      {messagesList}
    </List>
  );
}

export default MessagesList;
