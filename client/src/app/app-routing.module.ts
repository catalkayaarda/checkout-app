import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { AuthGuardService } from './core/http/auth/auth.guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  {
    path: 'public',
    loadChildren: () => import('./modules/public/public.module').then((m) => m.PublicModule),
  },
  {
    canActivate: [AuthGuardService],
    path: 'paypango-wallet',
    loadChildren: () => import('./modules/paypango-wallet/paypango-wallet.module').then((m) => m.PaypangoWalletModule),
  },

  {
    canActivate: [AuthGuardService],
    path: 'deposit',
    loadChildren: () => import('./modules/deposit/deposit.module').then((m) => m.DepositModule),
  },

  { path: '**', redirectTo: 'public' },
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
