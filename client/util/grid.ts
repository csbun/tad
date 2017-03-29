import {
  Component,
  EventEmitter,
  NgFor,
  NgIf,
  View,
} from 'angular2/angular2';

/**
 * 添加按钮
 */
@Component({
  selector: 'grid-add-btn',
  events: ['isaddchange'] // 小写
})
@View({
  directives: [],
  template: `<button (click)="setIsAdd(true)">Add</button>`
})
export class GridAddBtn {
  isaddchange = new EventEmitter();
  constructor() {
  }
  setIsAdd(isAdd) {
    this.isaddchange.next(!!isAdd);
  }
}


/**
 * 列表组件
 */
@Component({
  selector: 'grid',
  // properties: ['definition']
})
@View({
  directives: [GridAddBtn, NgFor, NgIf],
  template: `<div>
    <grid-add-btn (isaddchange)="setIsAdd($event)"=></grid-add-btn>
    <table style="width:100%">
      <thead>
        <tr>
          <th>#</th>
          <th *nf-for="#d of definition">{{d.label}}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ng-if="isAdd">
          <td></td>
          <td>
            <input type="text" />
          </td>
          <td>
            <a class="label success" (click)="addItem()">ok</a>
            <a class="label warning" (click)="setIsAdd(false)">cancle</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`
})
export class Grid {
  // list: any,
  // collection: any,
  isAdd = false;
  constructor() {

    this.definition = [{
      name: 'name',
      label: 'Name',
      editable: true
    }];
    console.log(this.definition);
  }
  setIsAdd(isAdd) {
    this.isAdd = !!isAdd;
  }
  addItem() {
    // TODO
    console.log('addItem');
  }
}





