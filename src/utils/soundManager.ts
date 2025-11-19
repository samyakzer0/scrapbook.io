import { Howl } from 'howler';

class SoundManager {
  private sounds: Map<string, Howl> = new Map();
  private isMuted: boolean = false;

  constructor() {
    this.initSounds();
  }

  private initSounds() {
    // Sound effects definitions
    const soundFiles = {
      imageUpload: '/sounds/paper-crumble.mp3',
      textAdd: '/sounds/marker-scribble.mp3',
      elementDrag: '/sounds/paper-slide.mp3',
      deleteAction: '/sounds/paper-tear.mp3',
      backgroundChange: '/sounds/page-turn.mp3',
      exportSuccess: '/sounds/camera-click.mp3',
    };

    // For demo purposes, we'll use a simple beep sound
    // In production, replace with actual sound files
    Object.entries(soundFiles).forEach(([key, src]) => {
      this.sounds.set(
        key,
        new Howl({
          src: [src],
          volume: 0.35,
          html5: true,
          onloaderror: () => {
            console.warn(`Sound file ${src} not found, using silent fallback`);
          },
        })
      );
    });
  }

  play(soundName: string) {
    if (this.isMuted) return;
    
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.play();
    }
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  getMuted() {
    return this.isMuted;
  }
}

export const soundManager = new SoundManager();
