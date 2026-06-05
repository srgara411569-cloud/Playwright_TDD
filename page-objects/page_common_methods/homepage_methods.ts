import { Page } from '@playwright/test';
import homePage from '../page_elements/home-page-objects.json' with { type: 'json' };
import { WebCommons } from  '../../commons/ui/web-commons.js'

export class HomepageCommonMethods {

    page : Page;
    web : WebCommons;

    constructor(page: Page) {
        this.page = page;
        this.web = new WebCommons(page);
    }

    //Method to verify home page is launched successfully 
    async verifyHomePageLaunched() {
        setTimeout(async () => {
            await this.web.isElementVisible(homePage.homePageHeader);
        }, 60000);
    }

    //Method to verify: User's link is displayed on the home page. 
    async verifyUsersLinkDisplayed() {
        await this.web.isElementVisible(homePage.usersLink);
    }

    //Method to click on the Users link. 
    async clickUsersLink() {
        await this.web.clickElement(homePage.usersLink);
    }

    //Method to verify add user button is displayed. 
    async verifyAddUserButtonDisplayed() {
        await this.web.isElementVisible(homePage.addUserButton);
    }

    //Method to click on the Add User button. 
    async clickAddUserButton() {
        await this.web.clickElement(homePage.addUserButton);
    }

    //Method to verify new user screen is displayed
    async verifyNewUserScreenDisplayed() {
        await this.web.isElementVisible(homePage.addUserEmailTextBox);
    }

    //Method to enter email address in the email text box.
    async enterEmailAddress(email: string) {
        await this.web.sendtext(homePage.addUserEmailTextBox, email);
    }

    //Method to select role from the role dropdown.
    async selectRole(role: string) {
        await this.web.clickElement(homePage.roleDropdown);
        await this.web.clickElement(homePage.roleDropdownOption.replace('option', role));
    }

    //Method to click on the Invite button.
    async clickInviteButton() {
        await this.web.clickElement(homePage.inviteButton);
    }

    //Method to verify that invitation sent toast message is displayed.
    async verifyInvitationSentToastMessageDisplayed() {
        await this.web.isElementVisible(homePage.invitaionSentToastMessage);
    }

    //Method to click on the profile icon.
    async clickProfileIcon() {
        await this.web.clickElement(homePage.profile);
    }

    //Method to click on the Logout link.
    async clickLogoutLink() {
        await this.web.clickElement(homePage.logoutLink);
    }
    
}