// Real Audio Player for authentic recorded paper flips, book opening/closing, and gentle music-box melodies

class DiaryAudioController {
  private isMuted: boolean = false;
  private isAmbientPlaying: boolean = false;
  private ambientTimer: any = null;
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isAmbientPlaying) {
      this.stopAmbient();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsAmbientPlaying(): boolean {
    return this.isAmbientPlaying;
  }

  // Real recorded page flip sound effect
  public playPageTurn() {
    if (this.isMuted || typeof window === 'undefined') return;
    try {
      const audio = new Audio('/sounds/oxidvideos-page-flip-smaller-page-453027.mp3');
      audio.volume = 0.75;
      audio.play().catch(() => {});
    } catch (e) {
      // Audio playback policy
    }
  }

  // Real recorded book opening sound effect
  public playBookOpen() {
    if (this.isMuted || typeof window === 'undefined') return;
    try {
      const audio = new Audio('/sounds/page-flip-2.mp3');
      audio.volume = 0.75;
      audio.play().catch(() => {});
    } catch (e) {
      // Audio playback policy
    }
  }

  // Real recorded book closing sound effect
  public playBookClose() {
    if (this.isMuted || typeof window === 'undefined') return;
    try {
      const audio = new Audio('/sounds/page-flip-3.mp3');
      audio.volume = 0.75;
      audio.play().catch(() => {});
    } catch (e) {
      // Audio playback policy
    }
  }

  // Delicate chime note
  public playChime(freq: number = 523.25, duration: number = 1.2) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.07, this.ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio policy
    }
  }

  // Soft celebratory chime chord for candle blowout
  public playCelebrationChimes() {
    if (this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.playChime(freq, 2.0);
      }, index * 120);
    });
  }

  // Ambient music box arpeggio
  public toggleAmbient(): boolean {
    if (this.isAmbientPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  public startAmbient() {
    if (this.isMuted) return;
    this.initCtx();
    this.isAmbientPlaying = true;

    const chords = [
      [261.63, 329.63, 392.0, 523.25], // C maj
      [220.0, 261.63, 329.63, 440.0],  // A min
      [174.61, 220.0, 261.63, 349.23], // F maj
      [196.0, 246.94, 293.66, 392.0],  // G maj
    ];

    let chordIdx = 0;
    let noteIdx = 0;

    const playStep = () => {
      if (!this.isAmbientPlaying) return;
      const currentChord = chords[chordIdx];
      const freq = currentChord[noteIdx];
      this.playChime(freq, 1.8);

      noteIdx++;
      if (noteIdx >= currentChord.length) {
        noteIdx = 0;
        chordIdx = (chordIdx + 1) % chords.length;
      }

      this.ambientTimer = setTimeout(playStep, 580);
    };

    playStep();
  }

  public stopAmbient() {
    this.isAmbientPlaying = false;
    if (this.ambientTimer) {
      clearTimeout(this.ambientTimer);
      this.ambientTimer = null;
    }
  }
}

export const diaryAudio = new DiaryAudioController();
