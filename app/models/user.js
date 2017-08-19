var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    password: String,
    admin: Boolean,    
});

//create model
var userModel = mongoose.model("User", userSchema);

//export
module.exports=userModel;