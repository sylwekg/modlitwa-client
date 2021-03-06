import {getProfile, deleteMsg, setReadMsg} from '../authorize';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
//import ReactPullToRefresh from 'react-pull-to-refresh';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export default class Wiadomosci extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      errorMessage: this.props.errorMessage,
      loading: false,
      messages: this.props.messages,
      editWindowOpen: false,
      editWindowMsg: {},
    }
  };

  componentWillMount() {
    var token = localStorage.getItem('id_token') || '';
    var results = this.props.messages;
    var messages = this.props.messages;
    function SortByDate(a, b){
      var aName = a.date;
      var bName = b.date;
      return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
    }
    results.sort(SortByDate);
    let promises = [];

    if( (results.length > 0) && (typeof results[0].from._id) === 'undefined' ) {
    // compilowanie danych
      results.forEach( (message, index) => {
        this.setState({loading:true});
        promises.push( 
          getProfile(message.from, token)
          .then( data => { 
            messages[index]=Object.assign({}, message, {from: data.user });
            this.setState({ 
              messages: messages, 
              loading: false });
          })       
          .catch( err => {
            //console.log(err);
            this.setState({ errorMessage: err.message, loading:false });
            if(err.status===401 ) 
              this.props.dataRefresh();
          })
        )
      });
      Promise.all(promises)
      .then( () => { 
        //console.log('msg data loaded'); 
        this.render();
      });
    } 
  };

  handleOpen = ( message ) => {
    //console.log('target: ',message);     
    
    this.setState({ 
      editWindowOpen: true,
      editWindowMsg: message,
    }); 

    //set message as read
    let token = localStorage.getItem('id_token') || '';
    let userId = localStorage.getItem('userId') || '';
    //this.setState({loading:true});
    setReadMsg(message._id, userId , token)
    .then( result => {
      //console.log(result);
      //this.setState({ editWindowOpen: false, loading:false });
      
    })
    .catch( err => {
      //console.log(err);
      this.setState({ errorMessage:err.message, loading:false });
      if(err.status===401) 
        this.props.dataRefresh();
    })

  };

  handleClose = () => {
    this.setState({ editWindowOpen: false});
    this.props.dataRefresh();
  };

  // handleRefresh(event) {
  //   event.preventDefault();
  //   //console.log('handle refresh');
  //   this.props.dataRefresh();
  // };

  handlePullRefresh() {

  }

  handleDelete = () => {
    //console.log('zostanie skasowana: ',this.state.editWindowMsg._id);
    //kasowanie wiadomosci
    let token = localStorage.getItem('id_token') || '';
    let userId = localStorage.getItem('userId') || '';
    this.setState({loading:true});
    deleteMsg(this.state.editWindowMsg._id, userId , token)
    .then( result => {
      //console.log(result);
      this.setState({ editWindowOpen: false, loading:false });
      this.props.dataRefresh();
    })
    .catch( err => {
      //console.log(err);
      this.setState({ errorMessage:err.message, loading:false });
      if(err.status===401) 
        this.props.dataRefresh();
    })
  };

  onErrorAck = () => {
    //console.log('errr ack');
    this.setState({errorMessage:''});
  };

  render() {
    const { loading, errorMessage, messages, editWindowOpen, editWindowMsg} = this.state
    //console.log('render');
    return (
      <div className="container">
        <ProgressIndicator showProg={loading} />
        <ErrorMessage className="errorMessage" msg={errorMessage} ack={this.onErrorAck} />     
        <Card className="center">
          <MessagesList messages={messages} onClick={this.handleOpen} 
          //onDrag={this.handleRefresh}
            />
          {/* <ReactPullToRefresh
            onRefresh={this.handlePullRefresh}
            >

          </ReactPullToRefresh> */}

          {/* Show full message modal window */}
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
              iconElementLeft={<IconButton onClick={this.handleClose} ><NavigationClose /></IconButton>}
              iconElementRight={<FlatButton onClick={this.handleDelete} label="Delete" />}
              // onLeftIconButtonTouchTap={this.handleClose}
              // onRightIconButtonTouchTap={this.handleDelete}
            />

            <ErrorMessage className="errorMessageEditWindow" msg={errorMessage} ack={this.onErrorAck} />
            

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
Wiadomosci.propTypes= {
  messages: PropTypes.array,
  errorMessage: PropTypes.string,
  dataRefresh: PropTypes.func, 
};
          