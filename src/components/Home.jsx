import React, { Component } from 'react';
//import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {    

  handleSubmit = (e) => {
    e.preventDefault();
    let teachersName=this.name.value;
    let teachersTopic=this.topic.value;
    let path = `/teachers/${teachersTopic}/${teachersName}`;
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="frontPage">
        <div className="hero-image" >
          <div className="hero-text">
            {/*<p style={{'fontSize':'200%'}} > Chcesz się przyłączyć ? </p> */}

            <RaisedButton label="Contact us" />
          </div>
        </div>
        <div className="productArgument">
          <div className="row productArgument">
            <div className="column productArgument" style={{'backgroundColor':'rgb(93, 188, 213)'}}>
              <p  style={{'fontSize':'200%'}} > Stay connected </p>
              <p>This application is dedicated for each person who would like 
                to be part of modlitwaonline.pl community. It allows to edit profile data get updates on current
                assignments and receive message notifications.</p>
            </div>
            <div className="column productArgument" >
              <p style={{'fontSize':'200%'}} >Column 2</p>
              <p>Some text..</p>
            </div>
            {/* <div className="column productArgument" style={{'backgroundColor':'#ccc'}}>
              <p style={{'fontSize':'200%'}} > Otrzymuj powiadomienia</p>
              <p>Some text..</p>
            </div>
            <div className="column productArgument" >
              <p style={{'fontSize':'200%'}} > Column 4</p>
              <p>Some text..</p>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

