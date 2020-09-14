import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  ngOnInit(): void {
    this.photosFacade.clear();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.photosFacade.search(this.form.get('keyword').value);
  }
}
