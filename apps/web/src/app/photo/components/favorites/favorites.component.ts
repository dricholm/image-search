import { Component } from '@angular/core';
import { FavoritesFacade } from '../../state/favorites/favorites.facade';

@Component({
  selector: 'image-search-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  constructor(private favoritesFacade: FavoritesFacade) {}

  favorites$ = this.favoritesFacade.favorites$;
}
