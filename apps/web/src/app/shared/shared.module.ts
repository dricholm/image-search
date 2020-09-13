import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  exports: [RouterModule, NotFoundComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
