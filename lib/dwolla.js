(function() {
  "use strict";

  var util = require('util'),
      querystring = require('querystring');

  function Dwolla(config) {
    this.config = config;
    this.authenticate = function() {
      return util.format('%s/oauth/v2/authenticate?%s',
        config['dwolla']['uri'],
        querystring.stringify({
          client_id: config['dwolla']['key'],
          response_type: "code",
          redirect_uri: config['dwolla']['redirect'],
          scope: config['dwolla']['scope'].join('|')
        })
      );
    }
  }

  if (typeof window !== 'undefined') {
    window.Dwolla = (typeof window.Dwolla === 'undefined' ? {} : window.Dwolla);
    window.Dwolla = Dwolla;
  }
  else {
    exports = module.exports = Dwolla;
  }
})();
