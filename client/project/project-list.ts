import {
  Component,
  View,
  NgFor,
  formDirectives,
  Control,
  ControlGroup,
  Validators
} from 'angular2/angular2';
import {Project} from 'client/project/project';

@Component({
  selector: 'project-list'
})
@View({
  directives: [NgFor, formDirectives, Project],
  template: `<div class="row">
      <div class="columns small-12 medium-8">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Repo</th>
            </tr>
          </thead>
          <tbody>
            <tr *ng-for="#p of projects">
              <td>{{p.name}}</td>
              <td>{{p.repo}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="columns small-12 medium-4">
        <form [ng-form-model]="porjectForm" #f="form" (submit)="add(f.value)">
          <label>Name</label>
          <input type="text" ng-control="name">
          <label>Description</label>
          <input type="text" ng-control="repo">
          <button>Add</button>
        </form>
      </div>
    </div>
    `
})
export class ProjectList {
  constructor() {
    // For now, we can use Meteor Tracker, a reactive wrapper that we will run data when a change occurs.
    // We will bind it to Angular's change detection system, Zone.js.
    Tracker.autorun(zone.bind(() => {
      this.projects = CollectionProjects.find().fetch();
    }));
    // form
    this.porjectForm = new ControlGroup({
      name: new Control('', Validators.required),
      repo: new Control('', Validators.required)
    });
  }

  add(value) {
    if (!this.porjectForm.valid) {
      alert('invalid !');
      return;
    }
    CollectionProjects.insert(value, (err, res) => {
      if (err) {
        alert(JSON.stringify(err));
      } else {
        alert('success !');
      }
    });
  }
}