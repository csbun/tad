import {Component, View, Inject} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';

@Component({
  selector: 'project'
})
@View({
  template: `
      <h1>{{project.name}} <a target="_blank" href="{{project.repo}}">#</a></h1>
      
    `
})
export class Project {
  constructor(@Inject(RouteParams) routeParams:RouteParams) {
    // get project
    let projectId = routeParams.params.projectId;
    Tracker.autorun(zone.bind(() => this.project = CollectionProjects.findOne(projectId);));
  }
}
