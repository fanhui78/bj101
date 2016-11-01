const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const UserSchema=new Schema({
    mobile:{type:String,default:''},
    hashed_password:{type:String,default:''},
    salt:{type:String,default:''},
    username:{type:String,default:''},
    address:{type:String,default:''}

});
UserSchema.methods = {

};
mongoose.model('User',UserSchema);
