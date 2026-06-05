import { Page } from '@playwright/test';
import CookiesObjects from '../page_elements/cookies-page-objects.json' with { type: 'json' };
import { WebCommons } from '../../commons/ui/web-commons';

export class CookiesCommonMethods {
    
    page : Page;
    web : WebCommons;

    constructor(page: Page) {
        this.page = page;
        this.web = new WebCommons(page);
    }

    //Method to verify cookies popup is displayed 
    async verifyCookiesPopupIsDisplayed() {
        await this.web.isElementVisible(CookiesObjects.cookiesHeader);
    }

    //Method to verify cookies pop-up content 
    async verifyCookiesPopupContent(expContent: string) {
        await this.web.isElementVisible(CookiesObjects.cookiesContent);
        const actualContent = await this.web.getElementText(CookiesObjects.cookiesContent);
        await this.web.compareText(actualContent, expContent);
    }

    //Method to verify the logos displayed on the cookies popup 
    async verifyCookiesPopupLogos() {
        await this.web.isElementVisible(CookiesObjects.creatioLogo);
        await this.web.isElementVisible(CookiesObjects.cookiebotLogo);
    }

    //Method to Verify switch buttons displayed on the cookies popup. 
    async verifyCookiesPopupSwitchButtons() {
        await this.web.isElementVisible(CookiesObjects.necessarySwitchButton);
        await this.web.isElementVisible(CookiesObjects.preferencesSwitchButton);
        await this.web.isElementVisible(CookiesObjects.statisticsSwitchButton);
        await this.web.isElementVisible(CookiesObjects.marketingSwitchButton);
    }

    //Method to verify selection buttons displayed on the cookies popup
    async verifyCookiesPopupSelectionButtons() {
        await this.web.isElementVisible(CookiesObjects.allowAllButton);
        await this.web.isElementVisible(CookiesObjects.allowSelectionButton);
        await this.web.isElementVisible(CookiesObjects.denyButton);
    }

    //Method to verify the show details link displayed on the cookies popup 
    async verifyCookiesPopupShowDetailsLink() {
        await this.web.isElementVisible(CookiesObjects.showDetailsLink);
    }

    //Method to click on the show details link on the cookies popup
    async clickOnShowDetailsLink() {
        await this.web.clickElement(CookiesObjects.showDetailsLink);
    }

    //Method to verify expanded view of cookies pop-up after clicking on show details link 
    async verifyExpandedViewOfCookiesPopup() {
        await this.web.isElementVisible(CookiesObjects.cookiePopupExpandedView);
    }

    //Method to click on the selection button. 
    async clickOnSelectionButton(buttonName: string) {
        switch (buttonName.toLowerCase()) {
            case 'allow all':
                await this.web.clickElement(CookiesObjects.allowAllButton);
                break;
            case 'allow selection':
                await this.web.clickElement(CookiesObjects.allowSelectionButton);
                break;
            case 'deny':
                await this.web.clickElement(CookiesObjects.denyButton);
                break;
            default:
                throw new Error(`Unknown button name: ${buttonName}`);
        }
    }

    //Method to verify cookies popup is closed successfully after clicking on the selection button.
    async verifyCookiesPopupIsClosed() {
        await this.web.isElementDisappeared(CookiesObjects.cookiesHeader);
    }

}