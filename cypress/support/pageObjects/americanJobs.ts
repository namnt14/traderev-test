export class AmericanJobsPage {
    static url: string = 'https://kar.wd1.myworkdayjobs.com/en-US/KAR_Careers';
    open () {
        cy.visit(AmericanJobsPage.url);
    }
}
