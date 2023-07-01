import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { StartComponent } from './modules/home/start/start.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./modules/usersadmin/usersadmin.module').then(m => m.UsersadminModule)
      }
    ]
  },
  {
    path: '**',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: StartComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
