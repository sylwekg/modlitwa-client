import React , { Component } from 'react';
import {NavLink} from 'react-router-dom'


import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
//import FontIcon from 'material-ui/FontIcon';
import People from 'material-ui/svg-icons/social/people';
import Favorite from 'material-ui/svg-icons/action/favorite';
import Face from 'material-ui/svg-icons/action/face';
import Message from 'material-ui/svg-icons/communication/message';
import Person from 'material-ui/svg-icons/social/person';
//import ActionHome from 'material-ui/svg-icons/action/home';

var MediaQuery = require('react-responsive');

var styles = {
  appBar: {
    flexWrap: 'wrap',
    width: '100%',
    paddingLeft: '10px',
    paddingRight: '10px',
    position: "fixed",

  },
  login: {
    
  },
};


class TabsMenu extends Component {
  render() {
    return(
      <Tabs className={this.props.styl} value={this.props.id}>
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
    )
  }
};


class Header extends Component { 
  
  handleTouchTap = () => {
    this.props.history.push("/");
  }

  render() {
    return (
      <header>
        <MediaQuery query='(min-width: 769px)'>
          <AppBar 
            title={<span className="title">ModlitwaOnline.pl</span>} 
            style={styles.appBar} 
            //showMenuIconButton={false}
            onTitleTouchTap={this.handleTouchTap}
            // iconElementRight={<span className="menuHD"><FlatButton label="Save" /> </span>}
            //iconElementRight={<IconButton tooltip="Login"> <Person /> </IconButton>}
            className="menu"
            >
            <TabsMenu styl="menuHD"  />
            <div className="right">
              <Tab 
                icon={<Person />}
                label="Login"
                containerElement={<NavLink to="/login" />}
                />
            </div>
          </AppBar> 
        </MediaQuery>

        <MediaQuery query='(max-width: 768px)'>
          <AppBar 
            title={<span className="title">ModlitwaOnline.pl</span>} 
            style={styles.appBar} 
            //showMenuIconButton={false}
            onTitleTouchTap={this.handleTouchTap}
            iconElementRight={
              <div className="right">
                <Tab 
                  icon={<Person />}
                  //label="Login"
                  containerElement={<NavLink to="/login" />}
                  />
              </div>}
            //iconElementRight={<IconButton tooltip="Login"> <Person /> </IconButton>}
            className="menu"
            >
            <TabsMenu styl="tab"  />
          </AppBar> 
        </MediaQuery>

      </header>
    );
  }
}

export default Header;
