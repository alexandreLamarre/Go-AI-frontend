import React, {useState} from 'react';
import './App.css';
import BoardCanvas from "./components/BoardCanvas";
import GoNavBar from "./components/GoNavBar";



function App() {

    const gameRef = React.createRef();
    return (
      <div className="App" style = {{height:'100%'}}>
            <GoNavBar
                gameRef = {gameRef}/>
            <BoardCanvas
                ref = {gameRef}/>
      </div>
    );
}

export default App;
