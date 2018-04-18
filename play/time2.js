const moment = require('jalali-moment');

var date  = moment();

//console.log(date.add(5, "month"));

var bb = date.add(2, "month");

console.log(bb.format("jYYYY/jMM/jD"));

var cc = moment().locale('fa').valueOf();
console.log(moment(cc).format("h:mm jYYYY/jMM/jD"));