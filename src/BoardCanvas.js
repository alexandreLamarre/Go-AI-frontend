import React from "react";
import Console from "./Console";
import {v4 as uuidv4} from "uuid";
import "./BoardCanvas.css"

class BoardCanvas extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      height : window.innerHeight*0.7,
      width: window.innerHeight*0.7,
      player : 1, // 1 for black, 2 for white
      players: ["player", "ai"],
      board : [],
      uuid: 0,
    };
    this.canvas = React.createRef();
    this.console = React.createRef();
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
    const new_id = uuidv4();
    const url = "/input"
    fetch(url,
      {method: "POST",
      body: JSON.stringify({id : new_id,boardsize: boardSize}),
      headers: {"content-type" : "application/json"},
    }
    );
    this.setState({width : w, height: h, board: new_board, uuid: new_id});
  }

  componentDidUpdate(){
    this.canvas.current.width = this.state.width;
    this.canvas.current.height = this.state.height;

    const numVerticalLines = 19;
    const ctx = this.canvas.current.getContext("2d");
    ctx.clearRect(0,0, this.canvas.current.width, this.canvas.current.height);
    const tileSize = this.state.width/20;

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
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
          ctx.closePath();
        }
        if(this.state.board[i][j] === 2){
          ctx.beginPath();
          console.log((i+1)*tileSize, (j+1) *tileSize)
          ctx.arc((i+1)*tileSize, (j+1) *tileSize, tileSize/2.5, 0, Math.PI*2);
          ctx.fillStyle = "#000000";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
    if(this.state.players[this.state.player-1] == "ai"){
      this.getAIMove();
    }
  }

  play(e){
    if(this.state.players[this.state.player-1] == "player"){
      const pos = this.getMousePosition(this.canvas.current, e);
      console.log(pos);
      const tileSize = this.state.width/20;

      const boardX = Math.round(pos[0]/tileSize -1);
      const boardY = Math.round(pos[1]/tileSize -1);
      const that = this;
      get_next_board(this.state.uuid, this.state.player, boardX, boardY, that);
    }
  }

  getAIMove(){
    const that = this;
    get_next_bot_move(this.state.uuid, this.state.player, that)
  }


  getMousePosition(canvas, e){
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return [x,y]
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
  var opponent = player === 1?2:1;
  // if(data.played === true) that.setState({player:opponent});
  await that.setState({board:data.board, player:opponent});
}

async function get_next_bot_move(uuid, player, that){
  const url = "/playmoveai"
  let response = await fetch(url,
    {method: "POST",
    body: JSON.stringify({id: uuid, player: player}),
    headers: {"content-type": "application/json"},
    }
  );
  let data = await response.json();
  that.console.current.pushConsole(data.message);
  var opponent = player === 1? 2: 1;
  await that.setState({board:data.board, player:opponent});
}
