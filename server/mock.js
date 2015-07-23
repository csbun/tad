WebApp.connectHandlers.use('/mock', function(req, res) {
  console.log(req.url);

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
      data = Mock.mock(EJSON.parse(tad.res));
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
