Project = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return CollectionProjects.findOne(this.props.params.projectId) || {};
  },
  render() {
    var tadList = this.data._id ? <TadList {...this.data}></TadList> : <div></div>;
    var tad = this.props.params.tadId ? <Tad {...this.props.params}></Tad> : <div></div>;
    return <div className="project">
      <div className="title">
        <h1>{this.data.name}</h1>
        <p><a href={this.data.git}>{this.data.git}</a></p>
      </div>
      { tadList }
      <div>
        { tad }
      </div>
    </div>;
  }
});
