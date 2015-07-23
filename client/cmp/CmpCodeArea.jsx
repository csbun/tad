CmpCodeArea = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  propTypes: {
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
    let { className, label, value, ...rest } = this.props;
    return <CmpInput className={className} label={label} value={value}>
      <textarea rows="6" {...rest} valueLink={this.linkState('value')}></textarea>
    </CmpInput>;
  }
});
