import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { FavoritesFacade } from '../../state/favorites/favorites.facade';
import { FavoritesEntity } from '../../state/favorites/favorites.models';
import { PhotosFacade } from '../../state/photo/photos.facade';
import { FavoriteGroupFormValues } from '../favorite-group-form/favorite-group-form.component';

@Component({
  selector: 'image-search-favorite-group',
  templateUrl: './favorite-group.component.html',
  styleUrls: ['./favorite-group.component.scss'],
})
export class FavoriteGroupComponent implements OnInit {
  @Input() favorite: FavoritesEntity;

  favorite$: Observable<FavoritesEntity>;
  photos$ = this.photosFacade.photos$;

  constructor(
    private route: ActivatedRoute,
    private photosFacade: PhotosFacade,
    private favoritesFacade: FavoritesFacade
  ) {}

  ngOnInit(): void {
    this.favorite$ = this.route.paramMap.pipe(
      map((params) => params.get('id')),
      filter((id) => id != null),
      tap((id) => this.photosFacade.loadFavorite(id)),
      withLatestFrom(this.favoritesFacade.favorites$),
      map(([id, favorites]) => favorites.find((favorite) => favorite.id == id))
    );
  }

  onSave({ name, description }: FavoriteGroupFormValues) {
    // TODO: Update group details
  }
}
