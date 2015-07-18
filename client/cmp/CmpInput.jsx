CmpInput = React.createClass({
  getValue() {
    return this.refs.input.getDOMNode().value;
  },
  render() {
    return <input {...this.props} ref="input" />;
  }
});
