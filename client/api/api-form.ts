import {
  Component,
  View,
  NgIf,
  NgFor,
  formDirectives,
  Control,
  ControlGroup,
  Validators,
  Inject
} from 'angular2/angular2';

import {RouteParams} from 'angular2/router';

let collectionCallback = cb => {
  return (err, res) => {
    if (err) {
      alert(JSON.stringify(err));
    } else {
      if (cb) {
        cb(res);
      }
      alert('success !');
    }
  };
};


@Component({
  selector: 'api-form'
})
@View({
  directives: [NgIf, NgFor, formDirectives],
  template: `<form *ng-if="api">
      <label>Name</label>
      <input type="text" [(ng-model)]="api.name">
      <label>Path</label>
      <input type="text" [(ng-model)]="api.path">
      <button *ng-if="!api._id" (click)="addRow()">Add</button>
      <button *ng-if="api._id" (click)="saveRow()">Save</button>
    </form>`
})
export class ApiForm {
  constructor(@Inject(RouteParams) routeParams:RouteParams) {
    this.api = {
      _id: routeParams.params.apiId,
      projectId: routeParams.params.projectId
    };
    if (this.api._id) {
      Tracker.autorun(zone.bind(() => this.api = CollectionApis.findOne(this.api._id);));
    }
  }

  addRow() {
    CollectionApis.insert(
      _.omit(this.api, '_id'),
      collectionCallback(res => location.hash = '#/project/' + this.api.projectId + '/' + res));
    );
  }

  // 保存编辑
  saveRow() {
    // update
    CollectionApis.update(this.api._id, this.api, collectionCallback);
  }
}