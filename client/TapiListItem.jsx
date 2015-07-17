TapiListItem = React.createClass({
  render: function() {
    var { name, score, ...rest } = this.props;
    return <li {...rest}>
      <span className="name">{name}</span>
      <span className="score">{score}</span>
    </li>;
  }
});
