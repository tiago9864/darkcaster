
var mySecretPhrase = process.env.PASS || require('../config.js').secretPassphrase;

function authorize(request, response, next){
  var secretPassphrase = request.headers.secret;
  if(!secretPassphrase || secretPassphrase !== mySecretPhrase){
    response.status(403).json({
      msg: 'You are not authorized'
    });
  } else {
    next();
  }
}

module.exports = authorize;
