var mongo = require('mongodb');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var rsvpSchema = new Schema({}, { strict: false })

module.exports = {
    showRsvp: showRsvp,
    captureRsvp: captureRsvp
};

function showRsvp(req, resp) {
    var eventCode = req.params["code"];
    var rsvpCode = req.query.id;
    var _rsvp = {};
    console.log("eventCode: " + eventCode + ", id: " + rsvpCode);

    if (rsvpCode != undefined) {
        var _rsvpPromise = LoadRsvp(eventCode, rsvpCode);
        _rsvpPromise.then((_rsvp) => {
            console.log("found rsvp")
            resp.render("pages/rsvp/" + eventCode, { rsvp: _rsvp });
        })
    } else {
        console.log("redirecting to: " + "pages/rsvp/" + eventCode);
        resp.render("pages/rsvp/" + eventCode, { rsvp: _rsvp });
    }
};

function captureRsvp(req, resp) {
    var eventCode = req.params["code"];
    var rsvp = req.body;
    rsvp.event = req.params["code"];
    SaveRsvp(rsvp);
    resp.render("pages/rsvp/" + eventCode, { rsvp: rsvp });
}

function SaveRsvp(_rsvp) {
    var RsvpModel = mongoose.model(_rsvp.event, rsvpSchema);
    var dbRsvp = new RsvpModel(_rsvp);
    console.log(dbRsvp);
    dbRsvp.save();
    console.log("save rsvp: " + dbRsvp._id);
}

function ConnectionPromise() {
    return new Promise(function(fulfill, reject) {
        mongo.MongoClient.connect(process.env.DB_URI, function(err, db) {
            if (err) reject(err);

            console.log("MongoClient Connected");
            fulfill(db);
        });
    });
}


function LoadRsvp(_eventCode, _rsvpCode) {
    return new Promise(function(fulfill, reject) {
        ConnectionPromise().then((db) => {
            var collection = db.collection(_eventCode);
            collection.findOne({ "_id": new mongo.ObjectId(_rsvpCode) }, function(err, rsvp) {
                if (err) reject(err);

                console.log("returning from mongoclient")
                console.log(rsvp);
                fulfill(rsvp);
            });
        })
    });
}