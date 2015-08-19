import {Component, View, bind, bootstrap} from 'angular2/angular2';
import {
  routerInjectables,
  routerDirectives,
  Router,
  RouteConfig,
  LocationStrategy,
  HashLocationStrategy
} from 'angular2/router';

import {ProjectList} from 'client/project/project-list';
import {Project} from 'client/project/project';

@Component({
  selector: 'app'
})
@View({
  directives: [routerDirectives, ProjectList, Project],
  template: `<router-outlet></router-outlet>`
})
@RouteConfig([
  {path: '/',  component: ProjectList},
  {path: '/project/:projectId', as: 'project', component: Project},
])
class Tad {

}
bootstrap(Tad, [
  routerInjectables,
  bind(LocationStrategy).toClass(HashLocationStrategy) // HTML5Strategy
]);
