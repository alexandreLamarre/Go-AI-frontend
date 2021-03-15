import io from "socket.io-client";

const BACKEND_URL = "ws://localhost:5000"


let connect = (path) => {
    console.log("Connecting to server")
    var socket = io.connect(BACKEND_URL + "/" + path);
    socket.on("connection", console.log("Connected to server"))
}

export {connect}