var socket = io();
    socket.on("connect",function (cone){
       console.log('connect to server hamid index');
    
       socket.emit('createEmail',{
           to:'ohh@javad.com',
           text : 'solaris bashavad ah'
       });

       socket.emit('createMessage',{
        to:'javad',
        text:'ohhhhh'
       });
    
       
       
    });

   socket.on('newEmail',function(hasan){
     console.log('new email',hasan);
   }); 

   socket.on('newMessage',function(sal){
      console.log('new masssage',sal);
   });

   // for broadcasting
   socket.on('newMessB',function(eee){
     console.log('brodcast',eee);
     var li=jQuery('<li></li>');
     li.text(`${eee.from} : ${eee.text}`);
     jQuery('#messol').append(li);
   });

   socket.on('payamO',function(one){
     console.log('payam',one);
     var li = jQuery('<li></li>');
     li.text(`${one.from} : ${one.text}`);
     jQuery('#moshakhas').append(li);
   });

   jQuery('#message-form').on('submit',function(wew){
     wew.preventDefault();
   

   socket.emit('createMessB',{
       from : 'User',
       text : jQuery('[name=message]').val()
   },function(){
       
   }); 
});


    socket.on('disconnect',function (){
       console.log('disconnect to server hamid index');
    });