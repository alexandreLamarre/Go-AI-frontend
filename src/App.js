import React from 'react';
import './App.css';
import BoardCanvas from "./BoardCanvas";
import GoNavBar from "./GoNavBar";
import PubNub from "pubnub";

class App extends React.Component {
  constructor(props){
    super(props)
    this.pubnub = new PubNub({
      publishKey: "pub-c-b7a55579-eb5b-4e59-af93-9763c95ab87b",
      subscribeKey: "sub-c-991bfd3c-ff3e-11ea-afa2-4287c4b9a283",
    })

  }

  render(){
    return (
      <div className="App" style = {{height:'100%'}}>
        <GoNavBar/>
        <BoardCanvas pubnub = {this.pubnub}/>
      </div>
    );
  }
}

export default App;
