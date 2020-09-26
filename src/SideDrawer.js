import React from "react";
import Modal from "react-modal";
import JoinGameWindow from "./JoinGameWindow";

import "./SideDrawer.css";
import {useAuth0} from "@auth0/auth0-react";

Modal.setAppElement("#root")

export const DrawerToggleButton = props => (
  <button onClick = {props.openSettings} className = "toggle_button">
    <div className = "toggle_button-line"></div>
    <div className = "toggle_button-line"></div>
    <div className = "toggle_button-line"></div>
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

const Profile = () => {
  const {user} = useAuth0();
  return <div>
            {JSON.stringify(user, null, 2)}
         </div>
}

class SideDrawer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      open:false,
    }
    this.joingame = React.createRef();
  }

  setOpen(v){
    this.setState({open:v});
  }

  componentDidUpdate(){
    Modal.setAppElement(document.getElementById('BC'));
  }

  render(){

    return <div>
            <Modal isOpen = {this.state.open}
            onRequestClose = {() => this.setOpen(false)}
            className = "sidedrawer"
            overlayClassName = "sidedraweroverlay"
            >
            <JoinGameWindow parent = {this} ref = {this.joingame}>
            </JoinGameWindow>
              <div className = "settings">
                <br></br>
                <a href ="/"> New Game</a>
                <br></br>
                <button onClick = {() => this.joingame.current.setOpen(true)}> Join Game</button>
                <br></br>
                <button> User Stats</button>
                <br></br>
                <LoginButton/>
                <br></br>
                <LogoutButton/>
                <br></br>
                <Profile/>
              </div>
            </Modal>
          </div>
  }
}

export default SideDrawer;
