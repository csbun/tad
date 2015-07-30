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
    onSave: React.PropTypes.func.isRequired,
    _id: React.PropTypes.string,
    tadId: React.PropTypes.string,
    params: React.PropTypes.array,
    res: React.PropTypes.string
  },
  getInitialState() {
    return {
      _id: this.props._id,
      tadId: this.props.tadId,
      params: this.props.params || [],
      res: this.props.res || ''
    };
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      params: nextProps.params || [],
      res: nextProps.res || ''
    });
  },
  render() {
    let btnClassName = this.props._id ? 'btn-blue' : 'btn-green';
    return <div className="clear">
      <div>
        { this.state.params.map(p =>
          <TadRuleItemParam key={p.param} {...p} onSave={this._onSaveParam}></TadRuleItemParam>
        ) }
        <TadRuleItemParam onSave={this._onAddParam}></TadRuleItemParam>
      </div>
      <CmpCodeArea ref="res" label="Response" rows="4" value={this.state.res}></CmpCodeArea>
      <button className={"fr " + btnClassName} onClick={this._onSave}>Save</button>
    </div>;
  },
  _onSaveParam(data, oldData) {
    for (let p of this.state.params) {
      if (oldData.param === p.param) {
        Object.assign(p, data);
        this.setState({
          params: this.state.params,
          res: this.refs.res.getValue()
        });
        return;
      }
    }
  },
  _onAddParam(data) {
    for (let p of this.state.params) {
      if (data.param === p.param) {
        alert('same param: ' + data.param);
        return;
      }
    }
    let arr = this.state.params.concat(data);
    this.setState({
      params: arr,
      res: this.refs.res.getValue()
    });
  },
  _onResChange() {
    this.setState({
      res: this.refs.res.getValue()
    });
  },
  _onSave() {
    this.state.res = this.refs.res.getValue();
    this.props.onSave(this.state);
  }
});

TadRuleList = React.createClass({
  mixins: [ReactMeteorData],
  propTypes: {
    tadId: React.PropTypes.string.isRequired
  },
  getMeteorData() {
    return {
      rules: CollectionRules.find({
        tadId: this.props.tadId
      }).fetch()
    };
  },
  getValue() {
    return this.data.rules;
  },
  render() {
    return <div>
      { this.data.rules.map(r =>
        <TadRuleListEditItem key={r._id} {...r} onSave={this._onSave}></TadRuleListEditItem>
      ) }
      <TadRuleListEditItem onSave={this._onAdd}></TadRuleListEditItem>
    </div>;
  },
  _onAdd(data) {
    data.tadId = this.props.tadId;
    CollectionRules.insert(data);
  },
  _onSave(data) {
    CollectionRules.update(data._id, data);
  }
});
