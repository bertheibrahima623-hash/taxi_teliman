import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'taxi',
    loadComponent: () => import('./taxi/taxi.page').then( m => m.TaxiPage)
  },
];
