var express = require('express'), 
    router = express.Router();
var fbMessenger = require('./index');

router.get('/webhook', function(req, res) {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === 'my-secret') {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
      console.error("Failed validation. Make sure the validation tokens match.");
      res.sendStatus(403);          
    }  
});

router.post('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object == 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      // Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {
        if (messagingEvent.optin) {
          // receivedAuthentication(messagingEvent);
        } else if (messagingEvent.message) {
          fbMessenger.receivedMessage(messagingEvent);
        } else if (messagingEvent.delivery) {
          fbMessenger.receivedDeliveryConfirmation(messagingEvent);
        } else if (messagingEvent.postback) {
          receivedPostback(messagingEvent);
        } else {
          console.log("Webhook received unknown messagingEvent: ", messagingEvent);
        }
      });
    });
    res.sendStatus(200);
  }
});

module.exports = router;