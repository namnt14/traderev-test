/// <reference types="cypress" />
/// <reference path=
import { HomePage } from '../support/pageObjects/home';
import { CareersPage } from '../support/pageObjects/careers';
import { CanadianJobsPage } from '../support/pageObjects/canadianJobs';
import { AmericanJobsPage } from '../support/pageObjects/americanJobs';

const home = new HomePage();
const careers = new CareersPage();
const canadianJobs = new CanadianJobsPage();

describe("Scenario 1", () => {
    beforeEach(() => {
        home.open();
        home.getNavToggle().click();
        cy.verifyOpeningNewPage('Careers', CareersPage.url).click();
    })

    afterEach(() => { 
        cy.clearAllCookies();         
    })

    it("Should open the Careers page properly", () => {
        // Verify the Careers page is displayed
        cy.location('href').should('equal', CareersPage.url);
        cy.title().should('equal', 'work.traderev.com – Revolutionizing Automotive Sales');
        cy.verifyOpeningNewPage('Canadian Opportunities', CanadianJobsPage.url);
        cy.verifyOpeningNewPage('U.S. Opportunities', AmericanJobsPage.url);

        careers.getFeatureCalloutCover().then($cover => {
            expect($cover.attr('style')).to.include('header-homepage.jpg');
        });
        careers.getHeaderTitle().should('have.text', 'Reinventing automotive sales');

        careers.getVideoPlayer().then($player => {
            expect($player.attr('src'), 'src').to.include('https://www.youtube.com/embed/');
        });

        careers.getTextWidget().then($textWidgets => {
            expect($textWidgets.length).to.equal(6);
        })

        careers.getNewsArticle().then($newsArticles => {
            expect($newsArticles.length).to.equal(2);
        })

        careers.getWidgetSlider().should('be.exist');
        // Verify scrolling works properly
        cy.scrollTo('bottom')
        careers.getConnectTitle().should('be.visible');
    })

    it("Should open the Canadian Jobs page properly", () => {
        cy.verifyOpeningNewPage('Canadian Opportunities', CanadianJobsPage.url).click();
        // Verify the Canadian Jobs page is displayed
        cy.location('href').should('equal', CanadianJobsPage.url);
        cy.title().should('equal', 'TradeRev');
        
        canadianJobs.getFitlerBar().should('be.visible');
        canadianJobs.getFilterByLocation().should('be.visible');
        canadianJobs.getFilterByTeam().should('be.visible');
        canadianJobs.getFilterByWorkType().should('be.visible');

        canadianJobs.getPostingGroups()?.each(($postingGroup) => {
            cy.wrap($postingGroup).within(() => {
                canadianJobs.getPostingCategoryTitle().should('be.exist');
                canadianJobs.getPosting().each(($posting) => {
                    cy.wrap($posting).within(() => {
                        canadianJobs.getPostingApply().should('be.exist').then(($postingApply) => {
                            cy.wrap($postingApply).find('a').then($a => {
                                expect($a.attr('href'), 'href').to.include(CanadianJobsPage.url);
                                expect($a.text()).to.equal('Apply');
                                return $a.attr('href');
                            }).as('hrefValue')
                        })
                        canadianJobs.getPostingTitle().should('be.exist').then(($postingTitle) => {
                            cy.get('@hrefValue').then((hrefValue) => {
                                // Verify that the link in Apply button is the same as the one in the job title
                                expect($postingTitle.attr('href'), 'href').to.equals(hrefValue);
                            })
                            canadianJobs.getPostingName().should('be.exist');
                        })
                    })
                })
            })
        })
        // Verify scrolling works properly
        cy.scrollTo('bottom')
        cy.get('a[href="https://lever.co/"]').should('be.visible');
    })
})
