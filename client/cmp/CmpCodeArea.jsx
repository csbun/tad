CmpCodeArea = React.createClass({
  getValue() {
    return this.refs.textarea.getDOMNode().value;
  },
  render() {
    return <textarea rows="6" {...this.props} ref="textarea"></textarea>;
  }
});
