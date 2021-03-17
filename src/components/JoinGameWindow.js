import React, {useState} from "react";
import Modal from "react-modal";

import "./JoinGameWindow.css";

const JoinGameWindow = props => {


    const [input, setInput] = useState("")

    const applyMessage = (e) => {
        if(e.keyCode === 13){
            if(props.gameRef.current.state.gameSocket !== null) {
                alert("Please finish your current game before joining another one")
            } else{
                props.gameRef.current.startGame(e.target.value)
            }
            e.target.value = "";

        }
    }



    return <Modal isOpen = {props.open}
              onRequestClose = {() => props.setOpen(false)}
              className = "joingamewindow"
              overlayClassName = "joingamewindowoverlay">
                <div className = "joingamecontainer">
                  <label className = "joingamelabel">
                  Game ID:
                    <br/>
                    <input
                        value = {
                            props.gameRef.current === null || props.gameRef.current.state.gameSocket === null?
                                input:
                                props.gameRef.current.state.gameId
                        }
                        onKeyDown = {(e) => applyMessage(e)}
                        onChange ={(e) => setInput(e.target.value)}
                           className = "joingametextarea">
                    </input>
                  </label>
                </div>
              </Modal>

}

export default JoinGameWindow;
