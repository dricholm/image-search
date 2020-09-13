import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { NavComponent } from './core/components/nav/nav.component';

describe('AppComponent', () => {
  it('should display navbar and main content', async () => {
    await render(AppComponent, { declarations: [NavComponent], routes: [] });

    expect(screen.getByRole(/nav/i));
    expect(screen.getByRole(/main/i));
  });
});
