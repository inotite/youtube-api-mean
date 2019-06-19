import {
    Component,
    OnInit,
} from "@angular/core";
import {
    select,
    Store
} from "@ngrx/store";
import { Observable } from "rxjs";
import { User } from "../../core/domain/user.model";
import * as fromState from "../../core/state";
import * as UserAction from "../../core/state/user/user.action";

@Component({
  selector: 'blog-user-list-container',
  templateUrl: './user-list.container.html',
})
export class UserListContainer implements OnInit {
  
    public users$: Observable<User[]>;

    constructor(private store$: Store<any>) {}

    ngOnInit() {
        this.users$ = this.store$.pipe(select(fromState.selectAllUser));
        this.store$.dispatch(new UserAction.GetUsers());
    }
}