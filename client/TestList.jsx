const STATUS_READY = 'ready';

let TestListItem = React.createClass({
  propTypes: {
    toggleTest: React.PropTypes.func.isRequired
  },
  render() {
    var className = (this.props.classList || []).join(' ');
    return <section className={className} onClick={this.props.toggleTest.bind(this, this.props)}>
      <span>{this.props.path}</span>
      <span className={this.props.status}></span>
    </section>;
  }
});

TestList = React.createClass({
  mixins: [ReactMeteorData],
  propTypes: {
    params: React.PropTypes.object.isRequired
  },
  getMeteorData() {
    return {
      tads: CollectionTads.find({
        projectId: this.props.params.projectId
      }).fetch()
    };
  },
  render() {
    return <div>
      <p>
        <input ref="host"></input>
        <button onClick={this._onClickStart}>Start</button>
      </p>
      { this.data.tads.map(t =>
        <TestListItem key={t._id} toggleTest={this._onToggleTestItem} projectId={this.props._id} {...t}></TestListItem>
      ) }
    </div>;
  },
  _onToggleTestItem(item) {
    for (let tad of this.data.tads) {
      if (tad._id === item._id) {
        tad.status = STATUS_READY;
        tad.path += '>>>';
        break;
      }
    }
    this.setState({
      tads: this.data.tads
    });
  },
  _onClickStart() {
    let host = this.refs.host.getDOMNode().value;
    this.data.tads.map(t => {
      console.log(host + t.path);
    });
  }
});
