import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/core/domain/user.model';
import { trackByFn } from 'src/app/util/angular.util';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'blog-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input()
  public users: Observable<User[]>;

  public trackUser: Function = trackByFn;
  displayedColumns: string[] = ['username', 'email', 'phone', 'roles', 'created_at', 'control'];
  
  @Input()
  public dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output()
  public addUser: EventEmitter<void> = new EventEmitter<void>();

  @Output() edit = new EventEmitter<User>();
  @Output() show = new EventEmitter<User>();
  @Output() remove = new EventEmitter<User>();

  constructor() {}

  ngOnInit() {

    this.users.subscribe(users => {
      this.dataSource = new MatTableDataSource<User>(users);
      this.dataSource.paginator = this.paginator;
    })

  }

  /**
     * Emits an event to route the user to the add user view.
     * @param event
     */
  onAddUser(event: any) {
    console.log(`USER: onAddUser()`);
    this.addUser.emit();
  }

  showDetails(user: User) {
    console.log(`USER: showDetails()`);
    this.show.emit(user);
  }

  editUser(user: User) {
    console.log(`USER: editUser()`);
    this.edit.emit(user);
  }

  deleteUser(user: User) {
    console.log(`USER: removeUser()`);
    this.remove.emit(user);
  }

}
