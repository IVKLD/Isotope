import { Injectable } from '@angular/core';

const SOUND_SRC = '/assets/sounds/key-click.mp3';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private audio: HTMLAudioElement | null = null;

  public playKeyClick(): void {
    this.audio ??= new Audio(SOUND_SRC);
    const clone = this.audio.cloneNode();
    if (clone instanceof HTMLAudioElement) {
      void clone.play();
    }
  }
}
