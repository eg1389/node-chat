var generateMessages = (from,text)=>{
return {
    from,
    text,
    createat : new Date().getTime()
};
};

var generateLocationMessages = (from,latitude,longitude)=>{
 return{
    from,
    url : `https://www.google.com/maps?q=${latitude},${longitude}`,
    createat : new Date().getTime()
 };
};
module.exports = {
    generateMessages,
    generateLocationMessages
};