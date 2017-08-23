import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
      <div className="main-content container">
        <h2>Front End Course Directory</h2>
        <p>This fun directory is a project for the <em>React Router Basics</em> course on Treehouse.</p>
        <p>Learn front end web development and much more! This simple directory app offers a preview of our course library. Choose from many hours of content, from HTML to CSS to JavaScript. Learn to code and get the skills you need to launch a new career in front end web development.</p>
        <p>We have thousands of videos created by expert teachers on web design and front end development. Our library is continually refreshed with the latest on web technology so you will never fall behind.</p>
        <hr />
        <h3><Link to='/teachers/HTML/Janusz'> Janusz Przykrywka</Link></h3>

        <form onSubmit={this.handleSubmit}>
          <input type='text' placeholder='name' ref= { (input) => this.name = input }/>
          <input type='text' placeholder='topic' ref= { (input) => this.topic = input } />
          <button type='submit'> Go! </button>
        </form>
      
      <RaisedButton label="Default" />

      </div>
      
      


    );
  }
}

export default Home;