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
import * as UserActions from "../../core/state/user/user.action";
import * as RouterActions from "../../core/state/router/router.action";
import { appRoutePaths } from "../../app.routes";
import { Route, Router } from '@angular/router';

@Component({
  selector: 'blog-user-list-container',
  templateUrl: './user-list.container.html',
})
export class UserListContainer implements OnInit {
  
    public users$: Observable<User[]>;

    constructor(private store$: Store<any>, private router: Router) {}

    ngOnInit() {
        this.users$ = this.store$.pipe(select(fromState.selectAllUser));
        this.store$.dispatch(new UserActions.GetUsers());
    }

    /**
     * Switch to register view.
     */
    public addUser(event: any) {
        this.store$.dispatch(new UserActions.NavigateToAdd());
    }

    public showUser(user: User) {
        this.store$.dispatch(new UserActions.Select(user._id));
        // new RouterActions.Go({ path: appRoutePaths.user + `/${user._id }` })
        this.router.navigate(['/user', user._id]);
        // new RouterActions.Go({ path: appRoutePaths.user + `/${user._id}` })
    }

    public editUser(user: User) {
        this.store$.dispatch(new UserActions.SelectCurrentUser(user._id));
        // new RouterActions.Go({ path: appRoutePaths.user + `/${user._id }/edit` })
        this.router.navigate(['/user', user._id, 'edit']);
    }

    public deleteUser(user: User) {
        if (confirm('Are you sure?'))
            this.store$.dispatch(new UserActions.Delete(user._id));
    }
}