import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinct, filter, withLatestFrom } from 'rxjs/operators';
import { PhotosFacade } from '../../state/photo/photos.facade';

@Component({
  selector: 'image-search-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  constructor(private photosFacade: PhotosFacade) {}

  form = new FormGroup({
    keyword: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });
  lastSearch: string;

  ngOnInit(): void {
    this.photosFacade.clear();
    this.form
      .get('keyword')
      .valueChanges.pipe(
        debounceTime(1500),
        distinct(),
        withLatestFrom(this.photosFacade.loading$),
        filter(([value, loading]) => !loading && value != this.lastSearch)
      )
      .subscribe((_) => {
        this.onSubmit();
      });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.lastSearch = this.form.get('keyword').value;
    this.photosFacade.search(this.lastSearch);
  }
}
