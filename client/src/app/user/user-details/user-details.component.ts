import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../core/domain/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent implements OnInit {

  @Input() 
  public user: User;
  @Output() 
  public edit = new EventEmitter<User>();
  @Output() 
  public remove = new EventEmitter<User>();


  constructor() { }

  ngOnInit() {
  }

}
