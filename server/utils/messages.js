var moment = require('jalali-moment');
var generateMessages = (from,text)=>{
return {
    from,
    text,
    //createat : new Date().getTime()
    createat :moment().locale('fa').valueOf()
    
};
};

var generateLocationMessages = (from,latitude,longitude)=>{
 return{
    from,
    url : `https://www.google.com/maps?q=${latitude},${longitude}`,
    //createat : new Date().getTime()
    createat :moment().locale('fa').valueOf()
 };
};
module.exports = {
    generateMessages,
    generateLocationMessages
};