import React, {Component} from 'react';
import AvatarEditor from 'react-avatar-editor'
import Slider from 'material-ui/Slider';

import Crop from 'material-ui/svg-icons/image/crop';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import FlatButton from 'material-ui/FlatButton';

import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';

const styles = {
  button: {
    margin: 6,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};


const min = 0;
const max = Math.pow(10, 6);
const power = 12;

function transform(value) {
  return Math.round((Math.exp(power * value / max) - 1) / (Math.exp(power) - 1) * max);
}

function reverse(value) {
  return (1 / power) * Math.log(((Math.exp(power) - 1) * value / max) + 1) * max;
}

export default class  Modlitwa extends Component {

  state = {
    slider: Math.pow(10, 4),
  };

  handleSlider = (event, value) => {
    this.setState({slider: transform(value)});
  };


	render() {
		return (
		  <div className="container" >
		    <h2>Modlitwa </h2>

		    <div>
		        <Slider
		          min={min}
		          max={max}
		          step={max / 100}
		          value={reverse(this.state.slider)}
		          onChange={this.handleSlider}
		        />
		        <p>
		          <span>{'The value of this slider is: '}</span>
		          <span>{this.state.slider}</span>
		        </p>
		    </div>

		    <p>Modlitwa Modlitwa Modlitwa  Modlitwa  Modlitwa  Modlitwa  Modlitwa  Modlitwa </p>
		    <br /> <br /><br /><br /><br />

		    <AvatarEditor
		        image="./images/avatar.jpg"
		        width={250}
		        height={250}
		        border={50}
		        color={[255, 255, 255, 0.6]} // RGBA 
		        scale={1.2}
		        rotate={0}
		    />

			<div className="center">
					<FlatButton
			      	label="New Image"
			      	labelPosition="before"
			      	style={styles.button}
			      	containerElement="label"
			      	icon={<FileUpload />}
			    >
			    	<input type="file" 
			    	style={styles.exampleImageInput}
			    	 />
			    </FlatButton>
			    <FlatButton
			      	label="Crop"
			      	labelPosition="before"
			      	primary={true}
			      	icon={<Crop />}
			      	style={styles.button}
			    />
			</div>

		 <div>
		    <RaisedButton
		      label="Upload Image"
		      labelPosition="before"
		      style={styles.button}
		      containerElement="label"
		      icon={<FileUpload />}
		    >
		      <input type="file" style={styles.exampleImageInput} />
		    </RaisedButton>
		    <RaisedButton
		      label="Crop"
		      labelPosition="before"
		      style={styles.button}
		      containerElement="label"
		      icon={<Crop />}
		    >
		    </RaisedButton>

		    <RaisedButton
		      label="Label before"
		      labelPosition="before"
		      primary={true}
		      icon={<ActionAndroid />}
		      style={styles.button}
		    />
		    <RaisedButton
		      href="https://github.com/callemall/material-ui"
		      target="_blank"
		      label="Github Link"
		      secondary={true}
		      style={styles.button}
		      icon={<FontIcon className="muidocs-icon-custom-github" />}
		    />
		  </div>



		    <p>Modlitwa Modlitwa Modlitwa  Modlitwa  Modlitwa  Modlitwa  Modlitwa  Modlitwa </p>
		  </div>
		);
	}
}