import { test, TestInfo } from '@playwright/test';
import { LoginPageSteps } from '../page-objects/page_common_methods/loginpage_methods.js';
import { HomepageCommonMethods } from '../page-objects/page_common_methods/homepage_methods.js';
import { CookiesCommonMethods } from '../page-objects/page_common_methods/cookiespage_methods.js';
import data from '../testdata/ui/loginpage.json' assert  { type: 'json' };


let loginPage: LoginPageSteps;
let homePage: HomepageCommonMethods;
let cookiesPage: CookiesCommonMethods;
let testdata:any;


test.describe('Application UI Tests', () => {

    //Initialize the page objects before each and every test case. 
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPageSteps(page);
        homePage = new HomepageCommonMethods(page);
        cookiesPage = new CookiesCommonMethods(page);
    });
    

    //Test Case 13: Verify adding a new user within the creation CRM application. 
    test('Verify adding a new user', async ({}, testInfo: TestInfo) => {
        testdata = data[testInfo.title as keyof typeof data];
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupSelectionButtons();
        await cookiesPage.clickOnSelectionButton(testdata.buttonName);
        await cookiesPage.verifyCookiesPopupIsClosed();
        await loginPage.verifyLoginPageIsDisplayed();
        await loginPage.enterBusinessEmailAndPassword(testdata.username, testdata.password);
        await loginPage.clickOnLoginButton();
        await homePage.verifyHomePageLaunched();
        await homePage.clickUsersLink();
        await homePage.verifyAddUserButtonDisplayed();
        await homePage.clickAddUserButton();
        await homePage.verifyNewUserScreenDisplayed();
        await homePage.enterEmailAddress(testdata.newUserEmail);
        await homePage.selectRole(testdata.newUserRole);
        await homePage.clickInviteButton();
        await homePage.verifyInvitationSentToastMessageDisplayed();
    })

})