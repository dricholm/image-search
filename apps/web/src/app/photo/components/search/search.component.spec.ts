import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { of } from 'rxjs';
import { PhotosFacade } from '../../state/photo/photos.facade';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  it('should search keyword', async () => {
    const search = jest.fn();
    const keyword = 'search-keyword';

    await render(SearchComponent, {
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: PhotosFacade,
          useValue: {
            clear: jest.fn(),
            loading$: of([false]),
            photos$: of([]),
            search: search,
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    const searchInput = screen.getByLabelText(/search/i);

    userEvent.type(searchInput, keyword);
    fireEvent.blur(searchInput);

    userEvent.click(screen.getByRole('button'));
    expect(search).toHaveBeenCalledWith(keyword);
  });
});
