TadParamList = React.createClass({
  render() {
    return <div>
      { (this.props.params || []).map(p =>
        <p {...p}></p>
      ) }
    </div>;
  }
});
