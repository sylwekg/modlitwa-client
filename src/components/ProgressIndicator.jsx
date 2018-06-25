import React, {Component} from 'react';
import PropTypes from 'prop-types';

import CircularProgress from 'material-ui/CircularProgress';

export default class  ProgressIndicator extends Component {
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

ProgressIndicator.propTypes= {
	showProg: PropTypes.bool.isRequired,
};