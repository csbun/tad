var url = Npm.require('url');

var findTadParam = function (tadParams, param) {
  for (var i = 0; i < tadParams.length; i++) {
    if (tadParams[i].param === param) {
      return tadParams[i];
    }
  }
};

var checkRuleParam = function (ruleParam, query, tadParams) {
  var param = ruleParam.param;
  var ruleVal = ruleParam.val;
  var queryVal = query[param];
  if (findTadParam(tadParams, param).type === 'number') {
    ruleVal = parseInt(ruleVal);
    queryVal = parseInt(queryVal);
  }
  switch (ruleParam.oper) {
    case '<':
      return queryVal < ruleVal;
    case '=':
      return queryVal === ruleVal;
    case '>':
      return queryVal > ruleVal;
    default:
      return false;
  }
};

WebApp.connectHandlers.use('/mock', function(req, res) {
  var stateCode = 404;
  var contentType = 'text/html';

  var output;

  var matches = req.url.match(/^\/(\w+)\/([^\?]+)\??/);
  if (matches && matches.length) {
    var projectId = matches[1];
    var path = '/' + matches[2];
    var tad = CollectionTads.findOne({
      projectId: projectId,
      path: path
    });
    if (tad) {
      var query = url.parse(req.url, true).query;
      var data = Mock.mock(EJSON.parse(tad.res));
      // check rules
      var rules = CollectionRules.find({
        tadId: tad._id,
      }).fetch();
      rules.forEach(function (r) {
        var matchRule = true;
        var i = 0, rp;
        for (; i < (r.params || []).length; i++) {
          rp = r.params[i];
          if (!checkRuleParam(rp, query, tad.params)) {
            matchRule = false;
            break;
          }
        }
        if (matchRule) {
          _.extend(data, EJSON.parse(r.res));
        }
      });
      // output
      stateCode = 200;
      contentType = 'application/json';
      output = EJSON.stringify(data);
    } else {
      output = '<h1>404</h1><p>url: ' + req.url +
        '</p><p>projectId: ' + projectId +
        '</p><p>path: ' + path + '</p>';
    }
  } else {
    output = '<h1>404</h1><p>url: ' + req.url + '</p>';
  }

  res.writeHead(stateCode, {
    'Content-Type': contentType
  });
  res.end(output, 'utf-8');
});
