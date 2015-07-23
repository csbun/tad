CmpSelect = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  propTypes: {
    items: React.PropTypes.array.isRequired
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
      return <CmpInput {...this.props}>
        <select></select>
      </CmpInput>;
  }
});
