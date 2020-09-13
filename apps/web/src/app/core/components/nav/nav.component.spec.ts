import { render, screen } from '@testing-library/angular';
import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  it('should display search and favorites', async () => {
    await render(NavComponent, { routes: [] });

    expect(screen.getByText(/search/i));
    expect(screen.getByText(/favorites/i));
  });
});
