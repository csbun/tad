TapiList = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {

    return {
      players: Players.find().fetch()
      // todoListLoading: ! handle.ready(), // Use handle to show loading state
      // todoList: TodoLists.findOne(this.props.id),
      // todoListTasks: Tasks.find({listId: this.props.id}).fetch()
    };
  },
  render: function function_name(argument) {

    Players.find().map((p) => {
      console.log(p);
    });
    var players = this.data.players.map(p => <TapiListItem {...p}></TapiListItem>);
    console.log(this.data.players.length);
    return (
      <ul>
        { players }
      </ul>
    );
  }
});
