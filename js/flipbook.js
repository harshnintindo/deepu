/**
 * 3D Flip-Book Engine with LUXURY EDITORIAL PAGE DESIGNS
 * Every single page has a bespoke art-print layout, unique frames, and heartfelt typography!
 */

class FlipBook {
  constructor(entries, details) {
    this.entries = entries || [];
    this.details = details || {};
    this.currentIndex = 0; // 0 to entries.length (entries.length = final spread)
    this.totalEntries = this.entries.length;
    this.isOpen = false;
    this.isAnimating = false;

    // Sound & Music Controller
    this.sound = new SoundController(this.details);

    // DOM Elements
    this.bookContainer = document.getElementById('book-container');
    this.bookElement = document.getElementById('flip-book');
    this.hardCover = document.getElementById('hard-cover');
    this.pageCounter = document.getElementById('page-counter');
    this.prevBtn = document.getElementById('prev-page-btn');
    this.nextBtn = document.getElementById('next-page-btn');
    this.controlsBar = document.getElementById('book-controls');
    this.themeToggleBtn = document.getElementById('theme-toggle');
    this.themeLabel = document.getElementById('theme-label');

    // Theme state: 'midnight', 'lavender', 'sage'
    this.themes = [
      { id: 'midnight', name: 'Midnight 🌙' },
      { id: 'lavender', name: 'Lavender 🌸' },
      { id: 'sage', name: 'Emerald 🌿' }
    ];
    this.currentThemeIndex = 0;

    // Pages inside spread
    this.leftPage = document.getElementById('book-page-left');
    this.rightPage = document.getElementById('book-page-right');
    this.leftPageContent = document.getElementById('left-page-content');
    this.rightPageContent = document.getElementById('right-page-content');

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateControls();
  }

