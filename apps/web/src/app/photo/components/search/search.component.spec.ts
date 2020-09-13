import { render, screen } from '@testing-library/angular';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  it('should display search and favorites', async () => {
    await render(SearchComponent);

    expect(screen.getByLabelText(/keyword/i));
  });
});
