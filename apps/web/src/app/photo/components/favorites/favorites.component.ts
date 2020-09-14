import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FavoritesFacade } from '../../state/favorites/favorites.facade';
import { FavoritesEntity } from '../../state/favorites/favorites.models';
import { PhotosFacade } from '../../state/photo/photos.facade';

@Component({
  selector: 'image-search-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private photosFacade: PhotosFacade,
    private favoritesFacade: FavoritesFacade
  ) {}

  favoriteId$: Observable<string>;
  favorites$ = this.favoritesFacade.favorites$;

  ngOnInit() {
    this.photosFacade.clear();

    this.favoriteId$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id) => id != null)
    );
  }

  getSelected(favorites: FavoritesEntity[], id: string): FavoritesEntity {
    return favorites.find((favorite) => favorite.id === id);
  }
}
