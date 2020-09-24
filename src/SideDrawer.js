import React from "react";
import Modal from "react-modal"
import "./SideDrawer.css"

Modal.setAppElement("#root")

export const DrawerToggleButton = props => (
  <button onClick = {props.openSettings} className = "toggle_button">
    <div className = "toggle_button-line"></div>
    <div className = "toggle_button-line"></div>
    <div className = "toggle_button-line"></div>
  </button>
)

class SideDrawer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      open:false,
    }
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
              <div className = "settings">
                <br></br>
                <a href= "/"> New Game</a>
                <br></br>
                <a href= "/"> Join Game</a>
                <br></br>
                <a href= "/"> User Stats</a>
                <br></br>
                <a href= "/"> Sign in</a>
                <br></br>
                <a href= "/"> Sign up</a>
                <br></br>
              </div>
            </Modal>
          </div>
  }
}

export default SideDrawer;
