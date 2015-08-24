import {Component, View, Inject} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';

import {ApiList} from 'client/api/api-list';

@Component({
  selector: 'project'
})
@View({
  directives: [ApiList],
  template: `<div>
      <h1>{{project.name}} <a target="_blank" href="{{project.repo}}">#</a></h1>
      <api-list></api-list>
    </div>`
})
export class Project {
  constructor(@Inject(RouteParams) routeParams:RouteParams) {
    // get project
    this.project = {
      _id: routeParams.params.projectId
    };
    Tracker.autorun(zone.bind(() => this.project = CollectionProjects.findOne(this.project._id);));
  }
}
