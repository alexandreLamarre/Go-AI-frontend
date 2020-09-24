import React from "react";
import {DrawerToggleButton} from "./SideDrawer";
import SideDrawer from "./SideDrawer";

import "./GoNavBar.css";

class GoNavBar extends React.Component{
  constructor(props){
    super(props);
    this.settings = React.createRef();
  }

  openSettings(){
    console.log("clicked");
    const open = this.settings.current.state.open;
    this.settings.current.setOpen(!open);
  }

  render(){
    return <div className = "gonavbar">
              <SideDrawer ref = {this.settings}></SideDrawer>
              <header className = "toolbar">
                <nav className ="toolbar__navigation">
                <div><DrawerToggleButton openSettings = {() => this.openSettings()}></DrawerToggleButton></div>
                  <div className = "toolbar__logo"><a href = "/">Go AI </a></div>
                  {/* 
                  <div className = "spacer"></div>
                  <div className = "toolbar_navigation-items">
                    <ul>
                      <li> <a href = "/">New Game </a> </li>
                      <li> <a href = "/join_game"> Join Game </a> </li>
                      <li> <a href = "/signup"> Sign up </a> </li>
                      <li> <a href = "/signin"> Sign in </a> </li>
                    </ul>
                  </div>
                  */}
                </nav>
              </header>
            </div>
  }
}

export default GoNavBar
