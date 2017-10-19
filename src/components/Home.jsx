import React, { Component } from 'react';
//import {Link} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import home1 from '../images/home1.jpg';

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
          <div className="row">
            <div className="column" >
              <p style={{'fontSize':'200%', padding:'8%'}} > Stay connected </p>
              <p style={{paddingRight: '8%', paddingLeft: '8%',lineHeight: '1.7', textAlign:'justify' }} >
                This web application is dedicated for each person who would like 
                to be part of modlitwaonline.pl community. It allows to edit profile data, get updates on current
                assignments, receive message notifications. Other functions are coming ...</p>
            </div>
            <div className="column" >
              <p style={{'fontSize':'200%'}} > </p>
              <img src={home1} alt='app example' width='100%'/>
              <p></p>
            </div>
            {/* <div className="column" style={{'backgroundColor':'#ccc'}}>
              <p style={{'fontSize':'200%'}} > Otrzymuj powiadomienia</p>
              <p>Some text..</p>
            </div>
            <div className="column" >
              <p style={{'fontSize':'200%'}} > Column 4</p>
              <p>Some text..</p>
            </div> */}
          </div>
        </div>
        <div className="footer" >
            <p> ModlitwaOnline.pl  </p>
        </div>
      </div>
    );
  }
}

export default Home;

