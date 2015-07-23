CmpInput = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  propTypes: {
    className: React.PropTypes.string,
    label: React.PropTypes.string,
    value: React.PropTypes.string
  },
  getInitialState() {
    return {
      value: this.props.value
    };
  },
  getValue() {
    return this.state.value;
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    });
  },
  render() {
    let { className, label, value, ...rest } = this.props; // ...rest should not contains `value`
    return <div className={(className || '') + ' cmp-input'}>
      { label ? <label>{label}</label> : null }
      { this.props.children || <input {...rest} valueLink={this.linkState('value')} /> }
    </div>;
  }
});
