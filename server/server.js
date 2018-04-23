const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const publicpath = path.join(__dirname,'../public');
const {generateMessages,generateLocationMessages} = require('./utils/messages');
const {isRealString} = require('./utils/validation');
const mongoose = require('mongoose');
const port = process.env.PORT || 2800;
var app = express();
var server = http.createServer(app);
var io=socketIO(server);
const {Users} = require('./utils/users');
var moment = require('jalali-moment');

app.use(express.static(publicpath));
 
var users = new Users();

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGOLAB_URI ||  process.env.MONGOHQ_URL || 'mongodb://localhost:27017/chatIIV');

var chatSchema = mongoose.Schema({
 nik : {type:String},
 msg : {type:String},
 createat: {type:String}
});

var chatm = mongoose.model('messagesm',chatSchema);


io.on('connection',(connectt)=>{
console.log('one user connect');



// baraye join
connectt.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
        return callback('name or roon required');
    }
    connectt.join(params.room);
    users.removeUser(connectt.id);
    users.addUser(connectt.id,params.name,params.room);

    


    io.to(params.room).emit('updateUserList',users.getUserList(params.room));
    connectt.emit('payamO',generateMessages('Modire khafan','baba khosh amadi'));
    connectt.broadcast.to(params.room).emit('payamO',generateMessages('Modire khafan',`${params.name} joid to chat`));
        

     //peyda kardan massagehaye ghadimi
    chatm.find({},(err,docs)=>{
        if(err){
          throw err;
        } 
        
        connectt.emit('oldmsg',docs);
        console.log(docs);
        
      });

callback();
});





connectt.on('createMessB',(amghezi,callback)=>{
    var user = users.getUser(connectt.id);
   if(user && isRealString(amghezi.text)){
          
    //zakhire chat dar database
       var newChat = new chatm({nik: user.name,msg:amghezi.text,createat:moment().locale('fa').format("jYYYY/jMM/jD - h:mm a")});
       newChat.save((err)=>{
           if(err){
               throw err;
           }
       });

    io.to(user.room).emit('newMessB',generateMessages(user.name,amghezi.text));
   }
  
  /*io.emit('newMessB',{
      from : amghezi.from,
      text:  amghezi.text,
      createat : new Date().getTime()
  });*/

  
  callback();
});

connectt.on('createLocation',(latlong)=>{
io.emit('newLocation',generateLocationMessages('location :',latlong.latitude,latlong.longitude));
});

connectt.on('disconnect',()=>{
    var userb = users.removeUser(connectt.id);
    //update kardane list bad az khooroje user
    io.to(userb.room).emit('updateUserList',users.getUserList(userb.room));
    //yek payam mifreste ke user kharej shod
    io.to(userb.room).emit('payamO',generateMessages('Admin',`${userb.name} left the chat`));
});

});

console.log (publicpath);

server.listen(port,()=>{
 console.log(`server run on port ${port}`);
});