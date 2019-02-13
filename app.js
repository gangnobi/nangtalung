var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var express = require("express");
const path = require("path");

const Character = (id, pic, sceneSelected, x = 0, y = 0) => {
  return { x: x, y: y, id: id, pic: pic, sceneSelected: sceneSelected };
};

app.use(express.static(path.join(__dirname, "public")));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

const currentCharacter = {};

io.on("connection", function (socket) {
  let _id;
  console.log("character connect");

  socket.emit("character stage", currentCharacter);
  socket.on("character stage", function (msg) {
    _id = msg.id;
    if (currentCharacter[msg.id] == undefined) {
      currentCharacter[msg.id] = Character(msg.id, msg.pic, msg.sceneSelected, msg.x, msg.y);
    } else {
      currentCharacter[msg.id].id = msg.id;
      currentCharacter[msg.id].pic = msg.pic;
      currentCharacter[msg.id].x = msg.x;
      currentCharacter[msg.id].y = msg.y;
      currentCharacter[msg.id].sceneSelected = msg.sceneSelected;
    }
    console.log(msg);

    io.emit("character stage", currentCharacter);
  });

  socket.on('character delete', function (charId) {
    delete currentCharacter[charId];
    io.emit("character delete", charId);
  })

  socket.on('disconnect', function () {
    delete currentCharacter[_id];
    console.log(_id + ' disconnected');
    io.emit("character delete", _id);
  });
});

http.listen(8080, function () {
  console.log("listening on *:8080");
});
