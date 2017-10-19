import React , { Component } from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
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
};


class TabsMenu extends Component {
  componentWillUpdate() {
    //console.log("messsagecount: ", this.props.messageCount);
  };
  
  render() {
    return(
      <Tabs className={this.props.styl}  initialSelectedIndex={-1}>
        <Tab
          icon={<Face />}
          label="Profile"
          containerElement={<NavLink to="/profil" />}
          />
        <Tab
          icon={<Favorite />}
          label="Prayer"
          containerElement={<NavLink to="/modlitwa" />}
        />
        <Tab
          icon={<People />}
          label="Group"
          containerElement={<NavLink to="/grupa" />}
        />
        <Tab
          icon={<Message />}
          label= {
          <span> Msg
            {this.props.messageCount ?
            <span 
              style={{fontSize: '12px', borderRadius: '50%', position:'absolute'  , top: '20px',
              display: 'grid', textAlign: 'center', left: '60%', placeContent: 'center', alignItems: 'center',
              backgroundColor: 'white', color: 'black', 
              paddingLeft: '6px', paddingRight: '6px', paddingTop: '3px', paddingBottom: '3px'}}>
              {this.props.messageCount}
            </span> : <span/> }
          </span>}  
          containerElement={<NavLink to="/wiadomosci" />}
        />       
      </Tabs>
    )
  }
};

class Header extends Component { 
  static propTypes: {
      isAuthorized: PropTypes.bool.isRequired,
      onLogout: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
      messageCount: PropTypes.number,
  };
  
  handleTouchTap = () => {
    this.props.history.push("/");
  };

  handleLogout = () => {
    this.props.onLogout();
    this.props.history.push("/");
  };

  render() {
    const { isAuthorized } = this.props

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

            {isAuthorized &&
              <TabsMenu styl="menuHD" messageCount={this.props.messageCount} />
            }

            <div className="right">
              {!isAuthorized &&
                <Tab 
                  icon={<Person />}
                  label="Login"
                  containerElement={<NavLink to="/login" />}
                  />
              }

              {isAuthorized &&
                <div onClick={this.handleLogout}>
                  <Tab 
                    icon={<Person />}
                    label="Logout"
                    />
                </div>
              }

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
                {!isAuthorized &&
                  <Tab 
                    icon={<Person />}
                    label="Login"
                    containerElement={<NavLink to="/login" />}
                    />
                }
                {isAuthorized &&
                <div onClick={this.handleLogout}>
                  <Tab 
                    icon={<Person />}
                    label="Logout"
                    />
                </div>
              }


              </div>}
            //iconElementRight={<IconButton tooltip="Login"> <Person /> </IconButton>}
            className="menu"
            >
            {isAuthorized &&
              <TabsMenu styl="tab" messageCount={this.props.messageCount}  />
            }
          </AppBar> 
        </MediaQuery>

      </header>
    );
  }
}

export default Header;
