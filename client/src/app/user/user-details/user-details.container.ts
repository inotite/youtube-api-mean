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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'blog-user-details-container',
  templateUrl: './user-details.container.html',
})
export class UserDetailsContainer implements OnInit {
  
    public user$: Observable<User>;

    constructor(private store$: Store<any>, private activatedRoute: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.user$ = this.store$.pipe(select(fromState.selectCurrentUser));

        this.activatedRoute.params.subscribe(params => {
            console.log(params);
            this.store$.dispatch(new UserActions.Select(params.userId));
        })
    }

    /**
     * Switch to register view.
     */

    editUser(user: User) {
        this.store$.dispatch(new UserActions.SelectCurrentUser(user._id));
        this.router.navigate(['/user', user._id, 'edit']);
    }

    deleteUser(user: User) {

    }
}