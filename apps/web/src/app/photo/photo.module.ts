import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { PhotoCardComponent } from './components/photo-card/photo-card.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { SearchComponent } from './components/search/search.component';
import { PhotoRoutingModule } from './photo-routing.module';
import { FavoritesEffects } from './state/favorites/favorites.effects';
import { FavoritesFacade } from './state/favorites/favorites.facade';
import * as fromFavorites from './state/favorites/favorites.reducer';
import { PhotosEffects } from './state/photo/photos.effects';
import { PhotosFacade } from './state/photo/photos.facade';
import * as fromPhotos from './state/photo/photos.reducer';
import { FavoriteModalComponent } from './components/favorite-modal/favorite-modal.component';
import { FavoriteGroupComponent } from './components/favorite-group/favorite-group.component';
import { FavoriteGroupFormComponent } from './components/favorite-group-form/favorite-group-form.component';

@NgModule({
  declarations: [
    SearchComponent,
    PhotoCardComponent,
    PhotoListComponent,
    FavoritesComponent,
    FavoriteModalComponent,
    FavoriteGroupComponent,
    FavoriteGroupFormComponent,
  ],
  imports: [
    CommonModule,
    PhotoRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromPhotos.PHOTOS_FEATURE_KEY, fromPhotos.reducer),
    EffectsModule.forFeature([PhotosEffects]),
    StoreModule.forFeature(
      fromFavorites.FAVORITES_FEATURE_KEY,
      fromFavorites.reducer
    ),
    EffectsModule.forFeature([FavoritesEffects]),
  ],
  providers: [PhotosFacade, FavoritesFacade],
})
export class PhotoModule {}
