import { Component, OnInit, Input, Output } from '@angular/core';
import { User, defaultUser } from '../../../core/domain/user.model';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterActionTypes } from 'src/app/core/state/router/router.action';
import { Router } from '@angular/router';


export interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {

  @Input() user: User = defaultUser;

  @Output() save = new EventEmitter<User>();

  form: FormGroup;

  role_list: Role[] = [
    {value: 'ADMIN', viewValue: 'Admin'},
    {value: 'USER', viewValue: 'USER'},
    {value: 'GUEST', viewValue: 'Guest'},
  ]

  constructor(public formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
        _id: [this.user._id],
        username: [this.user.username, Validators.required],
        email: [this.user.email, Validators.required],
        phone: [this.user.phone, Validators.required],
        password: ['', Validators.required],
        role: [this.user.role, Validators.required]
    })
  }

  ngOnChanges() {
    if (this.user) {
        this.form.patchValue({...this.user});
    //   this.form.setValue({password: ''});
        this.form.controls['password'].setValue('');
    }
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }

  onCancel() {
      this.router.navigate(['/user']);
  }

}
