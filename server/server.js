const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const publicpath = path.join(__dirname,'../public');
const {generateMessages,generateLocationMessages} = require('./utils/messages');
const port = process.env.PORT || 2800;
var app = express();
var server = http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicpath));

io.on('connection',(connectt)=>{
console.log('one user connect');

//dar hengame vorrod be karbar payame khosh amad midahad
connectt.emit('payamO',generateMessages('Modire khafan','baba khosh amadi'));

//yek payam be hame dar room midahad ke user joind shod
connectt.broadcast.emit('payamO',{
    from : 'Modir',
    text : 'one user joid to chat'
});




connectt.emit('newEmail',{
    from : 'asghar@yahoo.com',
    text : 'hey man hamidam ahay',
    createat : 123

});

connectt.emit('newMessage',{
    from : 'hamid',
    text:'salama aleykon',
    createat : 123321
});

connectt.on('createEmail',(dada)=>{
    console.log(dada);
});

connectt.on('createMessage',(cme)=>{
  console.log('create mesage',cme);
});

connectt.on('createMessB',(amghezi,callback)=>{
  console.log(amghezi);
  /*io.emit('newMessB',{
      from : amghezi.from,
      text:  amghezi.text,
      createat : new Date().getTime()
  });*/

  io.emit('newMessB',generateMessages(amghezi.from,amghezi.text));

 /* connectt.broadcast.emit('newMessB',generateMessages(amghezi.from,amghezi.text));*/
  callback('from server hamid');
});

connectt.on('createLocation',(latlong)=>{
io.emit('newLocation',generateLocationMessages('location :',latlong.latitude,latlong.longitude));
});

connectt.on('disconnect',()=>{
 console.log('uses disconnect');
});

});

console.log (publicpath);

server.listen(port,()=>{
 console.log(`server run on port ${port}`);
});