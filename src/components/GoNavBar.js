import React, {useState} from "react";
import {DrawerToggleButton} from "./SideDrawer";
import SideDrawer from "./SideDrawer";
import Profile from "./Profile.js";
import "./GoNavBar.css";
import {useAuth0} from "@auth0/auth0-react";



function GoNavBar (){

    const isAuth = useAuth0().isAuthenticated;
    const [open, setOpen ] = useState(false)
    return (<div className = "gonavbar">
              <SideDrawer setOpen = {setOpen} open = {open} />
              <header className = "toolbar">
                <nav className ="toolbar__navigation">
                <div>
                    <DrawerToggleButton setOpen = {setOpen} open = {open}/>
                </div>
                  <div className = "toolbar__logo"><a href = "/">Go AI </a></div>

                </nav>
                  {isAuth? <Profile width = {20} height = {20}/>:<div/>}
              </header>

            </div>)
}

export default GoNavBar
