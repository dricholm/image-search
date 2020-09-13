import { render, screen } from '@testing-library/angular';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  it('should display not found and link to home page', async () => {
    await render(NotFoundComponent, { routes: [] });

    expect(screen.getAllByText(/not found/i));
    expect(screen.getByRole(/link/i, { name: /home page/i }));
  });
});
