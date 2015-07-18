
TadRuleList = React.createClass({
  render() {
    return <div>
      { (this.props.rules || []).map(r =>
        <p {...r}></p>
      ) }
    </div>;
  }
});
