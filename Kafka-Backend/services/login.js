
function handle_request(msg, callback) {
  var res = {};

  callback(null,"hello from handshake!")
};

exports.handle_request = handle_request;