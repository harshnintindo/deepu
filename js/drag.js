/**
 * PolaroidDraggable - Handles touch-friendly & mouse dragging for Polaroids
 * Distinguishes between drags and taps so lightbox opens only on genuine taps.
 */
class PolaroidDraggable {
  constructor(onTapCallback) {
    this.onTap = onTapCallback;
    this.topZIndex = 100;
  }

  attach(element, itemData) {
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let initialTranslateX = 0;
    let initialTranslateY = 0;
    let isDragging = false;
    let hasMoved = false;
    const dragThreshold = 8; // Movement in px before treating as drag rather than tap

    // Store base rotation
    const baseRotation = itemData.rotation || (Math.random() * 8 - 4);
    element.dataset.rotation = baseRotation;
    element.style.transform = `translate(0px, 0px) rotate(${baseRotation}deg)`;

    const onPointerDown = (e) => {
      // Ignore right clicks
      if (e.button !== undefined && e.button !== 0) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      startX = clientX;
      startY = clientY;
      hasMoved = false;
      isDragging = true;

      // Bring clicked polaroid to top
      this.topZIndex++;
      element.style.zIndex = this.topZIndex;

      // Read current translation from style if present
      const match = element.style.transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
      if (match) {
        initialTranslateX = parseFloat(match[1]) || 0;
        initialTranslateY = parseFloat(match[2]) || 0;
      } else {
        initialTranslateX = 0;
        initialTranslateY = 0;
      }

      currentX = initialTranslateX;
      currentY = initialTranslateY;

      // Add active dragging styles
      element.classList.add('is-dragging');

      // Bind move and end listeners to window
      window.addEventListener('mousemove', onPointerMove, { passive: false });
      window.addEventListener('mouseup', onPointerUp);
      window.addEventListener('touchmove', onPointerMove, { passive: false });
      window.addEventListener('touchend', onPointerUp);
      window.addEventListener('touchcancel', onPointerUp);
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      const dist = Math.hypot(deltaX, deltaY);
      if (dist > dragThreshold) {
        hasMoved = true;
        // Prevent page scroll when deliberately dragging a polaroid
        if (e.cancelable) {
          e.preventDefault();
        }
      }

      if (hasMoved) {
        currentX = initialTranslateX + deltaX;
        currentY = initialTranslateY + deltaY;
        const currentRot = parseFloat(element.dataset.rotation) || 0;
        element.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentRot}deg) scale(1.06)`;
      }
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      element.classList.remove('is-dragging');

      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('touchcancel', onPointerUp);

      const currentRot = parseFloat(element.dataset.rotation) || 0;

      if (!hasMoved) {
        // Genuine Tap / Click -> trigger Lightbox
        element.style.transform = `translate(${initialTranslateX}px, ${initialTranslateY}px) rotate(${currentRot}deg)`;
        if (typeof this.onTap === 'function') {
          this.onTap(itemData);
        }
      } else {
        // Settle smoothly in new dragged position
        element.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${currentRot}deg)`;
      }
    };

    element.addEventListener('mousedown', onPointerDown);
    element.addEventListener('touchstart', onPointerDown, { passive: true });
  }
}
