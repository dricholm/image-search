import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'image-search-favorite-group-form',
  templateUrl: './favorite-group-form.component.html',
  styleUrls: ['./favorite-group-form.component.scss'],
})
export class FavoriteGroupFormComponent implements OnChanges {
  @Input() name = '';
  @Input() description = '';
  @Output() formSubmit = new EventEmitter<FavoriteGroupFormValues>();

  form = new FormGroup({
    name: new FormControl(this.name, [Validators.required]),
    description: new FormControl(this.description),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['name']?.currentValue) {
      this.form.get('name').setValue(changes['name'].currentValue);
    }
    if (changes['description']?.currentValue) {
      this.form
        .get('description')
        .setValue(changes['description'].currentValue);
    }
  }

  get shouldUpdate(): boolean {
    return this.name != '';
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.formSubmit.emit(this.form.value);
  }
}

export interface FavoriteGroupFormValues {
  name: string;
  description: string;
}
