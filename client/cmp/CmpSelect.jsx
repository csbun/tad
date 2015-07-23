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
        <select>
          { this.props.items.map(i =>
            <option value={i.val}>{i.display}</option>
          ) }
        </select>
      </CmpInput>;
  }
});
