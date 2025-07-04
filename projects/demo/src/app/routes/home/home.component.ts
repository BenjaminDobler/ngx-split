import { Component } from '@angular/core';
import { NgSplitComponent } from '../../lib/ng-split/ng-split/ng-split.component';
import { NgSplitPanelComponent } from '../../lib/ng-split/ng-split-panel/ng-split-panel.component';

@Component({
  selector: 'app-home',
  imports: [NgSplitComponent, NgSplitPanelComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
