const { headers } = require('../cors');

exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    headers,
    body: 'Your functions are working'
  });
}