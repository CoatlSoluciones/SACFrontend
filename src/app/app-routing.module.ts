import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'admin/users',
        loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule)
      },
      {
        path: 'admin/players',
        loadChildren: () => import('./modules/players/players.module').then((m) => m.PlayersModule)
      },
      {
        path: 'admin/teams',
        loadChildren:() => import('./modules/teams/teams.module').then((m) => m.TeamsModule)
      }
/*       {
        path: '**',
        loadChildren: () => import('./modules/not-found/not-found.module').then(m => m.NotFoundModule)
      } */
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
