import React from "react";
import Modal from "react-modal";

import "./JoinGameWindow.css";

class JoinGameWindow extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      open:false,
      parentModal: this.props.parent,
    };
  }

  setOpen(v){
    this.setState({open:v});
    console.log(v);
  }

  render(){
    return <Modal isOpen = {this.state.open}
              onRequestClose = {() => this.setOpen(false)}
              className = "joingamewindow"
              overlayClassName = "joingamewindowoverlay">
                <div className = "joingamecontainer">
                  <label className = "joingamelabel">
                  Game ID:
                    <br/>
                    <input className = "joingametextarea">
                    </input>
                  </label>
                </div>
              </Modal>
  }
}

export default JoinGameWindow;
