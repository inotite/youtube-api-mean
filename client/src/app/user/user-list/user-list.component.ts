import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
  displayedColumns: string[] = ['id', 'username', 'email', 'password', 'phone', 'roles'];
  
  @Input()
  public dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}

  ngOnInit() {

    this.users.subscribe(users => {
      console.log(users);
      this.dataSource = new MatTableDataSource<User>(users);
      this.dataSource.paginator = this.paginator;
    })

  }

}
