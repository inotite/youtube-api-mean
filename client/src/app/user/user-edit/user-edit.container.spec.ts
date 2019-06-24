import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditContainer } from './user-edit.container';

describe('UserEditComponent', () => {
  let component: UserEditContainer;
  let fixture: ComponentFixture<UserEditContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
