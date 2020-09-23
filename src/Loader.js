import React from "react";

class Loader extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rotation : 0,
      height : 20,
      width: 20,
    }
    this.canvas = React.createRef();
  }



  animate(color){
    const ctx = this.canvas.current.getContext('2d');
    ctx.clearRect(0,0, this.canvas.current.width, this.canvas.current.height);
    ctx.beginPath();
    const x = this.canvas.current.width/2;
    const y = this.canvas.current.height/2;
    ctx.arc(x,y,x,this.state.rotation,this.state.rotation+ 2*Math.PI/3)
    if(color !== undefined) ctx.strokeStyle = color;
    ctx.stroke();
    this.setState({rotation: this.state.rotation+0.1});

  }

  clearAnimation(){
    const ctx = this.canvas.current.getContext('2d');
    ctx.clearRect(0,0, this.canvas.current.width, this.canvas.current.height);
    this.setState({rotation: 0});
  }


  render(){
    return <div className = "loader">
            <canvas ref = {this.canvas} height = {this.state.height} width  = {this.state.width}> ></canvas>
          </div>
  }
}

export default Loader;
