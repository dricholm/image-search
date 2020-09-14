import { Component, OnInit } from '@angular/core';
import { FavoritesFacade } from '../../state/favorites/favorites.facade';
import { PhotosFacade } from '../../state/photo/photos.facade';

@Component({
  selector: 'image-search-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  constructor(
    private photosFacade: PhotosFacade,
    private favoritesFacade: FavoritesFacade
  ) {}

  favorites$ = this.favoritesFacade.favorites$;

  ngOnInit() {
    this.photosFacade.clear();
  }
}
