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
import {routerDirectives, RouteParams} from 'angular2/router';

import {ApiForm} from 'client/api/api-form';

@Component({
  selector: 'api-list'
})
@View({
  directives: [NgIf, NgFor, formDirectives, routerDirectives, ApiForm],
  template: `<div class="row">
      <div class="columns small-12 medium-6">
        <table style="width:100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Path</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ng-for="#api of apis">
              <td>{{api.name}}</td>
              <td>{{api.path}}</td>
              <td>
                <a class="label" [router-link]="['/project-api', {projectId: projectId, apiId: api._id}]">edit</a>
                <a class="label" [router-link]="['/api', {apiId: api._id}]">go</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="columns small-12 medium-6">
        <api-form></api-form>
      </div>
    </div>
    `
})

export class ApiList {
  constructor(@Inject(RouteParams) routeParams:RouteParams) {
    this.projectId = routeParams.params.projectId;
    this.apis=[];
    Tracker.autorun(zone.bind(
      () => this.apis = CollectionApis.find({
          projectId: this.projectId
        }).fetch();
    ));
  }

}