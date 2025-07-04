import { ChangeDetectionStrategy, Component, ElementRef, inject, model, signal } from '@angular/core';

@Component({
  selector: 'ng-split-panel',
  templateUrl: './ng-split-panel.component.html',
  styleUrl: './ng-split-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.width]': "width() + 'px'",
    '[style.height]': "height() + 'px'",
    '[style.transform]': '`translate(${this.x()}px, ${this.y()}px)`',
  },
})
export class NgSplitPanelComponent {
  resize = signal<'flex' | 'fixed>'>('flex');

  width = signal<number>(0);
  height = signal<number>(0);
  x = signal<number>(0);
  y = signal<number>(0);
  el = inject(ElementRef);
  flex = model<number>(1);
}
