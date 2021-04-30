/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

import { CanadianJobsPage } from '../support/pageObjects/canadianJobs';

const canadianJobs = new CanadianJobsPage();

describe("Scenario 3", () => {
    beforeEach(() => {
        canadianJobs.open();
    })

    afterEach(() => { 
        cy.clearAllCookies();         
    })

    it("Filtering by Toronto and Engineering should show Enigneering jobs based in Toronto only", () => {
        const testFilter: Filter = { 'location': 'Toronto, Ontario, Canada', 'team': 'Engineering' };

        // Apply the filters by location with Toronto, Ontario, Canada and by team with Engineering
        canadianJobs.selectFilter(testFilter);

        // Check if all the shown jobs are based in Toronto, Ontario, Canada and belong to team Engineering
        canadianJobs.checkJobByFilter(testFilter);
    
        cy.get('@isFilteredByLocation').then((isFilteredByLocation) => {
            cy.get('@isFilteredByTeam').then((isFilteredByTeam) => {
                // Expect all the displayed job results must meet both the requirements of being filtered by the provided location and team
                expect(isFilteredByLocation && isFilteredByTeam).to.be.true;
                canadianJobs.logResultToConsole(testFilter);
            })
        })
    })
})
