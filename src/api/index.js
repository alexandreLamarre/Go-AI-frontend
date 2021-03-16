import io from "socket.io-client";

const BACKEND_URL = "ws://localhost:5000"


let connect = (path, params) => {
    console.log("Connecting to server")
    var socket = io.connect(BACKEND_URL);
    socket.on("connect", () => {
        params.connectCb();
        socket.emit("connected", {data:{username:params.username, gameId: params.gameId}})
    })

    socket.on("Message", data => {
        console.log(data)
        params.msgCb(data)
    });
    return socket
}

export {connect}