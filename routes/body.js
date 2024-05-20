var express = require('express');
var router = express.Router();
const users = require("../bin/database/user.json");

const fs = require("fs");
const path = require("path");

const datafile = path.join(__dirname,"../bin/database/user.json")

router.post("/user",(req,res) => {
    try{
    
    const { username, password,address,usertype} = req.body;
    const newuser = {
        "userId" : users.length+1,
        "username" : username,
        "password" : password,
        "address" : address,
        "usertype" : usertype,
 };
 
    users.push(newuser);
    writedata (users);
    return res.status(200).send(newuser);
    


} catch (error){
    return res.send(error);
}
});                                                            



router.get("/user/:id",(req,res) => {
    try{
    const id = users.find((s) => s.userId === parseInt(req.params.id))
    if(!id){
        return res.status(200).send("id not matching");
    }
    return res.status(200).send(id);
}catch (error){
    return res.send(error.toString());
}

});

router.put("/user/:id",(req,res) => {
    try{
    const { username,password,address,usertype} = req.body;
    const id = users.find((s) => s.userId === parseInt(req.params.id))
    id.username = username;
    id.password = password;
    id.address = address;
    id.usertype = usertype;
    writedata (users);
    return res.status(200).send(id);
    
    }catch(error){
        return res.send(error);
    }
});
 

router.get("/user",(req,res) => {
    try{

    const {username, password,address} = req.body;

return res.status(200).send(users);
    }catch(error){
        return res.send(error.toString());
    }
});

router.delete("/user/:id", (req, res) => {
    try{
    const index = users.findIndex((b) => b.userId === parseInt(req.params.id));
    if (index>0) {
        users.splice(index,2);
      }
      writedata(users);
      return res.status(200).send(users)
    }catch(error){
        return res.send(error);
    }
    
});


function writedata(users){
const jsonstring = JSON.stringify(users,null,2)
fs.writeFile(datafile,jsonstring,(err) => 
{
    if(err)
        {
            console.log(err.message);
        }
        else{
            console.log("file write successfully");
        }

}

);
}
module.exports = router;


