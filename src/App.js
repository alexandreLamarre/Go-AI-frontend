import React, {useState} from 'react';
import './App.css';
import BoardCanvas from "./components/BoardCanvas";
import GoNavBar from "./components/GoNavBar";


function App() {


    return (
      <div className="App" style = {{height:'100%'}}>
        <GoNavBar/>
        <BoardCanvas/>
        <BoardCanvas id ="BC"/>
      </div>
    );
}

export default App;
