
module.exports = class usermodel{

constructor(object){
    this.username = object.username;
    this.password = object.password;
    this.usertype = object.usertype;
    this.address = new address(object.address);

}
validator(){
    const usernamepattern =/^[A-Za-z0-9_]{3,25}$/;
    const passwordpattern =/^[^\s]{8,25}$/;
    const userTypepattern =["admin","customer","seller"];
    const validation ={
        message:[],
        status:true
    }
    console.log(usernamepattern.test(this.username));
    if(!usernamepattern.test(this.username)){
        validation.message.push("invalid username");
        validation.status = false;
    }
    if(!passwordpattern.test(this.password)){
        validation.message.push("invalid password");
        validation.status = false;
    }
    if(!userTypepattern.includes(this.usertype)){
        validation.message.push("invalid usertype");
        validation.status = false;
    }

    return validation;
}
}
class address{
    constructor(object){
        this.addressLineOne = object.addressLineOne;
        this.city = object.city;
        this.pincode = object.pincode;
    }
    validation(){
    const addressLineOnepattern =/^[A-Za_z_]{2,25}$/;
    const citypattern =/^[a-z]{3,15}$/;
    const pincodepattern =/^[1-9]{1}[0-9]{5}$/;
    const validation ={
        message:[],
        status:true
    }
    if(!addressLineOnepattern.test(this.addressLineOne)){
        validation.message.push("invalid addressLineOne");
        validation.status = false;
    }
    if(!citypattern.test(this.city)){
        validation.message.push("city not valid ");
        validation.status = false;
    }
    if(!pincodepattern.test(this.pincode)){
        validation.message.push("invalid pincode");
        validation.status = false;
    }

   return validation 
}}
