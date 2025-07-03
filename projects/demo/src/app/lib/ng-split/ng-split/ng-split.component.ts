import {
  Component,
  contentChildren,
  effect,
  HostListener,
  input,
  signal,
} from '@angular/core';
import { NgSplitPanelComponent } from '../ng-split-panel/ng-split-panel.component';
import { DraggerDirective } from '../../rx-drag/dragger.directive';
import { ResizeObserverDirective } from '../../resize-observer/resize-observer.directive';

class Divider {
  position: number = 0;
  height = 0;
  width = 0;
  x = 0;
  y = 0;
  maxX = 0;
  minX = 0;
  maxY = 0;
  minY = 0;
}

@Component({
  selector: 'ng-split',
  imports: [DraggerDirective],
  templateUrl: './ng-split.component.html',
  styleUrl: './ng-split.component.scss',
  hostDirectives: [
    {
      directive: ResizeObserverDirective,
      outputs: ['size'],
    },
  ],
})
export class NgSplitComponent {
  panels = contentChildren<NgSplitPanelComponent>(NgSplitPanelComponent, {
    descendants: false,
  });
  dividers: Divider[] = [];
  height = signal(500);
  width = signal(800);
  sizes: number[] = [];
  direction = input<'vertical' | 'horizontal'>('horizontal');
  dividerSize = input(10);

  constructor() {
    effect(() => {
      const p = this.panels();
      this.updateLayout();
    });
  }

  contentWidth() {
    return this.width() - (this.panels().length - 1) * this.dividerSize();
  }

  contentHeight() {
    return this.height() - (this.panels().length - 1) * this.dividerSize();
  }

  initialLayout = true;
  previousContentWidth = 0;
  previousContentHeihgt = 0;
  updateLayout() {
    const p = this.panels();
    const widthWithoutDivider = this.contentWidth();
    const heightWithoutDivider = this.contentHeight();

    this.dividers = [];
    if (this.direction() === 'horizontal') {
      this.sizes = [];

      // layout dividers
      for (let i = 0; i < p.length - 1; i++) {
        const d = new Divider();
        d.height = this.height();
        d.width = this.dividerSize();
        this.dividers.push(d);
      }

      let x = 0;
      const flexSum = p.reduce((prev, curr) => {
        return prev + curr.flex();
      }, 0);

      p.forEach((panel, i) => {
        let childPercentage = panel.flex() / flexSum;
        if (!this.initialLayout) {
          childPercentage = panel.width() / this.previousContentWidth;
        }

        let w = widthWithoutDivider * childPercentage;

        const panelX = x + i * this.dividerSize();

        panel.width.set(w);
        panel.height.set(this.height());
        panel.x.set(panelX);
        if (i < p.length - 1) {
          this.dividers[i].x = panelX + w;
          if (i > 0) {
            this.dividers[i - 1].maxX = this.dividers[i].x - this.dividerSize();
            this.dividers[i].minX = this.dividers[i - 1].x + this.dividerSize();
            this.dividers[i].maxX = this.width() - this.dividerSize();
          } else {
            this.dividers[i].minX = 0;
            this.dividers[i].maxX = this.width() - this.dividerSize();
          }
        }

        x += w;
      });
    } else {
      this.sizes = [];

      for (let i = 0; i < p.length - 1; i++) {
        const d = new Divider();
        d.height = this.dividerSize();
        d.width = this.width();
        this.dividers.push(d);
      }

      let x = 0;
      const flexSum = p.reduce((prev, curr) => {
        return prev + curr.flex();
      }, 0);
      let y = 0;
      p.forEach((panel, i) => {
        let childPercentage = panel.flex() / flexSum;
        if (!this.initialLayout) {
          childPercentage = panel.height() / this.previousContentHeihgt;
        }

        const h = heightWithoutDivider * childPercentage;
        const panelY = y + i * this.dividerSize();

        panel.height.set(h);
        panel.width.set(this.width());

        panel.y.set(panelY);
        if (i < p.length - 1) {
          this.dividers[i].y = panelY + h;
          if (i > 0) {
            this.dividers[i - 1].maxY = this.dividers[i].y - this.dividerSize();
            this.dividers[i].minY = this.dividers[i - 1].y + this.dividerSize();
            this.dividers[i].maxY = this.height() - this.dividerSize();
          } else {
            this.dividers[i].minY = 0;
            this.dividers[i].maxY = this.height() - this.dividerSize();
          }
        }
        y += h;
      });
    }
    this.previousContentWidth = widthWithoutDivider;
    this.previousContentHeihgt = heightWithoutDivider;

    this.initialLayout = false;
  }

  @HostListener('size', ['$event'])
  onSizeChanged(size: { width: number; height: number }) {
    this.width.set(size.width);
    this.height.set(size.height);
    this.updateLayout();
  }

  onDividerUpdated(pos: { x: number; y: number }, dividerIndex: number) {
    const numDivider = this.panels().length - 1;

    if (this.direction() === 'horizontal') {
      if (dividerIndex < numDivider - 1) {
        const nextDivider = this.dividers[dividerIndex + 1];
        nextDivider.minX = pos.x + this.dividerSize();
        if (dividerIndex !== 0) {
          const prevDivider = this.dividers[dividerIndex - 1];
          prevDivider.maxX = pos.x - this.dividerSize();
        }
      } else if (dividerIndex !== 0) {
        const prevDivider = this.dividers[dividerIndex - 1];
        prevDivider.maxX = pos.x - this.dividerSize();
      }

      this.dividers[dividerIndex].x = pos.x;

      let nextX = this.width();
      if (dividerIndex < this.dividers.length - 1) {
        const nextDivider = this.dividers[dividerIndex + 1];
        nextX = nextDivider.x;
      }
      const prev = this.panels()[dividerIndex];
      const next = this.panels()[dividerIndex + 1];

      prev.width.set(pos.x - prev.x());
      next.x.set(pos.x + this.dividerSize());
      next.width.set(nextX - pos.x - this.dividerSize());
    } else {
      if (dividerIndex < numDivider - 1) {
        const nextDivider = this.dividers[dividerIndex + 1];
        nextDivider.minY = pos.y + this.dividerSize();
        if (dividerIndex !== 0) {
          const prevDivider = this.dividers[dividerIndex - 1];
          prevDivider.maxY = pos.y - this.dividerSize();
        }
      } else if (dividerIndex !== 0) {
        const prevDivider = this.dividers[dividerIndex - 1];
        prevDivider.maxY = pos.y - this.dividerSize();
      }

      this.dividers[dividerIndex].y = pos.y;

      let nextY = this.height();
      if (dividerIndex < this.dividers.length - 1) {
        const nextDivider = this.dividers[dividerIndex + 1];
        nextY = nextDivider.y;
      }
      const prev = this.panels()[dividerIndex];
      const next = this.panels()[dividerIndex + 1];
      prev.height.set(pos.y - prev.y());
      next.y.set(pos.y + this.dividerSize());
      next.height.set(nextY - pos.y - this.dividerSize());
    }
    this.updateLayout();
  }
}
