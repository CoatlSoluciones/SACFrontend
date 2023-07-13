import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminusersComponent } from './admin-users/admin-users.component';

const routes = [
    {
        path: 'admin',
        component: AdminusersComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}