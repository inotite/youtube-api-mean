import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAddFormComponent } from './video-add-form.component';

describe('VideoAddFormComponent', () => {
  let component: VideoAddFormComponent;
  let fixture: ComponentFixture<VideoAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
