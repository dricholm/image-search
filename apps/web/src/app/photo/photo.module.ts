import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './components/search/search.component';
import { PhotoRoutingModule } from './photo-routing.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, PhotoRoutingModule, SharedModule],
})
export class PhotoModule {}
