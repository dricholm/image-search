import { ReactiveFormsModule } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { FavoriteGroupFormComponent } from './favorite-group-form.component';

describe('FavoriteGroupFormComponent', () => {
  it('should display and submit edited form', async () => {
    const submit = jest.fn();

    const name = 'custom-name';
    const description = 'custom-desc';
    const newName = 'new-name';
    const newDescription = 'new-desc';
    await render(FavoriteGroupFormComponent, {
      imports: [ReactiveFormsModule],
      componentProperties: {
        name,
        description,
        submit: {
          emit: submit,
        } as any,
      },
    });

    const nameInput = screen.getByLabelText(/name/i);
    const descInput = screen.getByLabelText(/description/i);
    expect(nameInput).toHaveValue(name);
    expect(descInput).toHaveValue(description);

    userEvent.clear(nameInput);
    userEvent.type(nameInput, newName);
    fireEvent.blur(nameInput);
    userEvent.clear(descInput);
    userEvent.type(descInput, newDescription);
    fireEvent.blur(descInput);

    userEvent.click(screen.getByText(/save/i));
    expect(submit).toHaveBeenCalledWith({
      name: newName,
      description: newDescription,
    });
  });
});
