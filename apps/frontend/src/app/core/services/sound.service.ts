import { inject, Injectable } from '@angular/core';
import { PlatformService } from './platform.service';

const SOUND_SRC = '/assets/sounds/lightningbulb-spacebar-click-keyboard-199448.mp3';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private readonly isBrowser = inject(PlatformService).isBrowser;
  private readonly audio = this.isBrowser ? new Audio(SOUND_SRC) : null;

  public playKeyClick(): void {
    if (!this.audio) return;
    const clone = this.audio.cloneNode();
    if (clone instanceof HTMLAudioElement) {
      void clone.play();
    }
  }
}
