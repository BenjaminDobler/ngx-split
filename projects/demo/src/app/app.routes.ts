import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { HorizontalComponent } from './routes/horizontal/horizontal.component';

export const routes: Routes = [
  {
    path: 'horizontal',
    component: HorizontalComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },

];
