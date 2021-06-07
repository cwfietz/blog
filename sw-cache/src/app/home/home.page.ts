import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  pictures: string[] = [];

  constructor() {
    navigator.serviceWorker.addEventListener('message', event => {
      if (event.data === 'imagesCached') {
        this.listCache();
      }
    });
  }

  ngOnInit(): void {
    this.listCache();
  }

  async listCache(): Promise<void> {
    this.pictures = [];
    const cache = await caches.open('images');
    const responses = await cache.matchAll();
    for (const response of responses) {
      const ab = await response.arrayBuffer();
      // @ts-ignore
      const imageStr = 'data:image/jpeg;base64,' + btoa(String.fromCharCode.apply(null, new Uint8Array(ab)));
      this.pictures.push(imageStr);
    }
  }


}
