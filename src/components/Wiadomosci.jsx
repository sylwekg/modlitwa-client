import {getProfile} from '../authorize';
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import MessagesList from './MessagesList';
import ErrorMessage from './ErrorMessage';
import ProgressIndicator from './ProgressIndicator';
import {Card, CardHeader } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export default class Wiadomosci extends Component {
  static propTypes: {
      messages: PropTypes.array,
      errorMessage: PropTypes.string,
  };

  constructor(props) {
    super(props)
    this.state = { 
      errorMessage: this.props.errorMessage,
      loading: false,
      messages: [],
      editWindowOpen: false,
      editWindowMsg: {},
    }
  };

  componentWillMount() {
    var token = localStorage.getItem('id_token') || '';
    var results = this.props.messages;
    var messages = [];

    if(results.length > 0) {
    // compilowanie danych
      results.forEach( (message, index) => {
        this.setState({loading:true});
        getProfile(message.from, token)
        .then( data => { 
          messages.push(Object.assign({}, message, {from: data.user }));
          
          if ( index === results.length-1 ) {
            this.setState({ messages: messages, loading: false });
          }
        })       
        .catch( err => {
          console.log(err);
          this.setState({ errorMessage:err.message, loading:false });
        })
      });
    } 
  };

  handleOpen = ( message ) => {
    console.log('target: ',message);     

    this.setState({ 
      editWindowOpen: true,
      editWindowMsg: message,
    }); 

  };

  handleClose = () => {
    this.setState({ editWindowOpen: false});
  };

  handleDelete = () => {

    this.setState({ editWindowOpen: false});
  };

  render() {
    const { loading, errorMessage, messages, editWindowOpen, editWindowMsg} = this.state
    return (
      <div className="container">
        <ProgressIndicator showProg={loading} />
        <ErrorMessage msg={errorMessage} />     
        <Card className="center">
          <MessagesList messages={messages} onClick={this.handleOpen} />
          <Dialog
            modal={true}
            open={editWindowOpen}
            onRequestClose={this.handleClose} 
            autoDetectWindowHeight={true}
            autoScrollBodyContent={true}
            repositionOnUpdate={true}
            bodyClassName="global--modal-body"
            contentClassName="global--modal-content"
            paperClassName="global--modal-paper"              
          >
            <AppBar 
              style={{position: "fixed"}}
              title={<span >Show msg</span>}
              iconElementLeft={<IconButton><NavigationClose /></IconButton>}
              iconElementRight={<FlatButton label="Delete" />}
              onLeftIconButtonTouchTap={this.handleClose}
              onRightIconButtonTouchTap={this.handleDelete}
            />

            <div className="errorMessageEditWindow" >
              <ErrorMessage msg={errorMessage} />
            </div>

            {editWindowOpen &&
            <div >               
              <CardHeader
                title={editWindowMsg.from.name}
                subtitle={moment(editWindowMsg.date).format("YYYY-MM-DD hh:mm")}
                avatar={<Avatar src={baseURL+"/api/avatars/"+ editWindowMsg.from.foto}  /> }
              />
              <div className="left" style={{'margin':'30px'}}>
                {editWindowMsg.content}
              </div>
            </div>}
          </Dialog>     
        </Card>
      </div>
    );
  }
}

 //             