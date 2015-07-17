ProjectListItem = React.createClass({
  render: function () {
    let { name, git, ...rest } = this.props;
    return <li className="item" {...rest}>
      <span className="name">{name}</span>
      <span className="git">{git}</span>
    </li>;
  }
});

ProjectListEditItem = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState() {
    // Object.assign do NOT works in Safari
    return Object.assign({}, this.props);
  },
  // setState when props updated (real-time)
  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, nextProps));
  },
  render() {
    let btns = this.state._id ?
        <p>
          <button onClick={this._onUpdateItem}>修改</button>
          <button onClick={this._onRemoveItem}>删除</button>
        </p>
        :
        <p><button onClick={this._onInsertItem}>添加</button></p>;

    return <li className="item">
      <input type="text" placeholder="name" valueLink={this.linkState('name')}></input>
      <input type="url" placeholder="git" valueLink={this.linkState('git')}></input>
      { btns }
    </li>;
  },
  // callback for all Collection operators
  _onCollectionCallback(err, res, cb) {
    if (err) {
      alert(err);
    } else if (cb) {
      cb(res);
    }
  },
  _onInsertItem() {
    Projects.insert(this.state, (err, res) => {
      this._onCollectionCallback(err, res, () => {
          let s = Object.assign({}, this.props);
          for (let prop of Object.keys(this.state)) {
            if (!s.hasOwnProperty(prop)) {
              s[prop] = '';
            }
          }
          this.setState(s);
      });
    });
  },
  _onUpdateItem() {
    Projects.update(this.state._id, this.state, this._onCollectionCallback);
  },
  _onRemoveItem() {
    Projects.remove(this.state._id, this._onCollectionCallback);
  }
});

ProjectList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData: function() {
    return {
      projects: Projects.find().fetch()
    };
  },
  render: function function_name(argument) {
    let projects = this.data.projects.map(p => <ProjectListEditItem {...p}></ProjectListEditItem>);
    return (
      <ul className="project-list">
        { projects }
        <ProjectListEditItem></ProjectListEditItem>
      </ul>
    );
  }
});
