
function handle_request(msg, callback) {
  var res = {};

  callback(null,"hello from handshake 2!")
};

exports.handle_request = handle_request;