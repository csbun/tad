Tad = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return CollectionTads.findOne(this.props.tadId) || {};
  },
  render() {
    let { name, params, rules, ...rest } = this.data;
    return this.data._id ? <div {...rest}>
      <h2>{ name }</h2>
      <p>
        <label>path:</label>
        <CmpInput
          ref="path"
          type="url"
          placeholder="api path"
          defaultValue={this.data.path}
        ></CmpInput>
      </p>
      <div>
        <TadParamList ref="params" params={params}></TadParamList>
        <CmpCodeArea ref="res" defaultValue={this.data.res}></CmpCodeArea>
        <TadRuleList ref="rules" params={params} rules={rules}></TadRuleList>
      </div>
      <div>
        <button onClick={this._onSave}>Save</button>
      </div>
    </div> : <div></div>;
  },
  _onSave() {
    var data = Object.assign({}, this.data);
    for (let ref of Object.keys(this.refs)) {
      if (this.refs[ref].getValue) {
        data[ref] = this.refs[ref].getValue();
      }
    }
    CollectionTads.update(this.data._id, data);
  }
});
