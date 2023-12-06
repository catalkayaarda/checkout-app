import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { DepositComponent } from './deposit.component';
import { DepositSuccessComponent } from './success/success.component';
import { DepositFailComponent } from './fail/fail.component';

const routes: Routes = [
  {
    path: '',
    component: DepositComponent,
    children: [
      {
        path: '',
        redirectTo: 'success',
        pathMatch: 'full',
      },
      {
        path: 'success',
        component: DepositSuccessComponent,
      },
      {
        path: 'fail',
        component: DepositFailComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositRoutingModule {}
