export class CanadianJobsPage {
    static url: string = 'https://jobs.lever.co/traderev';
    open () {
        cy.visit(CanadianJobsPage.url);
    }

    getFitlerBar() {
        return cy.get('.filter-bar');
    }

    getFilterByLocation() {
        return cy.get('.filter-button').contains('Location', { matchCase: false});
    }

    getFilterByTeam() {
        return cy.get('.filter-button').contains('Team', { matchCase: false});
    }

    getFilterByWorkType() {
        return cy.get('.filter-button').contains('Work type', { matchCase: false});
    }

    getPostingGroups() {
        return cy.get('body').then($body => {
            const $postingGroups = $body.find('.postings-group');
            if ($postingGroups.length > 0) return cy.wrap($postingGroups);
            else return cy.wrap({});
        })
    }

    getPostingCategoryTitle() {
        return cy.get('.posting-category-title');
    }

    getPosting() {
        return cy.get('.posting');
    }

    getPostingApply() {
        return cy.get('.posting-apply');
    }

    getPostingTitle() {
        return cy.get('.posting-title');
    }

    getPostingName() {
        return this.getPostingTitle().find('[data-qa="posting-name"]');
    }

    getFilterPopup() {
        return cy.get('.filter-popup');
    }

    getSortByLocation() {
        return cy.get('body').then($body => {
            const $sortByLocation = $body.find('.sort-by-location');
            if ($sortByLocation.length > 0) return cy.wrap($sortByLocation);
            else return undefined;
        })
    }

    getSortByTeam() {
        return cy.get('body').then($body => {
            const $sortByTeam = $body.find('.sort-by-team');
            if ($sortByTeam.length > 0) return cy.wrap($sortByTeam);
            else return undefined;
        })
    }

    // As there is no element indicating the work type I would assume as following
    getSortByWorkType() {
        return cy.get('body').then($body => {
            const $sortByWorkType = $body.find('.sort-by-work-type');
            if ($sortByWorkType.length > 0) return cy.wrap($sortByWorkType);
            else return undefined;
        })
    }

    selectFilter(filter: Filter): void {
        for (const prop in filter) {
            switch (prop) {
                case 'location':
                    this.getFilterByLocation().click();
                    break;
                case 'team':
                    this.getFilterByTeam().click();
                    break;
                case 'workType':
                    this.getFilterByWorkType().click();
                    break;
                default:
                    cy.task('printToConsole', 'Invalid Filter');
                    return;
            }
            this.getFilterPopup().within(() => {
                cy.get('a').contains(filter[prop], { matchCase: false}).click();
            })
        }
    }

    checkJobByFilter(filter: Filter) {
        for (const prop in filter) {
            // Check if all the displayed jobs statified with the filtering requirements
            switch (prop) {
                case 'location':
                    this.getSortByLocation()?.then(($jobsByLocation) => $jobsByLocation.toArray().every((job) => job.textContent === filter[prop]))
                        .as('isFilteredByLocation');
                    break;
                case 'team':
                    this.getSortByTeam()?.then(($jobsByTeam) => $jobsByTeam.toArray().every((job) => job.textContent.includes(filter[prop])))
                        .as('isFilteredByTeam');
                    break;
                case 'workType':
                    this.getSortByWorkType()?.then(($jobsByWorkType) => $jobsByWorkType.toArray().every((job) => job.textContent === filter[prop]))
                        .as('isFilteredByWorkType')
                    break;
                default:
                    cy.task('printToConsole', 'Invalid Filter');
                    return;
            }
        }
    }

    // Only run this function after verifying the filters applied successfully
    logResultToConsole(filter: Filter) {
        for (const prop in filter) {
            switch (prop) {
                case 'location':
                    // Log the total available positions listed to console
                    this.getSortByLocation()?.then(($jobsByLocation) => cy.task('printToConsole', `The total available positions posted:  ${$jobsByLocation.length}`))
                    return;
                case 'team':
                    // Log the total available positions listed to console
                    this.getSortByTeam()?.then(($jobsByTeam) => cy.task('printToConsole', `The total available positions posted:  ${$jobsByTeam.length}`))
                    return;
                case 'workType':
                    // Log the total available positions listed to console
                    this.getSortByWorkType()?.then(($jobsByWorkType) => cy.task('printToConsole', `The total available positions posted:  ${$jobsByWorkType.length}`))
                    return;
                default:
                    cy.task('printToConsole', 'Invalid Filter');
                    return;
            }
        }
    }
}
