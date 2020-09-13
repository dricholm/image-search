import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const appRoutes: Routes = [
  {
    loadChildren: () =>
      import('./photo/photo.module').then((m) => m.PhotoModule),
    path: 'photos',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'photos',
  },
  {
    component: NotFoundComponent,
    path: '**',
    data: {
      title: 'General.NotFoundTitle',
    },
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' }),
  ],
})
export class AppRoutingModule {}
