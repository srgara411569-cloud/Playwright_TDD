import { Page } from '@playwright/test';
import loginPage from '../page_elements/login-page-objects.json';
//import loginPage from '../page_elements/login-page-objects.json' with { type: 'json' };
import { WebCommons } from  '../../commons/ui/web-commons.js'
import config from '../../config/config.json' with { type: 'json' };

export class LoginPageSteps {

    page : Page;
    web : WebCommons;

    constructor(page: Page) {
        this.page = page;
        this.web = new WebCommons(page);
    }

     //Method to Launch the Application 
    async launchtheApplication(): Promise<void> {
        await this.web.launchApplication(config.app.url,config.app.title);
    }

    //Method to verify login page is successfully displayed after closing the cookies pop-up
    async verifyLoginPageIsDisplayed() {
        await this.web.isElementVisible(loginPage.loginPageHeader);
    }

    //Method to enter business email and password. 
    async enterBusinessEmailAndPassword(email: string, password?: string) {
        await this.web.sendtext(loginPage.businessEmailTextBox, email);
        if (password) {
            await this.web.sendtext(loginPage.passwordTextBox, password);
        }
    }

    //Method to click on the login button
    async clickOnLoginButton() {
        await this.web.clickElement(loginPage.loginButton);
    }

    //Method to verify the forgot password link is displayed within the login page. 
    async verifyForgotPasswordLinkIsDisplayed() {
        await this.web.isElementVisible(loginPage.forgotPasswordLink);
    }

    //Method to click on the forgot password link
    async clickOnForgotPasswordLink() {
        await this.web.clickElement(loginPage.forgotPasswordLink);
    }

    //Method to verify forgot password confirmation message is displayed after clicking on the forgot password link
    async verifyForgotPasswordConfirmationMessageIsDisplayed() {
        await this.web.isElementVisible(loginPage.forgotPasswordConfirmationMsg);
    }

    //Method to verify the sign-up link is displayed within the login page 
    async verifySignUpLinkIsDisplayed() {
        await this.web.isElementVisible(loginPage.signUpLink);
    }

    //Method to click on the sign-up link
    async clickOnSignUpLink() {
        await this.web.clickElement(loginPage.signUpLink);
    }

    //Method to verify social media icons displayed in the login page 
    async verifySocialMediaIconsAreDisplayed() {
        await this.web.isElementVisible(loginPage.googleIcon);
        await this.web.isElementVisible(loginPage.linkedInIcon);
    }

    //Method to verify error message displayed when user login with invalid credentials 
    async verifyErrorMessageForInvalidCredentials(expectedErrorMsg: string) {
        await this.web.isElementVisible(loginPage.loginErrorMessage);
    }

}