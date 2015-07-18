var { Link, Route, DefaultRoute, RouteHandler } = ReactRouter;

var TapidApp = React.createClass({
  render: function () {
    return (
      <div>
        <nav>
          <Link to="home">Home</Link>
        </nav>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route name="home" path="/" handler={TapidApp}>
    <Route name="project" path="project/:projectId" handler={Project}/>
    <Route name="tad" path="project/:projectId/:tadId" handler={Project}/>
    <DefaultRoute handler={ProjectList}/>
  </Route>
);


$(document).ready(function () {
  ReactRouter.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
  });
});
