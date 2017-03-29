import {Component, View, Inject} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';

import {ApiParamList} from 'client/api/api-param-list';
import {ApiRuleList} from 'client/api/api-rule-list'

@Component({
  selector: 'api'
})
@View({
  directives: [ApiParamList, ApiRuleList],
  template: `<div>
      <h1>{{api.name}} <a target="_blank" href="{{api.path}}">#</a></h1>
      <api-param-list></api-param-list>
      <api-rule-list></api-rule-list>
    </div>`
})
export class Api {
  constructor(@Inject(RouteParams) routeParams:RouteParams) {
    // get api
    this.api = {
      _id: routeParams.params.apiId
    };
    Tracker.autorun(zone.bind(() => this.api = CollectionApis.findOne(this.api._id);));
  }
}
