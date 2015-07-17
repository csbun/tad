WebApp.connectHandlers.use("/mock", function(req, res, next) {
  console.log(req.url);
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  var data = Projects.findOne();
  var mockData = Mock.mock(data);
  res.end(EJSON.stringify(mockData), 'utf-8');
});
