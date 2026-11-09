/**
 * Sound & Audio Controller
 * Provides realistic page-turn rustle sounds (Web Audio API)
 * and plays the official background song: "Beautiful" by Amit Trivedi.
 */

class SoundController {
  constructor(config = {}) {
    this.musicConfig = config.music || {};
    this.audioCtx = null;
    this.bgAudio = new Audio();
    this.bgAudio.loop = true;
    this.bgAudio.volume = 0.65;
    this.isMusicPlaying = false;
    this.hasCustomAudio = false;

    this.initMusic();
  }

  getAudioContext() {
    try {
      if (!this.audioCtx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.audioCtx = new AudioCtx();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }
      return this.audioCtx;
    } catch (err) {
      console.warn("AudioContext init warning:", err);
      return null;
    }
  }

  /**
   * Single page rustle sound with realistic paper friction and body
   */
  playPageTurnSound(pitchFactor = 1.0, intensity = 1.0) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const bufferSize = Math.floor(ctx.sampleRate * 0.18);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Soft pink/white noise with gentle friction texture
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = white * 0.38;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;

      // Bandpass filter to create crisp parchment paper frequency
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(Math.max(200, 1450 * pitchFactor), ctx.currentTime);
      filter.Q.setValueAtTime(2.2, ctx.currentTime);

      const gainNode = ctx.createGain();
      const now = ctx.currentTime;
      const peak = Math.max(0.001, 0.12 * intensity);
      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.linearRampToValueAtTime(peak, now + 0.025);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.17);

      noiseSource.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      noiseSource.start(now);
      noiseSource.stop(now + 0.18);
    } catch (e) {
      // Audio context might be restricted before gesture
    }
  }

  /**
   * Realistic Old Book Opening & Multi-Page Fluttering Sound Sequence
   * Plays a vintage leather/spine creak followed by rapid cascading page flips!
   */
  playBookFlutterSound() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. Vintage Leather Book Spine Creak (creaking resonant friction)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(115, now);
      osc.frequency.exponentialRampToValueAtTime(46, now + 0.38);

      const creakFilter = ctx.createBiquadFilter();
      creakFilter.type = 'lowpass';
      creakFilter.frequency.setValueAtTime(360, now);

      oscGain.gain.setValueAtTime(0.0001, now);
      oscGain.gain.linearRampToValueAtTime(0.065, now + 0.05);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

      osc.connect(creakFilter);
      creakFilter.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);

      // 2. Cascading Rapid Page Rustles / Turns
      const riffleTimes = [60, 200, 360, 520, 680];
      const pitches = [0.9, 1.15, 1.0, 1.25, 1.05];
      const intensities = [0.7, 1.0, 1.1, 1.1, 0.8];

      riffleTimes.forEach((delay, idx) => {
        setTimeout(() => {
          this.playPageTurnSound(pitches[idx], intensities[idx]);
        }, delay);
      });
    } catch (e) {
      console.warn("Audio flutter warning:", e);
    }
  }

  /**
   * Load Background Song: "Beautiful" by Amit Trivedi
   */
  initMusic() {
    try {
      const audioSource = this.musicConfig.audioSrc || 'audio/beautiful.mp3';
      this.bgAudio.src = audioSource;
      this.bgAudio.preload = 'auto';

      this.bgAudio.addEventListener('canplaythrough', () => {
        this.hasCustomAudio = true;
      });
      this.bgAudio.addEventListener('error', (err) => {
        console.warn("Song loading status:", err);
      });
    } catch (e) {
      console.warn("Init music warning:", e);
    }
  }

  /**
   * Play "Beautiful" by Amit Trivedi
   */
  async playMusic() {
    if (this.isMusicPlaying) return;

    try {
      if (!this.bgAudio.src) {
        this.bgAudio.src = this.musicConfig.audioSrc || 'audio/beautiful.mp3';
      }
      await this.bgAudio.play();
      this.isMusicPlaying = true;
      this.updateMusicUI(true);
    } catch (err) {
      console.warn("Audio play prevented until user gesture:", err);
    }
  }

  /**
   * Pause Music
   */
  pauseMusic() {
    if (!this.isMusicPlaying) return;

    try {
      if (this.bgAudio) {
        this.bgAudio.pause();
      }
    } catch (e) {}

    this.isMusicPlaying = false;
    this.updateMusicUI(false);
  }

  toggleMusic() {
    if (this.isMusicPlaying) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
  }

  updateMusicUI(playing) {
    const btn = document.getElementById('audio-pill-btn');
    if (!btn) return;
    const icon = btn.querySelector('.material-symbols-outlined');
    if (icon) {
      icon.textContent = playing ? 'music_note' : 'music_off';
      icon.classList.toggle('animate-pulse', playing);
    }
    btn.title = playing ? 'Pause Song: Beautiful (Amit Trivedi)' : 'Play Song: Beautiful (Amit Trivedi)';
  }
}

// Global exposure
if (typeof window !== 'undefined') {
  window.SoundController = SoundController;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SoundController;
}
