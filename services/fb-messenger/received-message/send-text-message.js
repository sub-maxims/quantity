var callSendAPI = require('../call-send-api');

module.exports = (recipientId, messageText) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };
  callSendAPI(messageData);
}
