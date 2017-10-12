import {getProfile} from '../authorize';
import React, {Component} from 'react';
import MessagesList from './MessagesList';
import ErrorMessage from './ErrorMessage';
import ProgressIndicator from './ProgressIndicator';
import {Card } from 'material-ui/Card';
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

  render() {
    const { loading, errorMessage, messages} = this.state
    return (
      <div className="container">
        <Card className="center">
          <ProgressIndicator showProg={loading} />
          <ErrorMessage msg={errorMessage} />
          <MessagesList messages={messages} />
        </Card>
      </div>
    );
  }
}

