var express = require('express'),
    path = require('path'),
    mainController = require('./controllers/main.controller'),
    eventController =require('./controllers/events.controller'),
    rsvpController =require('./controllers/rsvp.controller');

var router = express.Router();
module.exports = router;

router.get("/", mainController.getHome);
router.get("/events", eventController.showEvents);
router.get("/events/seed", eventController.seedEvents);
router.get("/events/:slug", eventController.viewEvent);

router.get("/rsvp/:code", rsvpController.showRsvp);
router.post("/rsvp/:code", rsvpController.captureRsvp);


router.get("/about", function (req, resp) {
    var users = [
        { name: 'Magi', email: 'magi@bhalisa.co.za', avatar: 'http://placekitten.com/300/400' },
        { name: 'Sven', email: 'sven@bhalisa.co.za', avatar: 'http://placekitten.com/300/500' },
        { name: 'argh', email: 'argh@bhalisa.co.za', avatar: 'http://placekitten.com/300/600' },
    ];

    resp.render("pages/about", { users: users });

});
router.get("/contact", function (req, resp) {
    resp.render("pages/contact");
});
router.post("/contact", function (req, resp) {
    console.log(req.body.message);
    resp.send("We've got you, " + req.body.name);
});
