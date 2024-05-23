const url = 'http://localhost:4000';

const elementUpSelector = '[data-cy="constructor-element-up"]';
const elementDownSelector = '[data-cy="constructor-element-down"]';
const modalSelector = '[data-cy="modal"]';
const modalCloseSelector = '[data-cy="modal-close-btn"]';

describe('E2E Test', () => {

  beforeEach(() => {
    cy.visit(url);

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'fetchIngredients'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );

    cy.get('[data-cy="643d69a5c3f7b9001cfa093c"]').as('bun');
    cy.get('[data-cy="643d69a5c3f7b9001cfa0941"]').as('main');
  });

  it('Проверка доступа localhost:4000', () => {
    cy.visit(url);
    cy.viewport(1280, 720);
    cy.get('#root').should('exist');
  });

  describe('Добавление ингредиентов', () => {
    it('Добавление булки', () => {
      cy.get('@bun')
        .contains('Добавить')
        .click();
        
      cy.get(elementUpSelector).contains(
        'Краторная булка N-200i'
      );
      cy.get(elementDownSelector).contains(
        'Краторная булка N-200i'
      );
    });
    it('Добавление начинки', () => {
      cy.get('@main')
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
      cy.get('@main').find('a').click();
      cy.get(modalSelector).should('exist');
    });
    it('Закрытие модали ингредиента по крестику', () => {
      cy.get('@main').find('a').click();
      cy.get(modalCloseSelector).should('exist').click();
      cy.get(modalSelector).should('not.exist');
    });
    it('Закрытие модали ингредиента по оверлею', () => {
      cy.get('@main').find('a').click();
      cy.get('body').click(25, 25);
      cy.get(modalSelector).should('not.exist');
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
      cy.get('@bun')
        .contains('Добавить')
        .click();
      cy.get('@main')
        .contains('Добавить')
        .click();
      cy.get('[data-cy="643d69a5c3f7b9001cfa093e"]')
        .contains('Добавить')
        .click();

      cy.get('[data-cy="create-order-btn"]').should('exist').click();

      cy.get(modalSelector).contains('40506');
      cy.get(modalCloseSelector).click();
      cy.get(modalSelector).should('not.exist');

      cy.get(elementUpSelector).should('not.exist');
      cy.get(elementDownSelector).should('not.exist');
      cy.get('[data-cy="constructor-element-main-container"]')
        .find('li')
        .should('not.exist');
    });
  });
});
