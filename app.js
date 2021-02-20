global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express")
const cors = require("cors")
const server = express()
const authController = require("./controllers/auth-controller");
const vacationsController = require("./controllers/vacations-controller");
const followsController = require("./controllers/follows-controller");
const fileUpload = require("express-fileupload");
const socketHelper = require("./helpers/socket-helper");
const path = require("path");

server.use(cors())
server.use(express.json())
server.use(fileUpload());
server.use(express.static(path.join(__dirname, "./frontend")));
server.use("/api/auth", authController);
server.use("/api/vacations", vacationsController);
server.use("/api/follows", followsController);
server.use("*", (request, response) => {
    //response.status(404).send("Route not found");
    response.sendFile(path.join(__dirname, "./frontend/index.html"))
});


const port = process.env.PORT || 3001
const expressListener = server.listen(port, () => console.log("Listening..."));
socketHelper.init(expressListener);




