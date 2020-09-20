import React from "react";

import "./BoardCanvas.css"

class BoardCanvas extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      height : 0,
      width: 0,
      player : 2, // 1 for black, 2 for white
      board : [],
    };
    this.canvas = React.createRef();
  }

  componentDidMount(){
    const w = window.innerHeight*0.85;
    const h = window.innerHeight*0.85;
    const new_board = [];
    for(let i = 0; i < 19; i++){
      const boardRow = [];
      for(let j = 0; j < 19; j++){
        boardRow.push(0);
      }
      new_board.push(boardRow);
    }

    this.setState({width : w, height: h, board: new_board});
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
      ctx.moveTo(tileSize*i, 0);
      ctx.lineTo(tileSize*i, this.canvas.current.height);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(0, tileSize*i);
      ctx.lineTo(this.canvas.current.width, tileSize*i);
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
  }

  play(e){
    const pos = this.getMousePosition(this.canvas.current, e);
    console.log(pos);
    const tileSize = this.state.width/20;

    const boardX = Math.round(pos[0]/tileSize -1);
    const boardY = Math.round(pos[1]/tileSize -1);

    const board = this.state.board;
    if(boardX >= 0 && boardY >= 0 && boardX < board.length && boardY < board.length){
      if(board[boardX][boardY] === 0)board[boardX][boardY] = this.state.player;
    }
    // console.log(boardX, boardY)
    const next_player = this.state.player === 1? 2: 1;
    this.setState({board: board, player: next_player});
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
           </div>
  }

}

export default BoardCanvas;
