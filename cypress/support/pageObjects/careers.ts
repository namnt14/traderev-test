export class CareersPage {
    static url: string = 'https://work.traderev.com/';

    open () {
        cy.visit(CareersPage.url);
    }

    getTextWidget() {
        return cy.get('.textwidget');
    }

    getFeatureCalloutCover() {
        return cy.get('.feature-callout-cover');
    }

    getHeaderTitle() {
        return this.getFeatureCalloutCover().find('.header__title');
    }

    getVideoPlayer() {
        return cy.get('#player');
    }

    getWidgetSlider() {
        return cy.get('.jobify_widget_slider_generic');
    }

    getConnectTitle() {
        return cy.get('.connect__title');
    }

    getNewsArticle() {
        return cy.get('.news__article');
    }
}
