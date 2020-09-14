import { Component, Input } from '@angular/core';
import { FavoritesFacade } from '../../state/favorites/favorites.facade';
import { FavoritesEntity } from '../../state/favorites/favorites.models';
import { FavoriteGroupFormValues } from '../favorite-group-form/favorite-group-form.component';

@Component({
  selector: 'image-search-favorite-modal',
  templateUrl: './favorite-modal.component.html',
  styleUrls: ['./favorite-modal.component.scss'],
})
export class FavoriteModalComponent {
  constructor(private favoritesFacade: FavoritesFacade) {}

  @Input() id: string;

  favorites$ = this.favoritesFacade.favorites$;

  onRemove(fav: FavoritesEntity) {
    this.favoritesFacade.removeFavorite(fav.id, this.id);
  }

  onAdd(fav: FavoritesEntity) {
    this.favoritesFacade.addFavorite(fav.id, this.id);
  }

  onCreate({ name, description }: FavoriteGroupFormValues) {
    this.favoritesFacade.createFavoriteList(name, description, this.id);
  }

  contains(group: FavoritesEntity): boolean {
    return group.photoIds.includes(this.id);
  }
}
