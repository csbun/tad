let TadParamListEditItem = React.createClass({
  propTypes: {
    onSave: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return Object.assign({param: ''}, this.props);
  },
  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({param: ''}, nextProps));
  },
  render() {
    let btnClassName = this.props.param ? 'btn-blue' : 'btn-green';
    return <div className="flex-wrap">
      <CmpInput ref="param" label="Param" value={this.state.param}></CmpInput>
      <CmpInput ref="type" label="Type" value={this.state.type}></CmpInput>
      <button className={btnClassName} onClick={this._onSave}>✓</button>
    </div>;
  },
  _onSave() {
    let data = {};
    for (let ref of Object.keys(this.refs)) {
      if (this.refs[ref].getValue) {
        data[ref] = this.refs[ref].getValue();
      }
    }
    if (!data.param) {
      alert('param & type should be seted!');
      return;
    } else {
      this.props.onSave(data, this.props);
    }
  }
});

function copyArray(arr) {
  if (arr instanceof Array) {
    return arr.concat();
  } else {
    return [];
  }
}

TadParamList = React.createClass({
  propTypes: {
    params: React.PropTypes.array,
    onSave: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      params: copyArray(this.props.params)
    };
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      params: copyArray(nextProps.params)
    });
  },
  getValue() {
    return this.state.params;
  },
  render() {
    return <div>
      { this.state.params.map(p =>
        <TadParamListEditItem key={p.param} {...p} onSave={this._onSave}></TadParamListEditItem>
      ) }
      <TadParamListEditItem onSave={this._onAdd}></TadParamListEditItem>
    </div>;
  },
  _onSave(data, oldData) {
    for (let p of this.state.params) {
      if (oldData.param === p.param) {
        Object.assign(p, data);
        this.setState({
          params: this.state.params
        });
        this.props.onSave();
        return;
      }
    }
  },
  _onAdd(data) {
    for (let p of this.state.params) {
      if (data.param === p.param) {
        alert('same param: ' + data.param);
        return;
      }
    }
    let arr = this.state.params.concat(data);
    this.setState({
      params: arr
    });
    console.log('params add');
    this.props.onSave();
  }
});
