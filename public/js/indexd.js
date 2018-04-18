var socket = io();
    socket.on("connect",function (cone){
       console.log('connect to server hamid index');
    
      /* socket.emit('createEmail',{
           to:'ohh@javad.com',
           text : 'solaris bashavad ah'
       });

       socket.emit('createMessage',{
        to:'javad',
        text:'ohhhhh'
       });*/    
       
    });

   /*socket.on('newEmail',function(hasan){
     console.log('new email',hasan);
   }); 

   socket.on('newMessage',function(sal){
      console.log('new masssage',sal);
   });*/

   // for broadcasting
   socket.on('newMessB',function(eee){
    var formattedTime = moment(eee.createat).locale('fa').format("jYYYY/jMM/jD - h:mm a");
     //console.log('brodcast',eee);
     var li=jQuery('<li></li>');
    
     li.text(`${eee.from} ${formattedTime} : ${eee.text}`);
     jQuery('#messol').append(li);
   });

   socket.on('payamO',function(one){
     console.log('payam',one);
     var li = jQuery('<li></li>');
     li.text(`${one.from} : ${one.text}`);
     jQuery('#messol').append(li);
   });

   jQuery('#message-form').on('submit',function(wew){
     wew.preventDefault();
   socket.emit('createMessB',{
       from : 'User',
       text : jQuery('[name=message]').val()
   },function(){
       jQuery('[name=message]').val('');
   }); 
});


var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
if (!navigator.geolocation){
     return alert('your browser not support geo location');
}
locationButton.attr('disabled','disabled').text('sending location...');
navigator.geolocation.getCurrentPosition(function(posi){
locationButton.removeAttr('disabled').text('send location');
    socket.emit('createLocation',{
 latitude : posi.coords.latitude,
 longitude : posi.coords.longitude
});
},function(){
    locationButton.removeAttr('disabled').text('send location');
    alert('can not fetch');
});
});





socket.on('newLocation',function(locaO){
    var loctime = moment(locaO.createat).format("jYYYY/jMM/jD");
var li = jQuery('<li></li>');
var a = jQuery('<a target="_blank">My Location</a>')
li.text(`${loctime} -- ${locaO.from} : `);
a.attr('href',`${locaO.url}`);
li.append(a);
jQuery('#messol').append(li);
});

    socket.on('disconnect',function (){
       console.log('disconnect to server hamid index');
    });