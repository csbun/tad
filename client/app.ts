import {Component, View, bootstrap} from 'angular2/angular2';
import {ProjectList} from 'client/project/project-list';

@Component({
  selector: 'app'
})
@View({
  directives: [ProjectList],
  template: `<div>Hello World!<project-list></project-list></div>`
})
class Tad {

}
bootstrap(Tad);
