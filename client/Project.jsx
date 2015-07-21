Project = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return CollectionProjects.findOne(this.props.params.projectId) || {};
  },
  render() {
    var tadList = this.data._id ?
      <div className="tad-list">
        <TadList {...this.data}></TadList>
      </div> : <div></div>;
    var tad = this.props.params.tadId ?
      <div className="piece tad">
        <Tad {...this.props.params}></Tad>
      </div> : <div></div>;
    return <div className="project">
      <h1 className="title">
        {this.data.name}&nbsp;
        <small><a href={this.data.git} target="_blank"><span className="fa fa-git-square"></span></a></small>
      </h1>
      <div className="flex-wrap">
        { tadList }
        { tad }
      </div>
    </div>;
  }
});
