import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
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
  favorite$: Observable<FavoritesEntity>;
  photos$ = this.photosFacade.photos$;
  currentId: string;

  constructor(
    private route: ActivatedRoute,
    private photosFacade: PhotosFacade,
    private favoritesFacade: FavoritesFacade
  ) {}

  ngOnInit(): void {
    this.favorite$ = combineLatest([
      this.route.paramMap.pipe(
        map((params) => params.get('id')),
        filter((id) => id != null)
      ),
      this.favoritesFacade.favorites$,
    ]).pipe(
      tap(([id]) => {
        this.currentId = id;
        this.photosFacade.loadFavorite(id);
      }),
      map(([id, favorites]) => favorites.find((favorite) => favorite.id == id))
    );
  }

  onSave({ name, description }: FavoriteGroupFormValues) {
    if (this.currentId == null) {
      return;
    }
    this.favoritesFacade.editFavoriteList(this.currentId, name, description);
  }
}
