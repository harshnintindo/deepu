/**
 * AudioManager - Background music controller with automatic Web Audio synthesizer fallback
 * Allows users to drop in their own MP3, while providing an instant soothing melody if no file is present.
 */
class AudioManager {
  constructor(config) {
    this.config = config || {};
    this.isPlaying = false;
    this.audioElement = new Audio();
    this.audioElement.loop = true;
    this.audioElement.volume = 0.65;
    this.hasCustomAudio = false;
    this.synthRunning = false;
    this.synthTimer = null;
    this.audioCtx = null;

    this.toggleBtn = document.getElementById('music-toggle');
    this.musicLabel = document.getElementById('music-label');
    this.discIcon = document.getElementById('music-disc');

    this.init();
  }

  init() {
    if (!this.config.enabled) {
      if (this.toggleBtn) this.toggleBtn.style.display = 'none';
      return;
    }

    if (this.config.audioSrc) {
      this.audioElement.src = this.config.audioSrc;
      this.audioElement.addEventListener('canplaythrough', () => {
        this.hasCustomAudio = true;
      });
      this.audioElement.addEventListener('error', () => {
        // MP3 not found or cannot be decoded -> gracefully fall back to web audio synthesizer
        this.hasCustomAudio = false;
      });
    }

    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => {
        this.toggle();
      });
    }
  }

  async start() {
    if (this.isPlaying) return;

    try {
      if (this.hasCustomAudio || this.audioElement.src) {
        await this.audioElement.play();
        this.isPlaying = true;
        this.updateUI(true);
        return;
      }
    } catch (err) {
      // Browser blocked autoplay or audioSrc not found
      console.warn("Custom audio playback failed or not found, activating melodic music box:", err);
    }

    // Fall back to Web Audio soothing melody
    if (this.config.fallbackToSynthesizer) {
      this.startMelodyBox();
      this.isPlaying = true;
      this.updateUI(true);
    }
  }

  pause() {
    if (!this.isPlaying) return;

    if (this.audioElement && !this.audioElement.paused) {
      this.audioElement.pause();
    }

    this.stopMelodyBox();
    this.isPlaying = false;
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
  }

  updateUI(playing) {
    if (!this.toggleBtn) return;

    if (playing) {
      this.toggleBtn.classList.add('playing');
      this.toggleBtn.setAttribute('aria-label', 'Pause background music');
      if (this.musicLabel) this.musicLabel.textContent = 'Playing music 🎵';
    } else {
      this.toggleBtn.classList.remove('playing');
      this.toggleBtn.setAttribute('aria-label', 'Play background music');
      if (this.musicLabel) this.musicLabel.textContent = 'Music paused 🔇';
    }
  }

  /**
   * Dreamy Web Audio Music Box Synth
   * Plays a gentle, nostalgic music-box arpeggio (Fmaj7 - Cmaj7 - Dm7 - Am7)
   */
  startMelodyBox() {
    if (this.synthRunning) return;
    this.synthRunning = true;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!this.audioCtx) {
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    // Melodic notes in Hz (F4, A4, C5, E5, D4, F4, A5, etc.)
    const notes = [
      349.23, 440.00, 523.25, 659.25, // Fmaj7
      523.25, 659.25, 783.99, 987.77, // Cmaj7
      293.66, 349.23, 440.00, 523.25, // Dm7
      440.00, 523.25, 659.25, 783.99  // Am7
    ];

    let noteIdx = 0;
    const playNextNote = () => {
      if (!this.synthRunning) return;

      const freq = notes[noteIdx % notes.length];
      noteIdx++;

      this.playChime(freq);

      // Play next note every 450ms for a gentle, calming music-box rhythm
      this.synthTimer = setTimeout(playNextNote, 420);
    };

    playNextNote();
  }

  stopMelodyBox() {
    this.synthRunning = false;
    if (this.synthTimer) {
      clearTimeout(this.synthTimer);
      this.synthTimer = null;
    }
  }

  playChime(freq) {
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    // Warm sine wave with subtle triangle warmth
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Envelope: quick attack, long gentle bell-like decay
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 1.25);
  }
}
