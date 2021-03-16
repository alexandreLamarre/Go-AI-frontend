import React from "react";
import Console from "./Console";
import {v4 as uuidv4} from "uuid";
import Loader from "./Loader";
import SettingsPanel from "./SettingsPanel"
import {connect} from "../api/index"
import "./BoardCanvas.css";
import { Auth0Context } from "@auth0/auth0-react";

class BoardCanvas extends React.Component{
  static contextType = Auth0Context;
  constructor(props){
    super(props);

    this.state = {
      height : window.innerHeight*0.7,
      width: window.innerHeight*0.7,
      player : -1, // 1 for black, 2 for white, -1 for unassigned
      currentPlayer: 1,
      playerSettings: ["player", "player"], //[0]:black, [1]:white
      connectedPlayers: [],
      boardSize: 19,
      board : [],
      guestUuid: "Guest" + uuidv4(),
      isPlaying: false,
      gameSocket: null,
      gameId: null,
      messages: [],
    }
    console.log(this.state.isPlaying)

    this.canvas = React.createRef();
    this.settings = React.createRef();
  }
  componentDidMount(){
    const w = window.innerHeight*0.7;
    const h = window.innerHeight*0.7;
    const new_board = [];
    const boardSize = 19;
    for(let i = 0; i < boardSize; i++){
      const boardRow = [];
      for(let j = 0; j < boardSize; j++){
        boardRow.push(0);
      }
      new_board.push(boardRow);
    }
    this.setState({width : w, height: h, board: new_board});
    this.animate();
  }

  animate(){
    this.drawBoard()
    window.requestAnimationFrame(() => this.animate())
  }

  drawBoard(){
    this.canvas.current.width = this.state.width;
    this.canvas.current.height = this.state.height;
    let numVerticalLines = this.state.boardSize;
    const ctx = this.canvas.current.getContext("2d");
    ctx.clearRect(0,0, this.canvas.current.width, this.canvas.current.height);
    let tileSize = this.state.width/(this.state.boardSize+1);

    for(let i = 1; i <numVerticalLines+1; i++){
      ctx.beginPath();
      ctx.moveTo(tileSize*i, tileSize);
      ctx.lineTo(tileSize*i, this.canvas.current.height-tileSize);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(tileSize, tileSize*i);
      ctx.lineTo(this.canvas.current.width- tileSize, tileSize*i);
      ctx.stroke();
      ctx.closePath();
    }

    for(let i = 0; i < this.state.board.length; i++){
      for(let j = 0; j < this.state.board[i].length; j++){
        if(this.state.board[i][j] === 1){
          ctx.beginPath();
          ctx.arc((i+1)*tileSize, (j+1) *tileSize, tileSize/2.5, 0, Math.PI*2);
          ctx.fillStyle = "#000000";
          ctx.fill();
          ctx.closePath();
        }
        if(this.state.board[i][j] === 2){
          ctx.beginPath();
          ctx.arc((i+1)*tileSize, (j+1) *tileSize, tileSize/2.5, 0, Math.PI*2);
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  getMousePosition(canvas, e){
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return [x,y]
  }


  setBoardsize(v){
    const value = parseInt(v);
    this.setState({boardSize: value})
  }

  setPlayerOrAI(player, v){
    console.log(v);
    const players = this.state.playerSettings;
    players[player-1] = v;
    this.setState({playerSettings: players})
  }

  openSettings(){
    this.settings.current.setOpen(true);
  }


  sendMessage(e){
    if(e.keyCode === 13){
      if(this.state.gameSocket === null) {
        alert("Connect to a game first, before trying to chat")
      } else{
        const {isAuthenticated, user} = this.context
        const name = isAuthenticated? user.nickname: this.state.guestUuid;
        //TODO: send and parse this to backend
        this.state.gameSocket.emit("Message",
            {data:{user: name, data: e.target.value, gameId: this.state.gameId}});
      }
      e.target.value = "";
    }
  }

  startGame(){
    //get player id/nickname
    const {isAuthenticated, user} = this.context
    const name = isAuthenticated? user.nickname: this.state.guestUuid;
    const gameUuid = this.state.gameId === null?uuidv4():this.state.gameId
    const cb = () => this.setState({gameId: gameUuid, gameSocket: socket, isPlaying: true})
    const msgCb = (msg) => this.appendMessage(msg)
    const socket = connect("", {
      connectCb: cb,
      msgCb: msgCb,
      username: name,
      gameId: gameUuid})

    this.setState({gameSocket: socket})

  }

  appendMessage(msgData){
    const messages = this.state.messages;
    messages.push(msgData)
    this.setState({messages: messages})
  }



  render(){
    return <div className = "boardCanvasContainer" id = "boardCanvasContainer">
              <div className = "main">
                <canvas
                ref = {this.canvas}
                className = "boardCanvas"
                onMouseDown = {(event) => this.play(event)}>
                </canvas>
                <div className = "gamehistory">
                <Console messages = {this.state.messages}
                height = {!this.canvas.current? 0: this.canvas.current.width}
                className = "consoleContainer">
                </Console>
                  <div className = "inputContainer">
                    <label className ="chatLabel"> Chat:
                      <input
                          className = "inputMessage"
                          id = "chat"
                          rows="1"
                          onKeyDown = {(e) => this.sendMessage(e)}>
                      </input>
                    </label>
                  </div>
                </div>
              </div>
              <SettingsPanel parent = {this} ref = {this.settings}/>
              {!this.state.isPlaying? (<div>
                <button className = "playbuttons"
                        onClick = {() => this.openSettings()}>
                  Configure Game
                </button>
                <button className = "playbuttons"
                        onClick = {() => this.startGame()}>
                  Start Game
                </button>
              </div>): (<div>
                  <button className = "playbuttons"
                    > Pass
                  </button>
                  <button className = "playbuttons"
                    > Resign
                  </button>
                  <div className = "playing"
                    > Now playing: {this.state.currentPlayer === 1? "Black": "White"}
                  </div>
                  <Loader/>
                </div>)
              }
           </div>
  }

}

export default BoardCanvas;

