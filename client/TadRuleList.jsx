let TadRuleItemParam = React.createClass({
  propTypes: {
    param: React.PropTypes.string,
    oper: React.PropTypes.string,
    val: React.PropTypes.string,
    onSave: React.PropTypes.func.isRequired
  },
  render() {
    let btnClassName = this.props.param ? 'btn-blue' : 'btn-green';
    return <div className="flex-wrap">
      <CmpInput ref="param" className="piece" placeholder="param" value={this.props.param}></CmpInput>
      <CmpInput ref="oper" className="piece" placeholder="> or = or <" value={this.props.oper}></CmpInput>
      <CmpInput ref="val" className="piece" placeholder="value" value={this.props.val}></CmpInput>
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
    if (!data.param || !data.oper) {
      alert('param and oper are required!');
    } else {
      this.props.onSave(data, this.props);
    }
  }
});

let TadRuleListEditItem = React.createClass({
  propTypes: {
    // onSave: React.PropTypes.func.isRequired,
    params: React.PropTypes.array,
    res: React.PropTypes.string
  },
  getInitialState() {
    return Object.assign({res: '', params: []}, this.props);
  },
  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({res: ''}, nextProps));
  },
  render() {
    let btnClassName = this.props.param ? 'btn-blue' : 'btn-green';
    return <div className="clear">
      <div>
        { this.state.params.map(p =>
          <TadRuleItemParam key={p.param} {...p} onSave={this._onSaveParam}></TadRuleItemParam>
        ) }
        <TadRuleItemParam onSave={this._onAddParam}></TadRuleItemParam>
      </div>
      <CmpCodeArea label="Response" rows="4" value={this.state.res}></CmpCodeArea>
      <button className={"fr " + btnClassName} onClick={this._onSave}>Save</button>
    </div>;
  },
  _onSaveParam(data, oldData) {
    for (let p of this.state.params) {
      if (oldData.param === p.param) {
        Object.assign(p, data);
        this.setState({
          params: this.state.params
        });
        return;
      }
    }
  },
  _onAddParam(data) {
    for (let p of this.state.params) {
      if (data.param === p.param) {
        alert('same param = : ' + data.param);
        return;
      }
    }
    let arr = this.state.params.concat(data);
    this.setState({
      params: arr
    });
  },
  _onSave() {
    console.log(this.state);
  }
});

TadRuleList = React.createClass({
  propTypes: {
    rules: React.PropTypes.array
  },
  getValue() {
    // TODO
    return [];
  },
  render() {
    return <div>
      { (this.props.rules || []).map(r =>
        <TadRuleListEditItem {...r}></TadRuleListEditItem>
      ) }
      <TadRuleListEditItem></TadRuleListEditItem>
    </div>;
  }
});
