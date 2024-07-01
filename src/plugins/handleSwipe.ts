import { CarouselState, Plugin } from '../core/types';


export const handleSwipe: Plugin = (state: CarouselState): CarouselState => {
  const container = state.track;
  let startX: number = 0;
  let isDragging = false;

  const handleDragStart = (position: number) => {
    isDragging = true;
    startX = position;
  };

  const handleDragEnd = (position: number) => {
    if (!isDragging) return;
    isDragging = false;

    const movedBy = startX - position;
    if (movedBy > 50) {
      state.nextSlide?.();
    }
    if (movedBy < -50) {
      state.prevSlide?.();
    }
  };

  container.addEventListener('mousedown', (event) => handleDragStart(event.clientX));
  container.addEventListener('mouseup', (event) => handleDragEnd(event.clientX));

  container.addEventListener('touchstart', (event) => handleDragStart(event.touches[0].clientX));
  container.addEventListener('touchend', (event) => handleDragEnd(event.changedTouches[0].clientX));

  return state;
};
