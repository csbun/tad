Project = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return CollectionProjects.findOne(this.props.params.projectId) || {};
  },
  render() {
    var tadList = this.data._id ? <TadList {...this.data}></TadList> : <div></div>;
    var tad = this.props.params.tadId ? <Tad {...this.props.params}></Tad> : <div></div>;
    return <div>
      <div>
        <h1>{this.data.name}</h1>
        <p><a href={this.data.git}>{this.data.git}</a></p>
        { tadList }
      </div>
      <div>
        { tad }
      </div>
    </div>;
  }
});
