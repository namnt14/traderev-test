/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

import { CanadianJobsPage } from '../support/pageObjects/canadianJobs';

const canadianJobs = new CanadianJobsPage();

describe("Scenario 2", () => {
    beforeEach(() => {
        canadianJobs.open();
    })

    afterEach(() => { 
        cy.clearAllCookies();         
    })

    it("Filtering by Toronto should show jobs based in Toronto only", () => {
        const testFilter: Filter = { 'location': 'Toronto, Ontario, Canada' };

        // Apply the filter by location with Toronto, Ontario, Canada
        canadianJobs.selectFilter(testFilter);
    
        // Check if all the shown jobs are based in Toronto, Ontario, Canada 
        canadianJobs.checkJobByFilter(testFilter);
    
        cy.get('@isFilteredByLocation').then((isFilteredByLocation) => {
            // Expect all the displayed job results must meet the requirement of being filtered by the provided location
            expect(isFilteredByLocation).to.be.true;
            canadianJobs.logResultToConsole(testFilter);
        })
    })
})
