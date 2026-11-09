/**
 * ===================================================================
 * 💛 HEIRLOOM MEMORY ALBUM CONTROLLER FOR DEEPU
 * Realistic Open Photo Book with 18 Unique Handcrafted Themes
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Sound & Music Controller
  const soundController = new SoundController(BOOK_DETAILS);

  // 2. DOM Elements
  const coverStage = document.getElementById('book-cover-stage');
  const albumStage = document.getElementById('photo-album-stage');
  const bookCanvas = document.getElementById('book-cover-canvas');
  const bookWrapper = document.getElementById('book-3d-wrapper');
  const openTriggerBtn = document.getElementById('open-album-trigger');
  const openHintText = document.getElementById('open-hint-txt');
  
  // Header Logo & Audio Button
  const headerLogoBtn = document.getElementById('header-logo-btn');
  const audioBtn = document.getElementById('audio-pill-btn');

  // Open Book Spread Elements
  const openBookSpread = document.getElementById('open-book-spread');
  const openBookWrapper = document.getElementById('open-book-wrapper');
  const photoSlot = document.getElementById('open-book-photo-slot');
  const chapterTagEl = document.getElementById('current-chapter-tag');
  const chapterTaglineEl = document.getElementById('current-chapter-tagline');
  const chapterStickerEl = document.getElementById('current-chapter-sticker');
  const chapterLineEl = document.getElementById('current-chapter-line');
  const chapterSubnoteEl = document.getElementById('current-chapter-subnote');
  const pageNumIndicatorEl = document.getElementById('current-page-num-indicator');
  const pageCounterPill = document.getElementById('page-counter-pill');
  const bottomPageStatus = document.getElementById('bottom-page-status');
  const nextBtnText = document.getElementById('next-btn-text');
  const prevBtn = document.getElementById('book-prev-btn');
  const nextBtn = document.getElementById('book-next-btn');
  const jumpStrip = document.getElementById('thumbnail-jump-strip');
  const closeTopBtn = document.getElementById('close-album-top-btn');
  const jumpLetterBtn = document.getElementById('jump-to-letter-btn');

  // Containers
  const timelineContainer = document.getElementById('album-timeline-container');
  const finalLetterBody = document.getElementById('final-letter-body');

  // Lightbox Elements
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.getElementById('lightbox-close');

  // Action Buttons
  const replayBtn = document.getElementById('replay-memories-btn');
  const closeAlbumBtn = document.getElementById('close-album-btn');

  // 3. Open Book Page State
  let currentBookPageIndex = 0;
  const totalPages = BOOK_CONFIG.length; // 18 photos

  // 4. Build Unique Frame HTML for all 18 Themes
  function buildThemeFrameHtml(entry, idx) {
    const fallbackImg = entry.fallback || `images/${(idx % 10) + 1}.jpg`;
    
    switch (entry.theme) {
      case 'vintage-coffee':
        return `
          <div class="theme-frame polaroid-coffee">
            <div class="tape-strip tape-peach"></div>
            <div class="gold-corner gc-tl"></div>
            <div class="gold-corner gc-tr"></div>
            <div class="gold-corner gc-bl"></div>
            <div class="gold-corner gc-br"></div>
            <div class="photo-box cursor-pointer" data-zoom="${entry.photo}" data-caption="${entry.caption}">
              <img src="${entry.photo}" alt="Deepu memory" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackImg}';" />
            </div>
            <div class="polaroid-caption-line font-caveat">☕ ${entry.caption}</div>
          </div>
        `;

      case 'film-strip':
        return `
          <div class="theme-frame film-strip-frame">
            <div class="film-sprockets film-top">
              <span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
            <div class="film-meta-bar">
              <span class="film-brand">KODAK GOLD 400</span>
              <span class="film-frame-no">▶ 0${idx + 1}A</span>
            </div>
            <div class="photo-box film-photo-box cursor-pointer" data-zoom="${entry.photo}" data-caption="${entry.caption}">
              <img src="${entry.photo}" alt="Deepu memory" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackImg}';" />
            </div>
            <div class="film-sprockets film-bottom">
              <span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
          </div>
        `;

      case 'botanical-garden':
        return `
          <div class="theme-frame botanical-frame">
            <div class="tape-strip tape-frosted"></div>
            <span class="pressed-leaf">🌿</span>
            <span class="pressed-flower">🌸</span>
            <div class="photo-box botanical-photo-box cursor-pointer" data-zoom="${entry.photo}" data-caption="${entry.caption}">
              <img src="${entry.photo}" alt="Deepu memory" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackImg}';" />
            </div>
            <div class="botanical-label font-caveat">🌸 ${entry.caption}</div>
          </div>
        `;

      case 'vintage-postcard':
        return `
          <div class="theme-frame airmail-frame">
            <div class="postal-cancellation">
              <span class="circle-stamp">PAR AVION</span>
              <span class="wavy-lines">≋≋≋</span>
            </div>
            <div class="photo-box cursor-pointer" data-zoom="${entry.photo}" data-caption="${entry.caption}">
              <img src="${entry.photo}" alt="Deepu memory" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackImg}';" />
            </div>
            <div class="post-sub-text font-mono">AIRMAIL • SPECIAL DELIVERY FOR DEEPU</div>
          </div>
        `;

      case 'fairy-lights':
        return `
          <div class="theme-frame celestial-frame">
            <div class="fairy-lights-string">
              <span class="light-bulb bulb-1"></span>
              <span class="light-bulb bulb-2"></span>
              <span class="light-bulb bulb-3"></span>
              <span class="light-bulb bulb-4"></span>
              <span class="light-bulb bulb-5"></span>
            </div>
            <span class="celestial-moon">🌙</span>
            <div class="photo-box celestial-photo-box cursor-pointer" data-zoom="${entry.photo}" data-caption="${entry.caption}">
              <img src="${entry.photo}" alt="Deepu memory" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackImg}';" />
            </div>
            <div class="celestial-caption font-caveat">✨ ${entry.caption}</div>
          </div>
        `;

      case 'ticket-scrapbook':
        return `
          <div class="theme-frame ticket-frame">
            <div class="metallic-paperclip" aria-hidden="true"></div>
            <div class="ticket-stub-decor">
              <span class="ticket-num">VIP PASS</span>
              <span class="ticket-barcode">|||||||||||</span>
            </div>
            <div class="photo-box cursor-pointer" data-zoom="${entry.photo}" data-caption="${entry.caption}">
              <img src="${entry.photo}" alt="Deepu memory" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackImg}';" />
            </div>
            <div class="polaroid-caption-line font-caveat">🎫 ${entry.caption}</div>
          </div>
        `;

      case 'retro-mixtape':
        return `
          <div class="theme-frame mixtape-frame">
            <div class="tape-strip tape-sand"></div>
            <div class="cassette-header-bar font-mono">
              <span>SIDE A • DEEPU'S PLAYLIST</span>
              <span>STEREO</span>
            </div>
            <div class="photo-box cassette-photo-box cursor-pointer" data-zoom="${entry.photo}" data-caption="${entry.caption}">
              <img src="${entry.photo}" alt="Deepu memory" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackImg}';" />
            </div>
            <div class="cassette-reels font-mono">
              <span>(◎)</span> <span class="tape-line">════</span> <span>(◎)</span>
            </div>
          </div>
        `;

      case 'sunflower-sunshine':
        return `
          <div class="theme-frame sunflower-frame">
            <div class="tape-strip tape-yellow"></div>
            <span class="sunflower-sticker sf-1">🌻</span>
            <span class="sunflower-sticker sf-2">🌻</span>
            <div class="photo-box sunflower-photo-box cursor-pointer" data-zoom="${entry.photo}" data-caption="${entry.caption}">
              <img src="${entry.photo}" alt="Deepu memory" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackImg}';" />
            </div>
            <div class="sunflower-caption font-caveat">🌻 ${entry.caption}</div>
          </div>
        `;

      case 'pinky-promise':
        return `
          <div class="theme-frame friendship-frame">
            <div class="beaded-string-top">
              <span class="bead">B</span>
              <span class="bead">E</span>
              <span class="bead">S</span>
              <span class="bead">T</span>
              <span class="bead">I</span>
              <span class="bead">E</span>
            </div>
            <div class="photo-box stitched-photo-box cursor-pointer" data-zoom="${entry.photo}" data-caption="${entry.caption}">
              <img src="${entry.photo}" alt="Deepu memory" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackImg}';" />
            </div>
            <div class="friendship-caption font-caveat">🤙 ${entry.caption}</div>
          </div>
        `;

      case 'golden-celebration':
        return `
          <div class="theme-frame golden-royal-frame">
            <div class="royal-crown-badge">👑</div>
            <div class="gold-filigree-corners">
              <span class="gf-tl">⚜</span><span class="gf-tr">⚜</span>
            </div>
            <div class="photo-box royal-photo-box cursor-pointer" data-zoom="${entry.photo}" data-caption="${entry.caption}">
              <img src="${entry.photo}" alt="Deepu memory" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackImg}';" />
            </div>
            <div class="royal-caption font-caveat">👑 ${entry.caption}</div>
          </div>
        `;

      case 'newspaper-chronicle':
        return `
          <div class="theme-frame newspaper-frame">
            <div class="news-masthead">★ THE DAILY BESTIE • SPECIAL EDITION ★</div>
            <div class="photo-box cursor-pointer" data-zoom="${entry.photo}" data-caption="${entry.caption}">
              <img src="${entry.photo}" alt="Deepu memory" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackImg}';" />
            </div>
            <div class="text-center font-mono text-xs mt-2 text-[#241726] font-bold">
              📰 ${entry.caption}
            </div>
          </div>
        `;

      case 'cozy-cottagecore':
        return `
          <div class="theme-frame cottagecore-frame">
            <div class="lace-trim text-center font-mono text-[10px] text-[#8a6d0c] tracking-widest">
              ❀ COZY MEMORIES • DEEPU ❀
            </div>
            <div class="photo-box cursor-pointer" data-zoom="${entry.photo}" data-caption="${entry.caption}">
              <img src="${entry.photo}" alt="Deepu memory" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackImg}';" />
            </div>
            <div class="text-center font-caveat text-xl text-[#8a6d0c] mt-2 font-bold">
              🧺 ${entry.caption}
            </div>
          </div>
        `;

      case 'celestial-galaxy':
        return `
          <div class="theme-frame galaxy-frame">
            <span class="galaxy-constellation">✨ ✦</span>
            <div class="photo-box cursor-pointer" data-zoom="${entry.photo}" data-caption="${entry.caption}">
              <img src="${entry.photo}" alt="Deepu memory" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackImg}';" />
            </div>
            <div class="text-center font-caveat text-xl text-[#FFE088] mt-2 font-bold">
              🌌 ${entry.caption}
            </div>
          </div>
        `;

      case 'retro-polaroid-grid':
        return `
          <div class="theme-frame duo-polaroid-frame">
            <div class="tape-strip tape-frosted"></div>
            <div class="photo-box cursor-pointer" data-zoom="${entry.photo}" data-caption="${entry.caption}">
              <img src="${entry.photo}" alt="Deepu memory" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackImg}';" />
            </div>
            <div class="polaroid-caption-line font-caveat">📷 ${entry.caption}</div>
          </div>
        `;

      case 'antique-journal':
        return `
          <div class="theme-frame journal-frame">
            <span class="quill-stamp">✒️</span>
            <div class="photo-box cursor-pointer" data-zoom="${entry.photo}" data-caption="${entry.caption}">
              <img src="${entry.photo}" alt="Deepu memory" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackImg}';" />
            </div>
            <div class="text-center font-caveat text-xl text-[#5A3E36] mt-2 font-bold">
              📜 ${entry.caption}
            </div>
          </div>
        `;

      case 'ocean-breeze':
        return `
          <div class="theme-frame ocean-frame">
            <span class="shell-sticker">🐚</span>
            <div class="photo-box cursor-pointer" data-zoom="${entry.photo}" data-caption="${entry.caption}">
              <img src="${entry.photo}" alt="Deepu memory" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackImg}';" />
            </div>
            <div class="text-center font-caveat text-xl text-[#006D77] mt-2 font-bold">
              🌊 ${entry.caption}
            </div>
          </div>
        `;

      case 'butterfly-garden':
        return `
          <div class="theme-frame butterfly-frame">
            <span class="butterfly-sticker">🦋</span>
            <div class="photo-box cursor-pointer" data-zoom="${entry.photo}" data-caption="${entry.caption}">
              <img src="${entry.photo}" alt="Deepu memory" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackImg}';" />
            </div>
            <div class="text-center font-caveat text-xl text-[#7B2CBF] mt-2 font-bold">
              🌸 ${entry.caption}
            </div>
          </div>
        `;

      case 'timeless-heirloom':
      default:
        return `
          <div class="theme-frame heirloom-royal-frame">
            <span class="heirloom-crown">👑</span>
            <div class="photo-box cursor-pointer" data-zoom="${entry.photo}" data-caption="${entry.caption}">
              <img src="${entry.photo}" alt="Deepu memory" class="spread-photo" onerror="this.onerror=null; this.src='${fallbackImg}';" />
            </div>
            <div class="text-center font-caveat text-2xl text-[#AF8D11] mt-2 font-bold">
              💖 ${entry.caption}
            </div>
          </div>
        `;
    }
  }

  // 5. Render Current Open Book Page (One by One)
  function renderOpenBookPage(idx, direction = 'none') {
    if (!BOOK_CONFIG || !BOOK_CONFIG[idx]) return;
    const entry = BOOK_CONFIG[idx];

    // Trigger page flip animation
    if (openBookSpread) {
      openBookSpread.classList.remove('turn-forward', 'turn-backward');
      void openBookSpread.offsetWidth; // Reflow
      if (direction === 'next') openBookSpread.classList.add('turn-forward');
      if (direction === 'prev') openBookSpread.classList.add('turn-backward');
    }

    // Play paper rustle sound
    if (direction !== 'none') {
      soundController.playPageTurnSound(direction === 'next' ? 1.05 : 0.95);
    }

    // Left Page: Photo Frame
    if (photoSlot) {
      photoSlot.innerHTML = buildThemeFrameHtml(entry, idx);

      // Attach Lightbox to photo click
      const imgBox = photoSlot.querySelector('[data-zoom]');
      if (imgBox) {
        imgBox.addEventListener('click', () => {
          const src = imgBox.getAttribute('data-zoom');
          const cap = imgBox.getAttribute('data-caption');
          openLightbox(src, cap);
        });
      }
    }

    // Right Page: Quote & Details
    if (chapterTagEl) chapterTagEl.textContent = entry.tag || `PAGE ${idx + 1 < 10 ? '0' : ''}${idx + 1}`;
    if (chapterTaglineEl) chapterTaglineEl.textContent = entry.tagline || 'Memory for Deepu';
    if (chapterStickerEl) chapterStickerEl.textContent = entry.sticker || '💛';
    if (chapterLineEl) chapterLineEl.textContent = `"${entry.line}"`;
    if (chapterSubnoteEl) chapterSubnoteEl.textContent = entry.subNote || '';
    if (pageNumIndicatorEl) pageNumIndicatorEl.textContent = `ENTRY ${idx + 1} OF ${totalPages}`;

    // Top & Bottom Progress Pills
    if (pageCounterPill) pageCounterPill.textContent = `PAGE ${idx + 1} OF ${totalPages}`;
    if (bottomPageStatus) bottomPageStatus.textContent = `${idx + 1} / ${totalPages}`;

    // Previous Button Disabled on Page 1
    if (prevBtn) prevBtn.disabled = (idx === 0);

    // Next Button Text (Finish on last page)
    if (nextBtnText) {
      nextBtnText.textContent = (idx === totalPages - 1) ? 'Read Final Letter 💛' : 'Next Page';
    }

    // Update active thumbnail dot
    updateThumbnailDots(idx);
  }

  // 6. Navigation: Next & Prev
  function goToNextPage() {
    if (currentBookPageIndex < totalPages - 1) {
      currentBookPageIndex++;
      renderOpenBookPage(currentBookPageIndex, 'next');
    } else {
      // Reached the end: celebrate with confetti and scroll to letter
      if (window.confetti) {
        window.confetti.burst(0.5, 0.45, 140);
        window.confetti.shower(2800);
      }
      const letterSection = document.getElementById('final-letter-section');
      if (letterSection) letterSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function goToPrevPage() {
    if (currentBookPageIndex > 0) {
      currentBookPageIndex--;
      renderOpenBookPage(currentBookPageIndex, 'prev');
    }
  }

  if (nextBtn) nextBtn.addEventListener('click', goToNextPage);
  if (prevBtn) prevBtn.addEventListener('click', goToPrevPage);

  // 7. Thumbnail Jump Strip (Numbered dots for all 18 photos)
  function initThumbnailJumpStrip() {
    if (!jumpStrip) return;
    jumpStrip.innerHTML = '';

    for (let i = 0; i < totalPages; i++) {
      const btn = document.createElement('button');
      btn.className = `thumb-btn ${i === 0 ? 'active-thumb' : ''}`;
      btn.textContent = `${i + 1}`;
      btn.title = `Jump to Page ${i + 1}`;
      btn.addEventListener('click', () => {
        const dir = (i > currentBookPageIndex) ? 'next' : 'prev';
        currentBookPageIndex = i;
        renderOpenBookPage(currentBookPageIndex, dir);
      });
      jumpStrip.appendChild(btn);
    }
  }

  function updateThumbnailDots(activeIdx) {
    if (!jumpStrip) return;
    const dots = jumpStrip.querySelectorAll('.thumb-btn');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active-thumb', i === activeIdx);
    });
  }

  // 8. Keyboard Arrow Keys Support (← / →)
  document.addEventListener('keydown', (e) => {
    if (albumStage.classList.contains('hidden')) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      goToNextPage();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      goToPrevPage();
    }
  });

  // 9. Touch Swipe Support for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  if (openBookWrapper) {
    openBookWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    openBookWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleBookSwipe();
    }, { passive: true });
  }

  function handleBookSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff < 0) {
        goToNextPage(); // Swipe Left -> Next
      } else {
        goToPrevPage(); // Swipe Right -> Prev
      }
    }
  }

  // 10. Open Book from Cover Trigger
  let isOpeningInProgress = false;

  function triggerBookOpening() {
    if (isOpeningInProgress) return;
    isOpeningInProgress = true;

    if (openHintText) {
      openHintText.innerHTML = '<span>📖</span> Opening your keepsake book... <span>✨</span>';
    }

    // 1. Play realistic antique leather creak & cascading flutter sound safely
    try {
      if (soundController && typeof soundController.playBookFlutterSound === 'function') {
        soundController.playBookFlutterSound();
      }
    } catch (e) {
      console.warn("Sound flutter warning:", e);
    }

    try {
      if (soundController && typeof soundController.playMusic === 'function') {
        soundController.playMusic();
      }
    } catch (e) {
      console.warn("Music play warning:", e);
    }

    // 2. Add 3D opening animation class to cover
    if (bookWrapper) {
      bookWrapper.classList.add('is-opening');
    }

    // 3. Pre-render Page 1 immediately
    currentBookPageIndex = 0;
    renderOpenBookPage(0);
    initThumbnailJumpStrip();

    // 4. Right as cover swings open (~750ms):
    setTimeout(() => {
      // Golden confetti celebration
      try {
        if (window.confetti) {
          window.confetti.burst(0.5, 0.45, 130);
          window.confetti.shower(2200);
        }
      } catch (e) {}

      // Smooth stage transition
      if (coverStage) {
        coverStage.classList.add('opacity-0', 'scale-95');
      }

      setTimeout(() => {
        if (coverStage) coverStage.classList.add('hidden');
        if (albumStage) {
          albumStage.classList.remove('hidden');
          // Force browser reflow to ensure CSS transitions apply
          void albumStage.offsetWidth;
          albumStage.classList.remove('opacity-0');
          albumStage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        isOpeningInProgress = false;
      }, 300);
    }, 750);

    // Fallback safeguard: if anything ever stalls, force show album after 1.8s
    setTimeout(() => {
      if (albumStage && albumStage.classList.contains('hidden')) {
        if (coverStage) coverStage.classList.add('hidden');
        albumStage.classList.remove('hidden', 'opacity-0');
        renderOpenBookPage(0);
        isOpeningInProgress = false;
      }
    }, 1800);
  }

  // Multi-target event listeners for 100% click reliability
  const book3DStage = document.getElementById('book-3d-stage');

  if (openTriggerBtn) {
    openTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerBookOpening();
    });
  }

  if (bookCanvas) {
    bookCanvas.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerBookOpening();
    });
  }

  if (bookWrapper) {
    bookWrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerBookOpening();
    });
  }

  if (book3DStage) {
    book3DStage.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerBookOpening();
    });
  }

  if (openHintText) {
    openHintText.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerBookOpening();
    });
  }

  // Cover stage delegation
  if (coverStage) {
    coverStage.addEventListener('click', (e) => {
      triggerBookOpening();
    });
  }

  // Touch listener for instant tap response on phones
  [openTriggerBtn, bookCanvas, bookWrapper, book3DStage, openHintText].forEach(el => {
    if (el) {
      el.addEventListener('touchend', (e) => {
        triggerBookOpening();
      }, { passive: true });
    }
  });

  // Global access
  window.openDeepuBook = triggerBookOpening;

  // 11. Close Album Back to Cover
  function closeAlbumExperience() {
    soundController.playPageTurnSound(0.9, 1.0);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    albumStage.classList.add('opacity-0');
    setTimeout(() => {
      albumStage.classList.add('hidden');
      coverStage.classList.remove('hidden');

      if (bookWrapper) {
        bookWrapper.classList.remove('is-opening');
      }

      if (openHintText) {
        openHintText.innerHTML = '<span>✦</span> Tap the book to open &amp; turn the pages <span>✦</span>';
      }

      setTimeout(() => {
        coverStage.classList.remove('opacity-0', 'scale-95');
        isOpeningInProgress = false;
      }, 50);
    }, 400);
  }

  if (closeAlbumBtn) closeAlbumBtn.addEventListener('click', closeAlbumExperience);
  if (closeTopBtn) closeTopBtn.addEventListener('click', closeAlbumExperience);

  // Jump down to final letter
  if (jumpLetterBtn) {
    jumpLetterBtn.addEventListener('click', () => {
      const letterSection = document.getElementById('final-letter-section');
      if (letterSection) letterSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 12. Render Final Letter
  function renderLetter() {
    if (!BOOK_DETAILS || !BOOK_DETAILS.finalLetter) return;
    const letterHeadingEl = document.getElementById('final-letter-heading');
    const letterSignoffEl = document.getElementById('final-letter-signoff');
    const letterSigEl = document.getElementById('final-letter-signature');

    if (letterHeadingEl && BOOK_DETAILS.finalLetter.heading) {
      letterHeadingEl.textContent = BOOK_DETAILS.finalLetter.heading;
    }
    if (finalLetterBody && BOOK_DETAILS.finalLetter.body) {
      const paras = BOOK_DETAILS.finalLetter.body || [];
      finalLetterBody.innerHTML = paras.map(p => `<p class="leading-relaxed mb-4">${p}</p>`).join('');
    }
    if (letterSignoffEl && BOOK_DETAILS.finalLetter.signOff) {
      letterSignoffEl.textContent = BOOK_DETAILS.finalLetter.signOff;
    }
    if (letterSigEl && BOOK_DETAILS.finalLetter.signature) {
      letterSigEl.textContent = BOOK_DETAILS.finalLetter.signature;
    }
  }

  // 13. Lightbox Functions
  function openLightbox(src, caption) {
    if (!lightboxModal) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightboxModal.classList.remove('opacity-0', 'pointer-events-none');
    lightboxModal.classList.add('opacity-100');
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.add('opacity-0', 'pointer-events-none');
    lightboxModal.classList.remove('opacity-100');
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // 14. Replay from Page 1 with Confetti
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      soundController.playPageTurnSound(1.0);
      if (window.confetti) {
        window.confetti.burst(0.5, 0.5, 130);
        window.confetti.shower(2500);
      }
      currentBookPageIndex = 0;
      renderOpenBookPage(0);
      albumStage.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 15. Header Logo Click resets to top
  if (headerLogoBtn) {
    headerLogoBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 16. Audio Pill Button
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      soundController.toggleMusic();
      const isPlaying = soundController.isMusicPlaying;
      const icon = audioBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = isPlaying ? 'music_note' : 'music_off';
        icon.classList.toggle('animate-pulse', isPlaying);
      }
    });
  }

  // Initial Content Population
  initThumbnailJumpStrip();
  renderLetter();
  createAmbientParticles();
});

/**
 * Floating Ambient Golden Sparkles in Background
 */
function createAmbientParticles() {
  const container = document.getElementById('ambient-hearts');
  if (!container) return;

  const icons = ['✨', '✦', '⭐', '💛', '✧', '💫'];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.className = 'ambient-heart';
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.left = `${Math.random() * 95}%`;
    el.style.top = `${Math.random() * 95}%`;
    el.style.animationDelay = `${Math.random() * 8}s`;
    el.style.animationDuration = `${6 + Math.random() * 7}s`;
    el.style.fontSize = `${12 + Math.random() * 16}px`;
    container.appendChild(el);
  }
}
