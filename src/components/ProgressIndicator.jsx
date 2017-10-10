import React, {Component} from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class  ProgressIndicator extends Component {
	static propTypes: {
	    showProg: PropTypes.bool.isRequired,
	};


	render() {
		return (
			<div>
			{this.props.showProg &&
		        <div className="progressIndicator">
		          <CircularProgress size={60} thickness={7} />
		        </div> }
		  </div>
		);
	}
}

ProgressIndicator.defaultProps = {
  showProg: false
};
