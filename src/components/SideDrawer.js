import React, {useState} from "react";
import Modal from "react-modal";
import JoinGameWindow from "./JoinGameWindow";

import "./SideDrawer.css";
import {useAuth0} from "@auth0/auth0-react";

Modal.setAppElement("#root")

export const DrawerToggleButton = props => (
  <button onClick = {() => {props.setOpen(!props.open)}} className = "toggle_button">
    <div className = "toggle_button-line"/>
    <div className = "toggle_button-line"/>
    <div className = "toggle_button-line"/>
  </button>
)

const LoginButton = () => {
  const {loginWithRedirect} = useAuth0();
  return <button onClick = {() => loginWithRedirect()}>
            Sign up / Sign in
          </button>
}

const LogoutButton = () => {
  const {logout} = useAuth0();
  return <button onClick = {() => logout()}>
          Sign out
         </button>
}


const SideDrawer = props => {
    const [joinOpen, setJoinOpen ] = useState(false)
    return (<div>
            <Modal isOpen = {props.open}
            onRequestClose = {() => {props.setOpen(false)}}
            className = "sidedrawer"
            overlayClassName = "sidedraweroverlay"
            >
            <JoinGameWindow
                gameRef = {props.gameRef}
                open = {joinOpen} setOpen = {setJoinOpen}/>
              <div className = "settings">
                <br/>
                <a href ="/"> New Game</a>
                <br/>
                <button onClick = {() => setJoinOpen(true)}>
                    {props.gameRef.current === null || props.gameRef.current.state.gameSocket === null?
                        "Join Game": "Game ID"}
                </button>
                <br/>
                <button> User Stats</button>
                <br/>
                <LoginButton/>
                <br/>
                <LogoutButton/>
                <br/>
              </div>
            </Modal>
          </div>)

}

export default SideDrawer;
