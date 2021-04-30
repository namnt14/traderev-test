export class HomePage {
    open () {
        cy.visit('/');
    }

    getNavToggle() {
        return cy.get('.nav-toggle');
    }
}
