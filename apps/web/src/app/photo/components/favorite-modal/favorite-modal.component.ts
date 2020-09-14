import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FavoritesFacade } from '../../state/favorites/favorites.facade';
import { FavoritesEntity } from '../../state/favorites/favorites.models';

@Component({
  selector: 'image-search-favorite-modal',
  templateUrl: './favorite-modal.component.html',
  styleUrls: ['./favorite-modal.component.scss'],
})
export class FavoriteModalComponent {
  constructor(private favoritesFacade: FavoritesFacade) {}

  @Input() id: string;

  favorites$ = this.favoritesFacade.favorites$;

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  onRemove(fav: FavoritesEntity) {
    this.favoritesFacade.removeFavorite(fav.id, this.id);
  }

  onAdd(fav: FavoritesEntity) {
    this.favoritesFacade.addFavorite(fav.id, this.id);
  }

  onCreate() {
    if (this.createForm.invalid) {
      return;
    }
    // TODO: Validate name, call facade
    this.favoritesFacade.createFavoriteList(
      this.createForm.get('name').value,
      this.createForm.get('description').value,
      this.id
    );
  }

  contains(group: FavoritesEntity): boolean {
    return group.photoIds.includes(this.id);
  }
}
