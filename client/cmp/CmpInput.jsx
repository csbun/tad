CmpInput = React.createClass({
  getValue() {
    return this.refs.input.getDOMNode().value;
  },
  // componentWillReceiveProps(nextProps) {
  //   reset input when defaultValue reset
  // },
  render() {
    let { className, label, ...rest } = this.props;
    return <div className={className || '' + ' cmp-input'}>
      { label ? <label>{label}</label> : null }
      { this.props.children || <input {...rest} ref="input" /> }
    </div>;
  }
});
