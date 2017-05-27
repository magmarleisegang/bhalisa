var Event = require('../models/event');

module.exports = {
    showEvents: showEvents,
    viewEvent: viewEvent,
    seedEvents: seedEvents
};

function showEvents(req, resp) {
    console.log("find all events");
    var promise = new Promise(function(fulfill, reject) {
        Event.find({}, (err, events) => {
            console.log("Event.find returned")
            if (err) {
                reject(err);
            } else {
                fulfill(events);
            }
        })
    });

    promise.then((events) => {
        console.log("promise.then")
        resp.render('pages/events', { events: events });
    }).catch((err) => {
        resp.status(404);
        resp.send('Events not found!');
    });
};

function viewEvent(req, resp) {
    var slug = req.params["slug"];
    var event = Event.findOne({ code: slug });
    //console.log(event);
    resp.render("pages/events/view", { event: event });
};

function seedEvents(req, resp) {
    var events = [
        { name: "event1", date: '2017/01/01', code: 'EV1' },
        { name: "event2", date: '2017/01/01', code: 'EV2' },
        { name: "event3", date: '2017/01/01', code: 'EV3' },
    ];
    console.log("try seed events");

    // Event.remove({},()=>{
    // console.log("cleared events");
    for (event of events) {
        var newEvent = new Event(event);
        console.log(newEvent);
        newEvent.save();
        console.log("save event: " + newEvent.name);
    }
    // });
    resp.send("done at " + (new Date()).toString());
};