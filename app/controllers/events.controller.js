var Event = require('../models/event');
console.log(Event);
module.exports = {
    showEvents: showEvents,
    viewEvent: viewEvent,
    seedEvents: seedEvents
};

function showEvents (req, resp) {
    console.log("find all events");
    Event.find({}, (err, events) => {
        if (err) {
          resp.status(404);
          resp.send('Events not found!');
        }
        console.log(events);
        // return a view with data
        resp.render('pages/events', { events: events });
    });
    // var events = [
    //     { name: "event1", date: new Date(), code: 'EV1' },
    //     { name: "event2", date: new Date(), code: 'EV2' },
    //     { name: "event3", date: new Date(), code: 'EV3' },
    // ];
    // resp.render("pages/events", { events: events });
};

function viewEvent (req, resp) {	
    var slug = req.params["slug"];
    var event = Event.findOne({code:slug});
    resp.render("pages/events/view", { event: event });
};

function seedEvents (req, resp) {
    var events = [
        { name: "event1", date: '2017/01/01', code: 'EV1' },
        { name: "event2", date: '2017/01/01', code: 'EV2' },
        { name: "event3", date: '2017/01/01', code: 'EV3' },
    ];
    console.log("try seed events");

    // Event.remove({},()=>{
        // console.log("cleared events");
        for (event of events){
            var newEvent = new Event(event);
            console.log(newEvent);
            newEvent.save();
            console.log("save event: "+newEvent.name);
        }
    // });
    resp.send("done at " + (new Date()).toString());
};