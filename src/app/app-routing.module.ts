import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'homepage'
      },
      {
        path: 'homepage',
        loadChildren: './modules/homepage/homepage.module#HomepageModule'
      },
      {
        path: 'auth',
        loadChildren: './modules/auth/auth.module#AuthModule'
      },
      {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/homepage'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
