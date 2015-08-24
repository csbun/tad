import {
  Component,
  View,
  NgIf,
  NgFor,
  formDirectives,
  Control,
  ControlGroup,
  Validators
} from 'angular2/angular2';
import {routerDirectives} from 'angular2/router';


@Component({
  selector: 'project-list'
})
@View({
  directives: [NgIf, NgFor, formDirectives, routerDirectives],
  template: `<div class="row">
      <div class="columns small-12 medium-8">
        <table style="width:100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Repo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ng-for="#p of projects">
              <td>{{p.name}}</td>
              <td>{{p.repo}}</td>
              <td>
                <a class="label" (click)="selectRow(p)">edit</a>
                <a class="label" [router-link]="['/project', {projectId: p._id}]">go</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="columns small-12 medium-4">
        <form [ng-form-model]="porjectForm" #f="form" (submit)="saveRow(f.value)">
          <label>Name</label>
          <input type="text" ng-control="name">
          <label>Description</label>
          <input type="text" ng-control="repo">
          <button *ng-if="!f.value._id">Add</button>
          <button *ng-if="f.value._id">Save</button>
        </form>
      </div>
    </div>
    `
})
export class ProjectList {
  constructor() {
    // For now, we can use Meteor Tracker, a reactive wrapper that we will run data when a change occurs.
    // We will bind it to Angular's change detection system, Zone.js.
    Tracker.autorun(zone.bind(() => this.projects = CollectionProjects.find().fetch();));
    // form
    this.porjectForm = new ControlGroup({
      _id: new Control(''),
      name: new Control('', Validators.required),
      repo: new Control('', Validators.required)
    });
  }

  // 选中行，准备编辑
  selectRow(p) {
    for (let k of Object.keys(this.porjectForm.controls)) {
      this.porjectForm.controls[k].updateValue(p[k]);
    }
  }

  // 保存编辑
  saveRow(value) {
    if (!this.porjectForm.valid) {
      alert('invalid !');
      return;
    }
    let cb = (err, res) => {
      if (err) {
        alert(JSON.stringify(err));
      } else {
        alert('success !');
      }
    };
    if (value._id) {
      // update
      CollectionProjects.update(value._id, value, cb);
    } else {
      // add
      CollectionProjects.insert(_.omit(value, '_id'), cb);
    }
  }
}