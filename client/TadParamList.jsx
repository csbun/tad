var TadParamListEditItem = React.createClass({
  getInitialState: function() {
    return Object.assign({key: ''}, this.props);
  },
  render() {
    return <div className="flex-wrap">
      <CmpInput ref="key" label="Param" defaultValue={this.state.key}></CmpInput>
      <CmpInput ref="type" label="Type" defaultValue={this.state.type}></CmpInput>
      <button className="btn-green" onClick={this._onSave}>Add</button>
    </div>;
  },
  _onSave() {
    var data = {};
    for (let ref of Object.keys(this.refs)) {
      if (this.refs[ref].getValue) {
        data[ref] = this.refs[ref].getValue();
      }
    }
    if (!data.key) {
      alert('key & tyoe should be seted!');
      return;
    } else {
      this.props.onSave(data, this.props);
      this.setState({
        key: ''
      });
    }
  }
});

TadParamList = React.createClass({
  getInitialState: function() {

    return {
      params: (this.props.params || []).concat()
    };
  },
  getValue() {
    return this.state.params;
  },
  render() {
    return <div>
      { this.state.params.map(p =>
        <p {...p}>{p.key} | {p.type}</p>
      ) }
      <TadParamListEditItem onSave={this._onAdd}></TadParamListEditItem>
    </div>;
  },
  _onSave(data) {
    console.log(data);
  },
  _onAdd(data) {
    for (let p of this.state.params) {
      if (data.key === p.key) {
        alert('same key: ' + data.key);
        return;
      }
    }
    var arr = this.state.params.concat(data);
    this.setState({
      params: arr
    });
  }
});
