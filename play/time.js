var moment = require('jalali-moment');
var mom = require('moment-jalali');
//var createat = 1234;
var date = moment();
var date2 = mom();
date.add(1,'years').subtract(5,'months');
//date.add(1,'months');
//console.log(date.format('jYYYY/jM/jD'));


//console.log(date.format('h:mm a'));

//var datee = date.locale('fa');
 //console.log(moment().valueOf());
//console.log(datee.format('h:mm A'));

//console.log(date2.format('jYYYY/jM/jD'));

console.log(date.add(1,'years').subtract(5,'months'));
