var request = require('request');

module.exports = (messageData) => {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: 'EAAYt1Xh9XZCwBAEsjzZAtjsZCPKbxnIivHiufIcL83amZAUZBoO0KTiMX9YkVLTSg8YrbMIjikP9IpGQy9SoaPUo9k49SgR4WTx4MVsJQbvrInyxYg7lWZB5xPwYSQkNWCTEUdB5cbuxKzZAIPVLnaF3W0ODd3lmdqREnQKr0XLhwZDZD' },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });  
}