var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//create schema
var eventSchema = new Schema({
	name: String,
	code:{
		type:String,
		unique:true
	},
	date: Date
});

//create model
var eventModel = mongoose.model("Event", eventSchema);

//export
module.exports=eventModel;