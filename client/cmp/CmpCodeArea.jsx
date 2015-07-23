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
      return <CmpInput {...this.props}>
        <textarea rows="6" valueLink={this.linkState('value')}></textarea>
      </CmpInput>;
  }
});
