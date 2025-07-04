import { Component } from '@angular/core';
import { NgSplitComponent } from '../../lib/ng-split/ng-split/ng-split.component';
import { NgSplitPanelComponent } from '../../lib/ng-split/ng-split-panel/ng-split-panel.component';

@Component({
  selector: 'app-horizontal',
  imports: [NgSplitComponent, NgSplitPanelComponent],
  templateUrl: './horizontal.component.html',
  styleUrl: './horizontal.component.scss',
})
export class HorizontalComponent { }
