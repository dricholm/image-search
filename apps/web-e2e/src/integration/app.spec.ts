import { getAlert, getForm } from '../support/app.po';

describe('web', () => {
  beforeEach(() => cy.visit('/'));

  it('should search for keyword and display empty search results', () => {
    const keyword = 'Test';
    cy.server();
    cy.route({
      method: 'GET',
      response: { photos: [] },
      status: 200,
      url: `**/photos/search?keyword=${keyword}`,
    }).as('search');

    getForm().find('[type="text"]').type(keyword);
    getForm().submit();
    cy.wait('@search');

    getAlert().should('contain', 'No photos');
  });
});
