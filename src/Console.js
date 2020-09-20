import React from "react";

import "./Console.css";


class Console extends React.Component{
  constructor(props){
    super(props)
    console.log(this.props.height, this.props.width)
    this.state = {
      history: "Game History",
    };
    this.infoStyle = {
      color: "black",
      height: window.innerHeight*0.9,
      width: this.props.width,
    }
  }

  componentDidUpdate(){

  }

  pushConsole(infoString){
    var history = this.state.history;
    history += infoString;
    this.setState({history: history});
  }


  render(){
    // let newText = this.state.history.split('\n').map((item, i) => {
    //   return <p className = "move" ekey={i}>{item}</p>;
    // });

    return <div className = "consoleContainer">
              <textarea id = "consoleInfo"
              className = "consoleInfo" style = {this.infoStyle} value = {this.state.history} readOnly>  </textarea>
          </div>
  }
}

export default Console;
