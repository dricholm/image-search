import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  exports: [RouterModule, ReactiveFormsModule, NotFoundComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
