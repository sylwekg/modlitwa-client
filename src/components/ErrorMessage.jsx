import React, {Component} from 'react';


export default class  ErrorMessage extends Component {
	static propTypes: {
			msg: PropTypes.string,
			ack: PropTypes.func.isRequired, 
	};

	render() {
		return (
		  <div>
	    	{this.props.msg.length>0 && 
	    	<div className="errorMessage">
	    		<span className="closebtn" onClick={this.props.ack} > &times; </span>
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
