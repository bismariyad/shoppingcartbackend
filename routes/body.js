var express = require('express');
var router = express.Router();

const fs = require("fs");
const path = require("path");


const users = require("../bin/database/user.json");
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
 let userverification = validateusername(username);
 if(userverification == true){
    let userpasswordverification = validatepassword(password);
    if(userpasswordverification == true){
        let usertypeverification = validateusertype(usertype);
        if(usertypeverification == true){
    
 
    users.push(newuser);
    writedata (users);
    
    return res.status(200).send(newuser);
    
        }
        else{
            return res.status(404).send('usertype not valid');
        }}
        else{
            return res.status(404).send('password not valid')
        }
    } else{
        return res.status(404).send('username not valid');
    }

} catch (error){
    return res.send(error.toString());
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
        const id=users.find((u) => u.userid === parseInt(req.params.id));
    const index = users.findIndex((b) => b.userId === parseInt(req.params.id));
    if (index>0) {
        users.splice(index,2);
      }
      writedata(users);
      return res.status(200).send(id)
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

});
}
function validateusername(string){
    const pattern = /^[A-Za-z0-9_]{3,25}$/;
    return pattern.test(string);

}
function validatepassword(password){
    const pattern = /^[^\s]{8,25}$/;
    return pattern.test(password);
}
function validateusertype(usertype){
    const userType ={
        customer:"customer",
        seller:"seller",
        admin:"admin"
    }
    if(Object.values(userType).includes(usertype)){
        return true;
    }
    else{
        return false;
    }}

module.exports = router;

