import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {
    component: FavoritesComponent,
    path: 'favorites',
  },
  {
    component: FavoritesComponent,
    path: 'favorites/:id',
  },
  {
    component: SearchComponent,
    path: '',
    pathMatch: 'full',
  },
  {
    component: NotFoundComponent,
    path: '**',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class PhotoRoutingModule {}
