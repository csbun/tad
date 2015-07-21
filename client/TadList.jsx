let { Link } = ReactRouter;

TadListItem = React.createClass({
  render: function() {
    var { name, path, ...rest } = this.props;
    return <li className="item" {...rest}>
      <Link to="tad" params={{projectId: this.props.projectId, tadId: this.props._id}}>
        <span className="name">{name}</span>
      </Link>
      <small className="path">&nbsp;({path})</small>
    </li>;
  }
});


TadListAddItem = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      projectId: this.props.projectId,
      name: '',
      path: ''
    };
  },
  render: function() {
    return <li className="item">
      <CmpInput label="API Name">
        <input type="text" placeholder="name" valueLink={this.linkState('name')}></input>
      </CmpInput>
      <CmpInput label="API Path">
        <input type="text" placeholder="path" valueLink={this.linkState('path')}></input>
      </CmpInput>
      <button className="btn-green" onClick={this._onAddItem}>添加</button>
    </li>;
  },
  _onAddItem() {
    CollectionTads.insert(this.state, err => {
      if (err) {
        alert(err);
      } else {
        this.setState(this.getInitialState());
      }
    });
  }
});


TadList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      tads: CollectionTads.find({
        projectId: this.props._id
      }).fetch()
    };
  },
  render() {
    return <ul>
      { this.data.tads.map(t =>
        <TadListItem key={t._id} projectId={this.props._id} {...t}></TadListItem>
      ) }
      <TadListAddItem projectId={this.props._id}></TadListAddItem>
    </ul>;
  }
});
