var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var rsvpSchema = new Schema({}, { strict: false })

module.exports = {
    showRsvp: showRsvp,
    captureRsvp:captureRsvp
};



function showRsvp (req, resp) {	
    var eventCode = req.params["code"];
    console.log("redirecting to: " + "pages/rsvp/"+eventCode);
    resp.render("pages/rsvp/"+eventCode, {rsvp: {}});
};
function captureRsvp(req,resp){
    var eventCode = req.params["code"];
	var rsvp = req.body;
	rsvp.event =  req.params["code"];
	SaveRsvp(rsvp);
    resp.render("pages/rsvp/"+eventCode, {rsvp: rsvp});
}

function SaveRsvp(_rsvp){
	var RsvpModel = mongoose.model(_rsvp.event, rsvpSchema);
	var dbRsvp = new RsvpModel(_rsvp);
	console.log(dbRsvp);
	dbRsvp.save();
    console.log("save rsvp: "+dbRsvp._id);
}