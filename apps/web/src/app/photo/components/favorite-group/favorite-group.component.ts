import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FavoritesFacade } from '../../state/favorites/favorites.facade';
import { FavoritesEntity } from '../../state/favorites/favorites.models';
import { PhotosFacade } from '../../state/photo/photos.facade';
import { FavoriteGroupFormValues } from '../favorite-group-form/favorite-group-form.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'image-search-favorite-group',
  templateUrl: './favorite-group.component.html',
  styleUrls: ['./favorite-group.component.scss'],
})
export class FavoriteGroupComponent implements OnChanges {
  @Input() list: FavoritesEntity;

  photos$ = this.photosFacade.photos$;

  constructor(
    private photosFacade: PhotosFacade,
    private favoritesFacade: FavoritesFacade
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const previous: FavoritesEntity = changes['list'].previousValue;
    const current: FavoritesEntity = changes['list'].currentValue;
    if (previous?.id !== current?.id) {
      this.photosFacade.loadFavorite(this.list.id);
    }
  }

  onSave({ name, description }: FavoriteGroupFormValues) {
    this.favoritesFacade.editFavoriteList(this.list.id, name, description);
  }
}
