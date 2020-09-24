import React from "react";
import Modal from "react-modal";

import "./SettingsPanel.css";

class SettingsPanel extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      open:false,
      boardsize: 19,
      playerTypeBlack: "player",
      playerTypeWhite: "player",
    };
  };

  setOpen(v){
    this.setState({open:v});
  }

  setBoardSize(v){
    const value = parseInt(v)
    this.setState({boardsize: value})
  }

  render(){
    return <div className = "settingsPanelContainer">
              <Modal isOpen = {this.state.open}
              onRequestClose = {() => this.setOpen(false)}
              className = "settingsPanel"
              overlayClassName = "settingsPanelOverlay">
              <div className = "settingsPanelItems">
                <h2> Players </h2>
                <label> Black : </label>
                <select>
                  <option value = "player"> Player </option>
                  <option value = "ai"> AI </option>
                </select>
                <label> White : </label>
                <select>
                  <option value = "player"> Player </option>
                  <option value = "ai"> AI </option>
                </select>
                <br></br>
                <h2> Board size </h2>
                <div className = "slider">
                  <input
                    type = "range"
                    min = "5"
                    max = "19"
                    step = "1"
                    value = {this.state.boardsize}
                    onChange = {(event) => this.setBoardSize(event.target.value)}
                    disabled = {this.state.isPlaying}>
                  </input>
                  <label className= "sizeLabel">Size: {this.state.boardsize}</label>
                </div>
                <h2> AI Settings </h2>
                <label> Black: </label>
                <select>
                  <option> Random </option>
                  <option> Alpha-Beta</option>
                  <option> Monte Carlo </option>
                </select>
                <label> White: </label>
                <select>
                  <option> Random </option>
                  <option> Alpha-Beta</option>
                  <option> Monte Carlo </option>
                </select>
              </div>
              </Modal>
           </div>
  }
}

export default SettingsPanel
