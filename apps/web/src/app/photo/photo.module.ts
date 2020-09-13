import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PhotoCardComponent } from './components/photo-card/photo-card.component';
import { SearchComponent } from './components/search/search.component';
import { PhotoRoutingModule } from './photo-routing.module';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPhotos from './state/photo/photos.reducer';
import { PhotosEffects } from './state/photo/photos.effects';
import { PhotosFacade } from './state/photo/photos.facade';

@NgModule({
  declarations: [SearchComponent, PhotoCardComponent, PhotoListComponent],
  imports: [
    CommonModule,
    PhotoRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromPhotos.PHOTOS_FEATURE_KEY, fromPhotos.reducer),
    EffectsModule.forFeature([PhotosEffects]),
  ],
  providers: [PhotosFacade],
})
export class PhotoModule {}
