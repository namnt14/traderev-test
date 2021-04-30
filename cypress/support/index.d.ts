/// <reference types="cypress" />

interface Filter {
    "location"?: string,
    "team"?: string,
    "workType"?: string,
  }

declare namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom commands.
       * @example cy.verifyOpeningNewPage("Careers", "'https://work.traderev.com/")
      */
       verifyOpeningNewPage(label: string, url: string): Chainable<Subject>
      /**
       * Custom commands.
       * @example cy.clearAllCookies()
      */
       clearAllCookies(): Chainable<Subject>
    }
}
