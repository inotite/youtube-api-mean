import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from "rxjs";
import { User } from "../../core/domain/user.model";
import * as fromState from "../../core/state";
import * as UserActions from "../../core/state/user/user.action";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.container.html',
  styleUrls: ['./user-edit.container.scss']
})
export class UserEditContainer implements OnInit {

  public user$: Observable<User>;

  constructor(private activatedRoute: ActivatedRoute, private store$: Store<any>) { }

  ngOnInit() {
    this.user$ = this.store$.pipe(select(fromState.selectCurrentUser));

    this.activatedRoute.params.subscribe(params => {
        console.log(params);
        this.store$.dispatch(new UserActions.Select(params.userId));
    })
  }

  submitted($event: User) {
    this.store$.dispatch(new UserActions.Update($event));
  }

}
