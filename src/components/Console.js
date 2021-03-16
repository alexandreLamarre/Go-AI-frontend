import React from "react";

import "./Console.css";


const Console = props => {

    const messages = props.messages.map((msg, index) =>
      <div
          style = {{maxWidth: "200px", fontWeight: msg.user?"normal": "bold"}}
          key = {index}>
          <br/>
          {msg.user?msg.user + " : ":""} {msg.data}
          <br/>
      </div>
    )

    return <div className = "consoleInfo"
            style = {{height: props.height, maxHeight: props.height,  overflowY: "auto"}}>
             <b> Game History/ Messages</b>
              {messages}
          </div>

}

export default Console;
