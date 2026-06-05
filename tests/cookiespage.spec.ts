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

    //Test Case 1: Verify Cookies popup is displayed. 
    test('TEST_01: Verify Cookies popup is displayed', {tag:['@smoke', '@regression']}, async () => {
        
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
    })

    //Test Case 2: Verify Cookies popup content
    test('TEST_02: Verify Cookies popup content', {tag:'@smoke'}, async ({}, testInfo: TestInfo) => {
        testdata = data[testInfo.title as keyof typeof data];
        //testdata = data["Verify Cookies popup content" as keyof typeof data];
       await loginPage.launchtheApplication();
       await cookiesPage.verifyCookiesPopupIsDisplayed();
       await cookiesPage.verifyCookiesPopupContent(testdata.content);
    })
    
    //Test Case 3: Verify Logos displayed in the cookies pop-up 
    test('TEST_03: Verify Logos displayed in the cookies pop-up', {tag:'@smoke'}, async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupLogos();
    })

    //Test Case 4: Verify switch buttons are displayed in the cookies pop-up
    test('TEST_04: Verify switch buttons are displayed in the cookies pop-up',{tag:'@smoke'}, async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupSwitchButtons();
    })

    //Test Case 5: Verify selection buttons are displayed in the cookies pop-up
    test('TEST_05: Verify selection buttons are displayed in the cookies pop-up',{tag:'@smoke'}, async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupSelectionButtons();
    })

    //Test Case 6: Verify show details link is displayed in the cookies pop-up
    test('TEST_06: Verify show details link is displayed in the cookies pop-up',{tag:'@smoke'}, async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupShowDetailsLink();
    })

    //Test Case 7: Verify Expanded view of Cookies pop-up
    test('TEST_07: Verify Expanded view of Cookies pop-up', async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupShowDetailsLink();
        await cookiesPage.clickOnShowDetailsLink();
        await cookiesPage.verifyExpandedViewOfCookiesPopup();
    })

    //Test Case 8: Verify cookies popup is getting closed after clicking on the Allow All button. 
    test('TEST_08: Verify cookies popup is getting closed', async ({}, testInfo: TestInfo) => {
        testdata = data[testInfo.title as keyof typeof data];
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupSelectionButtons();
        await cookiesPage.clickOnSelectionButton(testdata.buttonName);
        await cookiesPage.verifyCookiesPopupIsClosed();
    })

    
})