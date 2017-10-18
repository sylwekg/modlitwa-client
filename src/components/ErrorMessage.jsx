import React, {Component} from 'react';


export default class  ErrorMessage extends Component {
	static propTypes: {
			msg: PropTypes.string,
			ack: PropTypes.func.isRequired, 
	};

	constructor(props) {
		super(props)
		this.state = { 
		errorConfirmed: false,
		}
	};

	componentWillMount() {
		console.log('error update.');
		this.setState({ errorConfirmed:false });
	};

	render() {
		return (
		  <div>
	    	{this.props.msg.length>0 && //!this.state.errorConfirmed &&
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
