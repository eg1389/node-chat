var socket = io();

//auto scroll

function scrollToBottom () {
    // Selectors
    var messages = jQuery('#messol');
    //select last list item
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
  
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
    }
  }






    socket.on("connect",function (cone){

        var params = jQuery.deparam(window.location.search);
            socket.emit('join',params,function(err){
                if (err){
                    alert(err);
                   window.location.href = '/';
                }else{

                  console.log('no error');
                }

            })

           //old messages
     socket.on('oldmsg',function(docs){
        for(var i=0; i<docs.length; i++){
           displayMsg(docs[i]);
        }
    });

       
    });

    socket.on('disconnect',function (){
        console.log('disconnect to server hamid index');
     });

     socket.on('updateUserList', function(users){
       var ol=jQuery('<ol></ol>');
       
       users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
       });
       
       jQuery('#users').html(ol);
     });



 

      function displayMsg(data){
        //var formattedTime = moment(data.createat).locale('fa').format("jYYYY/jMM/jD - h:mm a");
        var templateNM = jQuery('#message-template').html();
        var html = Mustache.render(templateNM,{
            text:data.msg,
            from : data.nik,
            createat :data.createat
        });
        jQuery('#messol').append(html);
        scrollToBottom();
      };

   // for broadcasting
   socket.on('newMessB',function(eee){
       var formattedTime = moment(eee.createat).locale('fa').format("jYYYY/jMM/jD - h:mm a");
       var templateNM = jQuery('#message-template').html();
       var html = Mustache.render(templateNM,{
           text:eee.text,
           from : eee.from,
           createat : formattedTime
       });
       jQuery('#messol').append(html);
       scrollToBottom();
    
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
 var loctime = moment(locaO.createat).locale('fa').format("jYYYY/jMM/jD");
 var templateLO = jQuery('#location-template').html();
 var htmlLO = Mustache.render(templateLO,{
     from:locaO.from,
     url:locaO.url,
     createat:loctime
 });
 jQuery('#messol').append(htmlLO);
 scrollToBottom();
 

 
    
});

    