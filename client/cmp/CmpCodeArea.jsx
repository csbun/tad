CmpCodeArea = React.createClass({
  getValue() {
    return this.refs.textarea.getDOMNode().value;
  },
  render() {
      let { className, label, ...rest } = this.props;
      return <CmpInput className={className} label={label}>
        <textarea rows="6" {...rest} ref="textarea"></textarea>
      </CmpInput>;
  }
});
