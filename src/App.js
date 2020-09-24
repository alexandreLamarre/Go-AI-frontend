import React from 'react';
import './App.css';
import BoardCanvas from "./BoardCanvas";
import GoNavBar from "./GoNavBar";


function App() {
  return (
    <div className="App" style = {{height:'100%'}}>
      <GoNavBar/>
      <BoardCanvas/>
    </div>
  );
}

export default App;
