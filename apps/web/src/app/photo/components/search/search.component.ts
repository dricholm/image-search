import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PhotosFacade } from '../../state/photo/photos.facade';

@Component({
  selector: 'image-search-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  constructor(private photosFacade: PhotosFacade) {}

  form = new FormGroup({
    keyword: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  initialized$ = this.photosFacade.initialized$;
  error$ = this.photosFacade.error$;
  loading$ = this.photosFacade.loading$;
  photos$ = this.photosFacade.photos$;

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.photosFacade.search(this.form.get('keyword').value);
  }
}
