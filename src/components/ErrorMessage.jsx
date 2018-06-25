import React, {Component} from 'react';
import PropTypes from 'prop-types';


export default class  ErrorMessage extends Component {
	render() {
		return (
		  <div>
	    	{this.props.msg.length>0 && 
	    	<div className={this.props.className} >
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
ErrorMessage.propTypes= {
	msg: PropTypes.string,
	ack: PropTypes.func.isRequired, 
	className: PropTypes.string,
};