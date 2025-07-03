import { Directive, ElementRef, inject, output } from '@angular/core';
import { ResizeObserverService } from './resize-observer.service';

@Directive({
  selector: '[appResizeObserver]',
})
export class ResizeObserverDirective {
  observer = inject(ResizeObserverService);
  el = inject(ElementRef);

  size = output<{ width: number; height: number }>();

  ngAfterViewInit() {
    this.observer.observe(this.el.nativeElement, (w: number, h: number) => {
      this.size.emit({ width: w, height: h });
    });
  }
}
