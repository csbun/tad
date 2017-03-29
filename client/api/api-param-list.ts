import {Component, View, Inject} from 'angular2/angular2';

import {Grid} from 'client/util/grid';

@Component({
  selector: 'api-param-list'
})
@View({
  directives: [Grid],
  template: `<div>
      <grid></grid>
    </div>`
})
export class ApiParamList {
  // definition = [{
  //     name: 'name',
  //     label: 'Name',
  //     editable: true
  //   }];
  constructor() {
  }
}
// export class ApiParamList extends Grid {
//   constructor() {
//     super();
//   }
// }
