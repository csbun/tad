var { Route, DefaultRoute, RouteHandler } = ReactRouter;

var TapidApp = React.createClass({
  render: function () {
    return (
      <div>
        <nav>
          <a href="#/">ProjectList</a> |
          <a href="#/tapids">TapiList</a>
        </nav>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={TapidApp}>
    <Route name="tapids" handler={TapiList}/>
    <DefaultRoute handler={ProjectList}/>
  </Route>
);


$(document).ready(function () {
  ReactRouter.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
  });
});
