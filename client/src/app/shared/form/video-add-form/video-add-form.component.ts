import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Video, defaultVideo } from '../../../core/domain/video.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-add-form',
  templateUrl: './video-add-form.component.html',
  styleUrls: ['./video-add-form.component.scss']
})
export class VideoAddFormComponent implements OnInit {

  @Input() video: Video = defaultVideo;

  @Output() save = new EventEmitter<Video>();

  form: FormGroup;
  
  constructor(public formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
        video_id: [this.video.video_id, Validators.required],
    });
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }

  onCancel() {
      this.router.navigate(['/video']);
  }

}
