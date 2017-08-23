import React , { Component } from 'react';
import {NavLink} from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
//import FlatButton from 'material-ui/FlatButton';

import {Tabs, Tab} from 'material-ui/Tabs';
//import FontIcon from 'material-ui/FontIcon';

import People from 'material-ui/svg-icons/social/people';
import Favorite from 'material-ui/svg-icons/action/favorite';
import Face from 'material-ui/svg-icons/action/face';
import Message from 'material-ui/svg-icons/communication/message';
import Person from 'material-ui/svg-icons/social/person';


var styles = {
  appBar: {
    flexWrap: 'wrap',
    width: '100%',
    'padding-left': '6px',
    'padding-right': '6px',
    position: "fixed",
  },
  title: {
    cursor: 'pointer',
  },
  tabs: {
    width: '100%',
    'padding-left': '6px',
    'padding-right': '6px',
  },
};

class Header extends Component { 
  state = {
    logged: true,
  };

  handleTouchTap = () => {
    this.props.history.push("/");
  }


  render() {
    return (
      <header>
        <AppBar 
          className="menu"  
          title={<span style={styles.title}>ModlitwaOnline.pl</span>} 
          style={styles.appBar} 
          //showMenuIconButton={false}
          onTitleTouchTap={this.handleTouchTap}
          containerElement={<NavLink to="/" />}
          iconElementRight={this.state.logged ? <Person /> : <People />}
          >
          <Tabs className="tab" onChange={this.onChangeTabs} style={styles.tabs}>
            <Tab
              icon={<Face />}
              label="Profil"
              containerElement={<NavLink to="/profil" />}
              />
              
            <Tab
              icon={<Favorite />}
              label="Modlitwa"
              containerElement={<NavLink to="/modlitwa" />}
            />
            <Tab
              icon={<People />}
              label="Grupa"
              containerElement={<NavLink to="/grupa" />}
            />
            <Tab
              icon={<Message />}
              label="Msg"
              containerElement={<NavLink to="/wiadomosci" />}
            />
          </Tabs>

        </AppBar> 
      </header>
    );
  }
}

export default Header;

