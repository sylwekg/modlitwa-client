import React, {Component} from 'react';


export default class  ErrorMessage extends Component {
	static propTypes: {
	    msg: PropTypes.string,
	};


	render() {
		return (
		  <div>
	    	{this.props.msg.length>0 &&
	    	<div className="errorMessage">
	    		<p> {this.props.msg} </p>
	    	</div>
	    	}	
		  </div>
		);
	}
}

ErrorMessage.defaultProps = {
  msg: ''
};