  bindEvents() {
    // Theme Switcher Button
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.cycleTheme();
      });
    }

    // 1. Cover Opening click
    if (this.hardCover) {
      this.hardCover.addEventListener('click', () => {
        if (!this.isOpen) {
          this.openBook();
        }
      });
    }

    // 2. Navigation buttons
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.nextPage();
      });
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prevPage();
      });
    }

    // 3. Click left/right pages to turn
    if (this.leftPage) {
      this.leftPage.addEventListener('click', (e) => {
        if (e.target.closest('button, a')) return;
        this.prevPage();
      });
    }

    if (this.rightPage) {
      this.rightPage.addEventListener('click', (e) => {
        if (e.target.closest('button, a')) return;
        this.nextPage();
      });
    }

    // 4. Keyboard Navigation (Left / Right Arrow)
    window.addEventListener('keydown', (e) => {
      if (!this.isOpen) {
        if (e.key === 'Enter' || e.key === ' ') {
          this.openBook();
        }
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        this.nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        this.prevPage();
      } else if (e.key === 'Escape') {
        this.closeBook();
      }
    });

    // 5. Touch Gestures (Swipe Left / Swipe Right)
    this.initTouchSwipe();
  }

  cycleTheme() {
    this.currentThemeIndex = (this.currentThemeIndex + 1) % this.themes.length;
    const selected = this.themes[this.currentThemeIndex];
    document.body.setAttribute('data-theme', selected.id);
    if (this.themeLabel) {
      this.themeLabel.textContent = selected.name;
    }
    if (window.confetti) {
      window.confetti.burst(0.85, 0.1, 35);
    }
  }

  initTouchSwipe() {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const minSwipeDistance = 40;

    const bookArea = this.bookElement;
    if (!bookArea) return;

    bookArea.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    bookArea.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;

      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
        if (!this.isOpen) {
          this.openBook();
          return;
        }

        if (diffX < 0) {
          this.nextPage();
        } else {
          this.prevPage();
        }
      }
    }, { passive: true });
  }

  /**
   * 3D Cover Opening Flow
   */
  openBook() {
    if (this.isOpen || this.isAnimating) return;
    this.isAnimating = true;

    // Play sound & start music
    this.sound.playPageTurnSound();
    if (this.details.music && this.details.music.autoplayOnOpen) {
      this.sound.playMusic();
    }

    // Celebratory confetti burst
    if (window.confetti) {
      window.confetti.burst(0.5, 0.5, 95);
    }

    this.bookContainer.classList.add('book-opening');
    this.hardCover.classList.add('cover-open');

    // Render first spread
    this.currentIndex = 0;
    this.renderCurrentSpread();

    setTimeout(() => {
      this.bookContainer.classList.remove('book-opening');
      this.bookContainer.classList.add('book-is-open');
      this.isOpen = true;
      this.isAnimating = false;
      this.updateControls();
      this.animateLineTyping();
    }, 750);
  }

  /**
   * 3D Cover Closing Flow
   */
  closeBook() {
    if (!this.isOpen || this.isAnimating) return;
    this.isAnimating = true;

    this.sound.playPageTurnSound();
    this.bookContainer.classList.remove('book-is-open');
    this.hardCover.classList.remove('cover-open');
    this.hardCover.classList.add('cover-closing');

    setTimeout(() => {
      this.hardCover.classList.remove('cover-closing');
      this.isOpen = false;
      this.isAnimating = false;
      this.currentIndex = 0;
      this.updateControls();
    }, 700);
  }

  /**
   * Turn to Next Spread
   */
  nextPage() {
    if (!this.isOpen || this.isAnimating) return;
    if (this.currentIndex >= this.totalEntries) return; // At finale

    this.isAnimating = true;
    this.sound.playPageTurnSound();

    this.animatePageFlip('next', () => {
      this.currentIndex++;
      this.renderCurrentSpread();
      this.updateControls();
      this.animateLineTyping();
      this.isAnimating = false;

      // Grand finale celebration!
      if (this.currentIndex === this.totalEntries) {
        if (window.confetti) {
          window.confetti.burst(0.5, 0.45, 150);
          window.confetti.shower(3000);
        }
      }
    });
  }

  /**
   * Turn to Previous Spread
   */
  prevPage() {
    if (!this.isOpen || this.isAnimating) return;
    if (this.currentIndex <= 0) {
      this.closeBook();
      return;
    }

    this.isAnimating = true;
    this.sound.playPageTurnSound();

    this.animatePageFlip('prev', () => {
      this.currentIndex--;
      this.renderCurrentSpread();
      this.updateControls();
      this.animateLineTyping();
      this.isAnimating = false;
    });
  }

  /**
   * 3D Paper Curl & Shadow Animation
   */
  animatePageFlip(direction, callback) {
    const flipLeaf = document.getElementById('flipping-leaf');
    if (!flipLeaf) {
      callback();
      return;
    }

    flipLeaf.className = 'flipping-leaf';
    void flipLeaf.offsetWidth; // Force reflow

    if (direction === 'next') {
      flipLeaf.classList.add('flip-forward');
    } else {
      flipLeaf.classList.add('flip-backward');
    }

    setTimeout(() => {
      callback();
      flipLeaf.className = 'flipping-leaf hidden';
    }, 550);
  }

  /**
   * Render Spread Content with UNIQUE THEMES for each spread
   */
  renderCurrentSpread() {
    if (this.currentIndex < this.totalEntries) {
      const entry = this.entries[this.currentIndex];
      const pageNumLeft = this.currentIndex * 2 + 1;
      const pageNumRight = this.currentIndex * 2 + 2;
      const theme = entry.theme || 'vintage-coffee';

      // Set theme classes on pages
      this.leftPage.className = `book-page page-left theme-${theme}`;
      this.rightPage.className = `book-page page-right theme-${theme}`;

      // Build unique Left & Right markup based on the theme
      const { leftHtml, rightHtml } = this.buildThemedPages(entry, pageNumLeft, pageNumRight, theme);
      this.leftPageContent.innerHTML = leftHtml;
      this.rightPageContent.innerHTML = rightHtml;

    } else {
      // Final Grand Finale Spread
      this.leftPage.className = 'book-page page-left theme-grand-finale';
      this.rightPage.className = 'book-page page-right theme-grand-finale';
      this.renderFinalSpread();
    }
  }

  /**
   * Builder for the 10 Unique Themed Pages
   */
  buildThemedPages(entry, pageNumLeft, pageNumRight, theme) {
    const tag = entry.tag || `CHAPTER 0${this.currentIndex + 1}`;
    const tagline = entry.tagline || 'Special Memory';
    const sticker = entry.sticker || '💛';
    const caption = entry.caption || 'Deepu 💛';
    const subNote = entry.subNote || 'Forever grateful for you.';
    const fallbackSvg = `images/${this.currentIndex + 1}.svg`;

    let leftFrameHtml = '';
    let rightDecorHtml = '';

    switch (theme) {
      // ----------------------------------------------------
      // THEME 1: Vintage Coffee & Polaroid ☕
      // ----------------------------------------------------
      case 'vintage-coffee':
        leftFrameHtml = `
          <div class="art-frame frame-coffee">
            <div class="washi-tape tape-peach"></div>
            <div class="gold-corner gc-tl"></div>
            <div class="gold-corner gc-tr"></div>
            <div class="gold-corner gc-bl"></div>
            <div class="gold-corner gc-br"></div>
            <div class="photo-container">
              <img src="${entry.photo}" alt="Deepu photo" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackSvg}';" />
            </div>
            <div class="photo-handwritten-title font-caveat">☕ ${caption}</div>
          </div>
        `;
        rightDecorHtml = `
          <div class="editorial-header">
            <span class="header-star">✦</span>
            <span class="header-tag">${tag} • ${tagline}</span>
            <span class="header-star">✦</span>
          </div>
          <div class="coffee-ring-watermark" aria-hidden="true"></div>
          <div class="quote-mark-elegance">“</div>
          <p class="heartfelt-line font-caveat" id="current-line-text">${entry.line}</p>
          <div class="heartfelt-subnote font-caveat">
            <span class="subnote-bullet">✧</span> ${subNote}
          </div>
          <div class="theme-signature-stamp font-mono">EST. 2021 • COFFEE &amp; LAUGHS</div>
        `;
        break;

      // ----------------------------------------------------
      // THEME 2: Retro Film Strip & Photobooth 🎞️
      // ----------------------------------------------------
      case 'film-strip':
        leftFrameHtml = `
          <div class="art-frame frame-film">
            <div class="film-track film-track-top">
              <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
            <div class="film-header-meta">
              <span class="film-brand">KODAK GOLD 400</span>
              <span class="film-frame-count">▶ 02A</span>
            </div>
            <div class="photo-container film-aspect">
              <img src="${entry.photo}" alt="Deepu photo" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackSvg}';" />
            </div>
            <div class="film-track film-track-bottom">
              <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
        `;
        rightDecorHtml = `
          <div class="editorial-header">
            <span class="header-star">✦</span>
            <span class="header-tag">${tag} • ${tagline}</span>
            <span class="header-star">✦</span>
          </div>
          <div class="typewriter-badge">PHOTOBOOTH ROLL #400</div>
          <div class="quote-mark-elegance">“</div>
          <p class="heartfelt-line font-caveat" id="current-line-text">${entry.line}</p>
          <div class="heartfelt-subnote font-caveat">
            <span class="subnote-bullet">✧</span> ${subNote}
          </div>
          <div class="theme-signature-stamp font-mono">ISO 400 • CANDID &amp; REAL</div>
        `;
        break;

      // ----------------------------------------------------
      // THEME 3: Pressed Botanicals & Daisy Herbarium 🌸
      // ----------------------------------------------------
      case 'botanical-garden':
        leftFrameHtml = `
          <div class="art-frame frame-botanical">
            <div class="washi-tape tape-vellum"></div>
            <span class="botanical-sprig sprig-tl">🌿</span>
            <span class="botanical-bloom bloom-br">🌸</span>
            <div class="photo-container botanical-photo">
              <img src="${entry.photo}" alt="Deepu photo" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackSvg}';" />
            </div>
            <div class="photo-handwritten-title font-caveat">🌸 ${caption}</div>
          </div>
        `;
        rightDecorHtml = `
          <div class="editorial-header">
            <span class="header-star">✦</span>
            <span class="header-tag">${tag} • ${tagline}</span>
            <span class="header-star">✦</span>
          </div>
          <div class="herbarium-seal" aria-hidden="true">🌱</div>
          <div class="quote-mark-elegance">“</div>
          <p class="heartfelt-line font-caveat" id="current-line-text">${entry.line}</p>
          <div class="heartfelt-subnote font-caveat">
            <span class="subnote-bullet">✧</span> ${subNote}
          </div>
          <div class="theme-signature-stamp font-mono">PRESSED HERBARIUM • FOREVER BLOOMING</div>
        `;
        break;

      // ----------------------------------------------------
      // THEME 4: Vintage Postcard & Airmail 💌
      // ----------------------------------------------------
      case 'vintage-postcard':
        leftFrameHtml = `
          <div class="art-frame frame-postcard">
            <div class="airmail-chevron-border"></div>
            <div class="postal-stamp-round">
              <span class="stamp-txt">AIRMAIL</span>
              <span class="stamp-waves">≋≋≋</span>
            </div>
            <div class="photo-container">
              <img src="${entry.photo}" alt="Deepu photo" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackSvg}';" />
            </div>
            <div class="photo-handwritten-title font-caveat">💌 ${caption}</div>
          </div>
        `;
        rightDecorHtml = `
          <div class="editorial-header">
            <span class="header-star">✦</span>
            <span class="header-tag">${tag} • ${tagline}</span>
            <span class="header-star">✦</span>
          </div>
          <div class="postcard-stamp-replica">
            <span class="stamp-art">💌</span>
            <span class="stamp-code">1ST CLASS</span>
          </div>
          <div class="quote-mark-elegance">“</div>
          <p class="heartfelt-line font-caveat" id="current-line-text">${entry.line}</p>
          <div class="heartfelt-subnote font-caveat">
            <span class="subnote-bullet">✧</span> ${subNote}
          </div>
          <div class="theme-signature-stamp font-mono">DESTINATION: DEEPU'S HEART 💛</div>
        `;
        break;

      // ----------------------------------------------------
      // THEME 5: Midnight Stargazing & Fairy Lights 🌙
      // ----------------------------------------------------
      case 'fairy-lights':
        leftFrameHtml = `
          <div class="art-frame frame-celestial">
            <div class="fairy-light-garland">
              <span class="f-bulb f-bulb-1"></span>
              <span class="f-bulb f-bulb-2"></span>
              <span class="f-bulb f-bulb-3"></span>
              <span class="f-bulb f-bulb-4"></span>
              <span class="f-bulb f-bulb-5"></span>
            </div>
            <span class="celestial-crescent">🌙</span>
            <div class="photo-container celestial-photo">
              <img src="${entry.photo}" alt="Deepu photo" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackSvg}';" />
            </div>
            <div class="photo-handwritten-title font-caveat text-gold">✨ ${caption}</div>
          </div>
        `;
        rightDecorHtml = `
          <div class="editorial-header">
            <span class="header-star">✦</span>
            <span class="header-tag">${tag} • ${tagline}</span>
            <span class="header-star">✦</span>
          </div>
          <div class="stardust-constellation" aria-hidden="true">✨ ⭐ 🌙</div>
          <div class="quote-mark-elegance">“</div>
          <p class="heartfelt-line font-caveat" id="current-line-text">${entry.line}</p>
          <div class="heartfelt-subnote font-caveat">
            <span class="subnote-bullet">✧</span> ${subNote}
          </div>
          <div class="theme-signature-stamp font-mono">WRITTEN IN THE STARS • INFINITE</div>
        `;
        break;

      // ----------------------------------------------------
      // THEME 6: Scrapbook Ticket Stub & Paperclips 🎫
      // ----------------------------------------------------
      case 'ticket-scrapbook':
        leftFrameHtml = `
          <div class="art-frame frame-ticket">
            <div class="real-paperclip" aria-hidden="true"></div>
            <div class="ticket-stub-pass">
              <span class="t-pass-title">VIP ACCESS</span>
              <span class="t-pass-code">||||||||||||</span>
            </div>
            <div class="photo-container">
              <img src="${entry.photo}" alt="Deepu photo" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackSvg}';" />
            </div>
            <div class="photo-handwritten-title font-caveat">🎫 ${caption}</div>
          </div>
        `;
        rightDecorHtml = `
          <div class="editorial-header">
            <span class="header-star">✦</span>
            <span class="header-tag">${tag} • ${tagline}</span>
            <span class="header-star">✦</span>
          </div>
          <div class="sticky-memo-badge">📌 NOTE</div>
          <div class="quote-mark-elegance">“</div>
          <p class="heartfelt-line font-caveat" id="current-line-text">${entry.line}</p>
          <div class="heartfelt-subnote font-caveat">
            <span class="subnote-bullet">✧</span> ${subNote}
          </div>
          <div class="theme-signature-stamp font-mono">TICKET #777 • LIFETIME FRIENDSHIP</div>
        `;
        break;

      // ----------------------------------------------------
      // THEME 7: Retro Cassette Mixtape 🎶
      // ----------------------------------------------------
      case 'retro-mixtape':
        leftFrameHtml = `
          <div class="art-frame frame-mixtape">
            <div class="washi-tape tape-sand"></div>
            <div class="cassette-ribbon-bar">
              <span class="c-title font-mono">DEEPU'S MIX • VOL. 1</span>
              <span class="c-stereo font-mono">STEREO</span>
            </div>
            <div class="photo-container cassette-window">
              <img src="${entry.photo}" alt="Deepu photo" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackSvg}';" />
            </div>
            <div class="cassette-spindles font-mono">
              <span>(◎)</span> <span class="tape-track">════</span> <span>(◎)</span>
            </div>
          </div>
        `;
        rightDecorHtml = `
          <div class="editorial-header">
            <span class="header-star">✦</span>
            <span class="header-tag">${tag} • ${tagline}</span>
            <span class="header-star">✦</span>
          </div>
          <div class="animated-soundbars" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <div class="quote-mark-elegance">“</div>
          <p class="heartfelt-line font-caveat" id="current-line-text">${entry.line}</p>
          <div class="heartfelt-subnote font-caveat">
            <span class="subnote-bullet">✧</span> ${subNote}
          </div>
          <div class="theme-signature-stamp font-mono">TRACK 07 • SONGS THAT SOUND LIKE YOU</div>
        `;
        break;

      // ----------------------------------------------------
      // THEME 8: Sunflower & Golden Sunshine 🌻
      // ----------------------------------------------------
      case 'sunflower-sunshine':
        leftFrameHtml = `
          <div class="art-frame frame-sunflower">
            <div class="washi-tape tape-yellow"></div>
            <span class="sunflower-bloom sf-top">🌻</span>
            <span class="sunflower-bloom sf-bottom">🌻</span>
            <div class="photo-container sunflower-photo">
              <img src="${entry.photo}" alt="Deepu photo" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackSvg}';" />
            </div>
            <div class="photo-handwritten-title font-caveat text-amber">🌻 ${caption}</div>
          </div>
        `;
        rightDecorHtml = `
          <div class="editorial-header">
            <span class="header-star">✦</span>
            <span class="header-tag">${tag} • ${tagline}</span>
            <span class="header-star">✦</span>
          </div>
          <div class="sunburst-emblem" aria-hidden="true">☀️</div>
          <div class="quote-mark-elegance">“</div>
          <p class="heartfelt-line font-caveat" id="current-line-text">${entry.line}</p>
          <div class="heartfelt-subnote font-caveat">
            <span class="subnote-bullet">✧</span> ${subNote}
          </div>
          <div class="theme-signature-stamp font-mono">GOLDEN HOUR • 100% HAPPINESS</div>
        `;
        break;

      // ----------------------------------------------------
      // THEME 9: Friendship Bracelet & Pinky Promise 🤙
      // ----------------------------------------------------
      case 'pinky-promise':
        leftFrameHtml = `
          <div class="art-frame frame-friendship">
            <div class="beaded-friendship-strand">
              <span class="bead-letter">B</span>
              <span class="bead-letter">E</span>
              <span class="bead-letter">S</span>
              <span class="bead-letter">T</span>
              <span class="bead-letter">I</span>
              <span class="bead-letter">E</span>
            </div>
            <div class="photo-container stitched-photo">
              <img src="${entry.photo}" alt="Deepu photo" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackSvg}';" />
            </div>
            <div class="photo-handwritten-title font-caveat text-rose">🤙 ${caption}</div>
          </div>
        `;
        rightDecorHtml = `
          <div class="editorial-header">
            <span class="header-star">✦</span>
            <span class="header-tag">${tag} • ${tagline}</span>
            <span class="header-star">✦</span>
          </div>
          <div class="pinky-promise-badge" aria-hidden="true">🤙 💕</div>
          <div class="quote-mark-elegance">“</div>
          <p class="heartfelt-line font-caveat" id="current-line-text">${entry.line}</p>
          <div class="heartfelt-subnote font-caveat">
            <span class="subnote-bullet">✧</span> ${subNote}
          </div>
          <div class="theme-signature-stamp font-mono">WOVEN IN LOVE • UNBREAKABLE</div>
        `;
        break;

      // ----------------------------------------------------
      // THEME 10: Golden Royal Milestone & Celebration 👑
      // ----------------------------------------------------
      case 'golden-celebration':
      default:
        leftFrameHtml = `
          <div class="art-frame frame-royal">
            <div class="royal-crown-topper">👑</div>
            <div class="baroque-filigree-corners">
              <span class="bf-tl">⚜</span><span class="bf-tr">⚜</span>
              <span class="bf-bl">⚜</span><span class="bf-br">⚜</span>
            </div>
            <div class="photo-container royal-photo">
              <img src="${entry.photo}" alt="Deepu photo" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackSvg}';" />
            </div>
            <div class="photo-handwritten-title font-caveat text-gold-metallic">👑 ${caption}</div>
          </div>
        `;
        rightDecorHtml = `
          <div class="editorial-header">
            <span class="header-star">✦</span>
            <span class="header-tag">${tag} • ${tagline}</span>
            <span class="header-star">✦</span>
          </div>
          <div class="royal-medallion-watermark" aria-hidden="true">👑</div>
          <div class="quote-mark-elegance">“</div>
          <p class="heartfelt-line font-caveat" id="current-line-text">${entry.line}</p>
          <div class="heartfelt-subnote font-caveat">
            <span class="subnote-bullet">✧</span> ${subNote}
          </div>
          <div class="theme-signature-stamp font-mono">ROYAL BESTIE • NO. 1 IN MY HEART</div>
        `;
        break;
    }

    const leftHtml = `
      <div class="page-inner photo-page-inner">
        <div class="page-header-meta">
          <span class="badge-chapter">${tag}</span>
          <span class="badge-icon">${sticker}</span>
        </div>
        ${leftFrameHtml}
        <div class="page-footer-num font-mono">— ${String(pageNumLeft).padStart(2, '0')} —</div>
      </div>
    `;

    const rightHtml = `
      <div class="page-inner text-page-inner">
        <div class="luxury-stationery-card">
          ${rightDecorHtml}
        </div>
        <div class="page-footer-num font-mono">— ${String(pageNumRight).padStart(2, '0')} —</div>
      </div>
    `;

    return { leftHtml, rightHtml };
  }

  /**
   * Render the Final Spread (Grand Letter + Read Again)
   */
  renderFinalSpread() {
    const finalData = this.details.finalSpread || {};
    const paragraphsHtml = (finalData.body || [])
      .map(p => `<p class="final-paragraph font-ui">${p}</p>`)
      .join('');

    // Left Page: Keepsake Medal & Wax Seal Montage
    this.leftPageContent.innerHTML = `
      <div class="page-inner final-left-inner">
        <div class="special-badge-circle">
          <span class="seal-icon">💌</span>
          <span class="seal-text">BEST FRIENDS FOREVER</span>
          <span class="seal-stars">★★★★★</span>
        </div>
        <p class="keepsake-note font-caveat">"Some friendships are written in the stars, and ours is my absolute favorite."</p>
        <div class="keepsake-ribbon font-mono">DEEPU &amp; BESTIE</div>
        <div class="page-footer-num font-mono">— End —</div>
      </div>
    `;

    // Right Page: Handwritten Letter & Read Again Button
    this.rightPageContent.innerHTML = `
      <div class="page-inner final-right-inner">
        <div class="final-letter-card">
          <h2 class="final-letter-heading font-caveat">${finalData.heading || 'To my dearest Deepu 💛,'}</h2>
          
          <div class="final-paragraphs-box" id="current-line-text">
            ${paragraphsHtml}
          </div>

          <div class="final-closing-block">
            <p class="final-signoff font-caveat">${finalData.signOff || 'With all my love and endless gratitude,'}</p>
            <p class="final-signature font-caveat">${finalData.signature || 'Your Best Friend Always ✨'}</p>
          </div>

          <button id="read-again-btn" class="read-again-btn" type="button">
            <span>Read again ↺</span>
          </button>
        </div>
        <div class="page-footer-num font-mono">— 💛 —</div>
      </div>
    `;

    // Bind Read Again button
    setTimeout(() => {
      const readAgainBtn = document.getElementById('read-again-btn');
      if (readAgainBtn) {
        readAgainBtn.addEventListener('click', () => {
          this.closeBook();
        });
      }
    }, 100);
  }

  /**
   * Gentle Line Typing / Fade-in Animation
   */
  animateLineTyping() {
    const lineEl = document.getElementById('current-line-text');
    if (!lineEl) return;

    lineEl.classList.remove('line-revealed');
    void lineEl.offsetWidth; // trigger reflow
    lineEl.classList.add('line-revealed');
  }

  /**
   * Update Bottom Controls & Page Counter
   */
  updateControls() {
    if (!this.isOpen) {
      if (this.controlsBar) this.controlsBar.classList.add('controls-hidden');
      return;
    }

    if (this.controlsBar) this.controlsBar.classList.remove('controls-hidden');

    if (this.pageCounter) {
      if (this.currentIndex < this.totalEntries) {
        this.pageCounter.textContent = `${this.currentIndex + 1} / ${this.totalEntries}`;
      } else {
        this.pageCounter.textContent = 'Finale 💌';
      }
    }

    if (this.prevBtn) {
      this.prevBtn.disabled = false;
      this.prevBtn.setAttribute('title', this.currentIndex === 0 ? 'Close book' : 'Previous page');
    }

    if (this.nextBtn) {
      if (this.currentIndex >= this.totalEntries) {
        this.nextBtn.disabled = true;
      } else {
        this.nextBtn.disabled = false;
        this.nextBtn.setAttribute('title', 'Next page');
      }
    }
  }
}

// Instantiate on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.flipBookApp = new FlipBook(BOOK_CONFIG, BOOK_DETAILS);
});
