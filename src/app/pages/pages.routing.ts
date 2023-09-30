import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { DreamsPagesComponent } from './dreams-pages/dreams-pages.component';
import { DreamsPagesAddComponent } from './dreams-pages-add/dreams-pages-add.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfigComponent } from './config/config.component';



export const PagesRoutes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: 'icons/material',
      //   component: MatIconComponent,
      //   data: {
      //     title: 'Material Icons',
      //     urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Material Icons' }],
      //   },
      // },
      // {
      //   path: 'timeline',
      //   component: TimelineComponent,
      //   data: {
      //     title: 'Timeline',
      //     urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Timeline' }],
      //   },
      // },
      // {
      //   path: 'invoice',
      //   component: InvoiceComponent,
      //   data: {
      //     title: 'Invoice',
      //     urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Invoice' }],
      //   },
      // },
      // {
      //   path: 'pricing',
      //   component: PricingComponent,
      //   data: {
      //     title: 'Pricing',
      //     urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Pricing' }],
      //   },
      // },
      // {
      //   path: 'helper',
      //   component: HelperComponent,
      //   data: {
      //     title: 'Helper',
      //     urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Helper' }],
      //   },
      // },

      { path: 'dreamsPages', component: DreamsPagesComponent, data: { title: 'Paginas de Dreams', urls: [] , } , } ,
      { path: 'dreamsPages-add', component: DreamsPagesAddComponent, data: { title: 'Paginas de Dreams', urls: [ { title: 'Paginas de Dreams', url: '/pages/dreamsPages' } , { title: 'Nueva Pagina' } ] , } , } ,
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard', urls: [] , } , } ,
      { path: 'profile', component: ProfileComponent, data: { title: 'Perfil', urls: [] , } , } ,
      { path: 'config', component: ConfigComponent, data: { title: 'Configuracion', urls: [] , } , } ,
      { path: '', redirectTo: 'partners', },
    ],
  },
];
