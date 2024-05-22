const url = 'http://localhost:4000';

describe('E2E Test', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'fetchIngredients'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
  });

  it('Проверка доступа localhost:4000', () => {
    cy.visit(url);
    cy.viewport(1280, 720);
    cy.get('#root').should('exist');
  });

  describe('Добавление ингредиентов', () => {
    beforeEach(() => {
      cy.visit(url);
    });
    it('Добавление булки', () => {
      cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]')
        .contains('Добавить')
        .click();
      cy.get('[data-cy="constructor-element-up"]').contains(
        'Краторная булка N-200i'
      );
      cy.get('[data-cy="constructor-element-down"]').contains(
        'Краторная булка N-200i'
      );
    });
    it('Добавление начинки', () => {
      cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]')
        .contains('Добавить')
        .click();
      cy.get(
        '[data-cy="constructor-element-main-643d69a5c3f7b9001cfa0941"]'
      ).contains('Биокотлета из марсианской Магнолии');
    });
  });
  describe('Модали', () => {
    beforeEach(() => {
      cy.visit(url);
    });
    it('Открытие модали ингредиента', () => {
      cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]').find('a').click();
      cy.get('[data-cy="modal"]').should('exist');
    });
    it('Закрытие модали ингредиента по крестику', () => {
      cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]').find('a').click();
      cy.get('[data-cy="modal-close-btn"]').should('exist').click();
      cy.get('[data-cy="modal"]').should('not.exist');
    });
    it('Закрытие модали ингредиента по оверлею', () => {
      cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]').find('a').click();
      cy.get('body').click(25, 25);
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });
  describe('Создание заказа', () => {
    beforeEach(() => {
      cy.visit(url);
      window.localStorage.setItem('refreshToken', 'refreshToken');
      cy.setCookie('accessToken', 'accessToken');

      cy.getAllLocalStorage().should('be.not.empty');
      cy.getCookie('accessToken').should('be.not.empty');
    });

    afterEach(() => {
      cy.clearAllCookies();
      cy.clearAllLocalStorage();

      cy.getCookie('accessToken').should('be.null');
    });

    it('Проверка создания', () => {
      cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]')
        .contains('Добавить')
        .click();
      cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]')
        .contains('Добавить')
        .click();
      cy.get('[data-cy="643d69a5c3f7b9001cfa093e"]')
        .contains('Добавить')
        .click();

      cy.get('[data-cy="create-order-btn"]').should('exist').click();

      cy.get('[data-cy="modal"]').contains('40506');
      cy.get('[data-cy="modal-close-btn"]').click();
      cy.get('[data-cy="modal"]').should('not.exist');

      cy.get('[data-cy="constructor-element-up"]').should('not.exist');
      cy.get('[data-cy="constructor-element-down"]').should('not.exist');
      cy.get('[data-cy="constructor-element-main-container"]')
        .find('li')
        .should('not.exist');
    });
  });
});
