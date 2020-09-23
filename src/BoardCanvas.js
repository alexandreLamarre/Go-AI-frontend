import React from "react";
import Console from "./Console";
import {v4 as uuidv4} from "uuid";
import Loader from "./Loader"

import "./BoardCanvas.css"

class BoardCanvas extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      height : window.innerHeight*0.7,
      width: window.innerHeight*0.7,
      player : 1, // 1 for black, 2 for white
      players: ["ai", "ai"],
      boardsize: 19,
      board : [],
      uuid: 0,
      isPlaying: false,
    };
    this.canvas = React.createRef();
    this.console = React.createRef();
    this.loader = React.createRef();
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
  }

  componentDidUpdate(){
    this.canvas.current.width = this.state.width;
    this.canvas.current.height = this.state.height;
    let numVerticalLines = this.state.boardsize;
    const ctx = this.canvas.current.getContext("2d");
    ctx.clearRect(0,0, this.canvas.current.width, this.canvas.current.height);
    let tileSize = this.state.width/(this.state.boardsize+1);

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
    document.getElementById("consoleInfo").scrollTop = document.getElementById("consoleInfo").scrollHeight
    if(this.state.players[this.state.player-1] == "ai" && this.state.isPlaying === true){
      this.getAIMove();
    }
  }

  play(e){
    if(this.state.players[this.state.player-1] == "player" && this.state.isPlaying){
      const pos = this.getMousePosition(this.canvas.current, e);
      console.log(pos);
      const tileSize = this.state.width/(this.state.boardsize+1);

      const boardX = Math.round(pos[0]/tileSize -1);
      const boardY = Math.round(pos[1]/tileSize -1);
      const that = this;
      get_next_board(this.state.uuid, this.state.player, boardX, boardY, that);
    }
  }

  getAIMove(){
    const color = this.state.player == 1?"black": "white"
    const af = setInterval(() => {this.loader.current.animate(color)},1000/60);
    const that = this;
    get_next_bot_move(this.state.uuid, this.state.player, that, af)
  }


  getMousePosition(canvas, e){
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return [x,y]
  }

  setPlaying(v){
    const that = this;
    waitCreateNewBoard(that)
  }

  setBoardsize(v){
    const value = parseInt(v);
    const that = this;
    waitSetBoardSize(that, value);
  }


  render(){
    return <div className = "boardCanvasContainer">
              <canvas
              ref = {this.canvas}
              className = "boardCanvas"
              onMouseDown = {(event) => this.play(event)}>
              </canvas>
              <Console ref = {this.console}
              height = {(this.state.height/0.70) *0.30}
              width = {(this.state.width/0.70*0.30)}
              className = "consoleContainer">
              </Console>
              <br></br>
              <p className = "playing"> Now playing: {this.state.player === 1? "Black": "White"}</p>
              <Loader ref = {this.loader}></Loader>
              <input
                type = "range"
                min = "5"
                max = "19"
                step = "1"
                value = {this.state.boardsize}
                onChange = {(event) => this.setBoardsize(event.target.value)}
                disabled = {this.state.isPlaying}>
              </input>
              <label className= "sizeLabel">Size: {this.state.boardsize}</label>
              <select disabled = {this.state.isPlaying}>
                <option value = "random"> Random </option>
                <option value = "minimax"> Minimax </option>
                <option value = "alphabeta"> AlphaBeta </option>
              </select>
              <button onClick = {() => this.setPlaying(true)}> StartGame </button>
              <button onClick = {() => this.getAIMove()}
              disabled = {this.state.isPlaying === false}> Get AI move </button>
           </div>
  }

}

export default BoardCanvas;

async function get_next_board(uuid, player, x, y, that){
  const url = "/playmoveplayer";
  let response = await fetch(url,
    {method: "POST",
    body: JSON.stringify({id : uuid, player:player, x: x, y: y}),
    headers: {"content-type" : "application/json"},
    }
  );
  let data = await response.json();
  that.console.current.pushConsole(data.message);
  if(data.winner !== null) that.console.current.pushConsole(data.winner)
  if(data.valid)var opponent = player === 1?2:1;
  else{var opponent = player}
  var playing = that.state.playing
  if(data.over === true){
    playing = false
    opponent = 1
  }
  await that.setState({board:data.board, player:opponent, isPlaying: playing});
}

async function get_next_bot_move(uuid, player, that, af){
  const url = "/playmoveai"
  let response = await fetch(url,
    {method: "POST",
    body: JSON.stringify({id: uuid, player: player}),
    headers: {"content-type": "application/json"},
    }
  );
  let data = await response.json();
  that.console.current.pushConsole(data.message);
  if(data.winner !== null) that.console.current.pushConsole(data.winner)
  var opponent = player === 1? 2: 1;
  clearInterval(af);
  that.loader.current.clearAnimation();
  var playing = that.state.isPlaying
  if(data.over === true) {
    playing = false
    opponent = 1
  }
  await that.setState({board:data.board, player:opponent, isPlaying:playing});
  // if(data.over === true) await that.setState({isPlaying: false});
}

async function waitCreateNewBoard(that){
  const new_id = uuidv4();
  const url = "/input"
  await fetch(url,
    {method: "POST",
    body: JSON.stringify({id : new_id,boardsize: that.state.boardsize}),
    headers: {"content-type" : "application/json"},
  }
  );
  await that.setState({uuid: new_id, isPlaying:true});
}

async function waitSetBoardSize(that, v){
  const new_board = [];
  for(let i = 0; i < v; i++){
    const new_board_row = [];
    for(let j = 0; j < v; j++){
      new_board_row.push(0);
    }
    new_board.push(new_board_row);
  }
  // console.log("newboard", new_board);
  // console.log("newsize", v);
  await that.setState({boardsize: v, board: new_board});
}
