import { Component } from '@angular/core';
import { NgSplitComponent } from './lib/ng-split/ng-split/ng-split.component';
import { NgSplitPanelComponent } from './lib/ng-split/ng-split-panel/ng-split-panel.component';

@Component({
  selector: 'app-root',
  imports: [NgSplitComponent, NgSplitPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'demo';
}
