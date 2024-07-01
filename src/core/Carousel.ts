import { CarouselState, CarouselOptions, Plugin } from './types';
import { applyPlugins } from '../utils';

export class Carousel {
  private state: CarouselState;

  constructor(container: HTMLElement, options: CarouselOptions, plugins: Plugin[] = []) {
    const track = container.querySelector('.carousel-track') as HTMLElement;

    this.state = {
      slides: Array.from(track.children) as HTMLElement[],
      currentIndex: options.initialSlide || 0,
      interval: options.interval || 3000,
      timer: null,
      slidesPerView: options.slidesPerView || 1,
      track,
    };

    // nextSlide と prevSlide メソッドを state に追加
    this.state.nextSlide = () => this.nextSlide();
    this.state.prevSlide = () => this.prevSlide();

    if (plugins) {
      this.state = applyPlugins(plugins)(this.state);
    }
    if (this.state.showSlide) {
      this.state.showSlide(this.state.currentIndex);  // showSlideメソッドの呼び出し
    }
  }

  public showSlide(index: number) {
    const track = this.state.track;
    const slideWidth = track.clientWidth / this.state.slidesPerView;
    const translateX = index * -slideWidth;
    track.style.transform = `translateX(${translateX}px)`;
    this.state.currentIndex = index;
  }

  public nextSlide() {
    const nextIndex = Math.min(this.state.currentIndex + 1, this.state.slides.length - this.state.slidesPerView);
    this.showSlide(nextIndex);
    return this.state;
  }

  public prevSlide() {
    const prevIndex = Math.max(this.state.currentIndex - 1, 0);
    this.showSlide(prevIndex);
    return this.state;
  }
}
