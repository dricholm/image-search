import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PhotoCardComponent } from './components/photo-card/photo-card.component';
import { SearchComponent } from './components/search/search.component';
import { PhotoRoutingModule } from './photo-routing.module';
import { PhotoListComponent } from './components/photo-list/photo-list.component';

@NgModule({
  declarations: [SearchComponent, PhotoCardComponent, PhotoListComponent],
  imports: [CommonModule, PhotoRoutingModule, SharedModule],
})
export class PhotoModule {}
