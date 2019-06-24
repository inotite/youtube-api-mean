import { Component, OnInit } from '@angular/core';
import { User } from '../../core/domain/user.model';
import { Store } from '@ngrx/store';
import * as UserActions from "../../core/state/user/user.action";

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.container.html',
  styleUrls: ['./user-new.container.scss']
})
export class UserNewContainer implements OnInit {

  constructor(private store$: Store<any>) { }

  ngOnInit() {
  }

  submitted(user: User) {
    this.store$.dispatch(new UserActions.Add(user));
  }

}
