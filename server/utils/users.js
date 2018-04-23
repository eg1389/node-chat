
function Users()
{
    this.users=[];
}
Users.prototype.addUser=function(id,name,room)
{
    var user = {id,name,room};
    this.users.push(user);
    return user;
};

Users.prototype.removeUser=function(id)
{
var user = this.getUser(id); 
if (user){
this.users = this.users.filter((user)=>user.id !==id);
}
return user;    
};

Users.prototype.getUser=function(id)
{
return this.users.filter((user)=>user.id===id)[0]

};

Users.prototype.getUserList=function(room)
{
       var users = this.users.filter((user)=>user.room===room);
       
       var nameArray = users.map((user)=>user.name);
       
       return nameArray;
};

module.exports = {
    Users
};
