import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'electron-app';
  hasError = false;
  errorMessage = '';
  videoLoaded = false;

  async ngOnInit() {
    await this.tryCapture();
  }

  async tryCapture() {
    this.errorMessage = '';
    this.hasError = false;
    this.videoLoaded = false;

    try {
      const constraints: any = {
        audio: {
          mandatory: {
            chromeMediaSource: 'desktop'
          }
        },
        video: {
          mandatory: {
            chromeMediaSource: 'desktop'
          }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video = document.getElementById('video') as HTMLVideoElement;
      video.muted = true;
      video.onloadedmetadata = () => video.play();
      video.srcObject = stream;
      this.videoLoaded = true;
    } catch (error: any) {
      this.hasError = true;
      this.errorMessage = error.message;
    }
  }

  toggleMute() {
    const video = document.getElementById('video') as HTMLVideoElement;
    video.muted = !video.muted;
  }
}
