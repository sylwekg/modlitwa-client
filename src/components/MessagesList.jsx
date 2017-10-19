import React from 'react';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
//import {darkBlack, lightBlack} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import moment from 'moment';

const MessagesList = props => { 

  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
  const results = props.messages;
  let messagesList;

  if(results.length) {
    messagesList=results.map( msg => {
      //date converter
      //msg.date="2016-10-14T16:49:54.099Z";  //for testing past year date 
      let displayT, displayD, displayY;
      if(msg.date) {
        let currentYear = new Date().getFullYear();
        let checkYear= currentYear - new Date(msg.date).getFullYear();
        if(checkYear > 0 ) {
          displayD=moment(msg.date).format("DD-MMM"); 
          displayY=moment(msg.date).format("YYYY"); 
        }
        else {
          displayD = moment(msg.date).format("DD-MMM");
          displayT = moment(msg.date).format("HH:mm");  
        }
        //console.log(displayY,'-', displayD,'-', displayT);
      } 
      else {
        displayT="12:00";
      }

      return (
        <div key={msg._id}>
          <ListItem
            leftAvatar={<Avatar src={baseURL+"/api/avatars/"+ msg.from.foto}  />}
            primaryText={msg.from.name}
            secondaryText={ <p> {msg.content} </p> }
            secondaryTextLines={2}
            onClick={ (event) => {props.onClick( msg ); } }
            rightAvatar={
              <Avatar 
                size={50} 
                style={{ display: 'block', textAlign: 'center', color: 'lightBlack', 
                  fontSize:'12px', background:'transparent'}} 
                >
                {displayY} {displayY &&  <br/>}{displayD} {displayT && <br/>} {displayT}<br/>
                {!msg.read&&<span style={{color: 'red', fontSize: '20px'}} > &#9679;</span>}
              </Avatar>
            }
            //rightAvatar={<DateDisplay className="dateDisplay" date={msg.date}/>}
          />
          <Divider inset={true} />
        </div>
      );
    });
  } 
  else {
    messagesList= <p style={{ textAlign: 'center' }} > no messages found </p> 
  }

  return(
    <div >
      <List className="left" 
      //onDragEnd={(event)=> {props.onDrag}} draggable="true" 
      >
        {messagesList}
      </List>
    </div>
  );
}

MessagesList.propTypes = {
  messages: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  //onDrag: PropTypes.func.isRequired,
}


export default MessagesList;
