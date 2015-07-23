TadRuleList = React.createClass({
  propTypes: {
    rules: React.PropTypes.array
  },
  render() {
    return <div>
      { (this.props.rules || []).map(r =>
        <p {...r}></p>
      ) }
    </div>;
  }
});
