import { Component, OnInit, Input, Output } from '@angular/core';
import { User, defaultUser } from '../../../core/domain/user.model';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() user: User = defaultUser;

  @Output() save = new EventEmitter<User>();

  form: FormGroup;

  constructor(public formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      _id: [this.user._id],
      username: [this.user.username, Validators.required],
      email: [this.user.email, Validators.required],
      phone: [this.user.phone, Validators.required],
      password: [this.user.password, Validators.required],
      roles: [this.user.roles, Validators.required]
    })
  }

  ngOnInit() {
  }

}
