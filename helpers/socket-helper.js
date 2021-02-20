const io = require("socket.io");

let socketServer;

function init(expressListener) {
    socketServer = io(expressListener, { cors: { origin: "http://localhost:3000" } });
    socketServer.sockets.on("connection", socket => {
        console.log("Client Connected. Total clients: ", socketServer.engine.clientsCount);
        socket.on("disconnect", () => console.log("Client Disconnected. Total clients: ", socketServer.engine.clientsCount - 1));
    });
}

function VacationAdded(addedVacation) {
    socketServer.sockets.emit("msg-from-server-addedVacation", addedVacation);
}

function VacationUpdated(updatedVacation) {
    socketServer.sockets.emit("msg-from-server-updatedVacation", updatedVacation);
}
function VacationDeleted(id) {
    socketServer.sockets.emit("msg-from-server-deletedVacation", id);
}

module.exports = {
    init,
    VacationAdded,
    VacationUpdated,
    VacationDeleted
};