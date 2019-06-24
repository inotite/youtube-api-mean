import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewContainer } from './user-new.container';

describe('UserNewComponent', () => {
  let component: UserNewContainer;
  let fixture: ComponentFixture<UserNewContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNewContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNewContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
