import React, {Component} from 'react';


export default class  ErrorMessage extends Component {
	static propTypes: {
	    msg: PropTypes.string,
	};

    constructor(props) {
	    super(props)
	    this.state = { 
			errorConfirmed: false,
	    }
  	};

  	onAcknowledge() {
  		this.setState({ errorConfirmed: true })
  	};

	render() {
		return (
		  <div>
	    	{this.props.msg.length>0 && !this.state.errorConfirmed &&
	    	<div className="errorMessage">
	    		<span className="closebtn" onClick={this.onAcknowledge.bind(this)} > &times; </span>
	    		<p style={{'marginLeft': '15px'}}> {this.props.msg} </p>
	    	</div>
	    	}	
		  </div>
		);
	}
}

ErrorMessage.defaultProps = {
  msg: ''
};
