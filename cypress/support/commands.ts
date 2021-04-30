// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("verifyOpeningNewPage", (label: string, url: string) => {
    return cy.get('a').contains(label).should($a => {
        // Verify that clicking the url is opening a new window for the page
        expect($a.attr('href'), 'href').to.equal(url);
        expect($a.attr('target'), 'target').to.equal('_blank');
        // As Cypress is not supporting muliple tabs, just either change the value of the attr "target" to "self" 
        // or remove the attr to proceed to the Careers page without launching a new tab
        $a.attr('target', '_self');
    })
})

Cypress.Commands.add("clearAllCookies", () => {
    if (Cypress.isBrowser('firefox')) {
        cy.getCookies({log: false}).then((cookies) =>
            cookies.forEach((cookie) => cy.clearCookie(cookie.name, {log: false})),
        );
        cy.log('clearCookies');
    } else {
        cy.clearCookies();
    }
})
