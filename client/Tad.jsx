Tad = React.createClass({
  mixins: [ReactMeteorData],
  propTypes: {
    tadId: React.PropTypes.string.isRequired
  },
  getMeteorData() {
    return CollectionTads.findOne(this.props.tadId) || {};
  },
  // componentWillReceiveProps() {
  //   this.setState(this.getMeteorData());
  // },
  render() {
    let { name, params, rules, ...rest } = this.data;
    return this.data._id ? <div {...rest}>
      <h2>{ name }</h2>
      <CmpInput
        ref="path"
        label="Path"
        type="url"
        placeholder="api path"
        value={this.data.path}
      ></CmpInput>
      <div>
        <TadParamList ref="params" params={params} onSave={this._onSave}></TadParamList>
        <CmpCodeArea ref="res" label="Response" value={this.data.res}></CmpCodeArea>
        <TadRuleList ref="rules" params={params} rules={rules}></TadRuleList>
      </div>
      <div>
        <button className="btn-blue" onClick={this._onSave}>Save</button>
      </div>
    </div> : <div></div>;
  },
  _onSave() {
    setTimeout(() => {
      let data = Object.assign({}, this.data);
      for (let ref of Object.keys(this.refs)) {
        if (this.refs[ref].getValue) {
          data[ref] = this.refs[ref].getValue();
        }
      }
      CollectionTads.update(this.data._id, data);
    }, 0);
  }
});
