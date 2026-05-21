import { test, expect } from '@playwright/test';
import loginPageObjects from '../page-objects/page-elements/login-page-objects.json';
import { WebCommons } from '../commons/ui/web-commons';


test('has title', async ({ page }) => {
  const webCommons = new WebCommons(page);
  await webCommons.launchApplication("https://accounts.creatio.com/login/alm?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dstudio%26nonce%3D7%26redirect_uri%3Dhttps:%252F%252Fstudio.creatio.com%252FServiceModel%252FAuthService.svc%252FOpenIdCallback%26response_type%3Dcode%26scope%3Dopenid%2Bprofile%2Bemail%2Bphone%26&ReturnConfirmationUrl=https:%2F%2Fstudio.creatio.com%2F0%2FClientApp%2F%3FisEmailConfirmed%3Dtrue%23%2FEnvironmentManagement%7B0%7D", "Log in | Creatio");
  await webCommons.sendtext(loginPageObjects.businessemailid, "srgara411569@gmail.com");
  await webCommons.sendtext(loginPageObjects.passwordTextBox, "Test@12345");
  await webCommons.clickElement(loginPageObjects.loginbutton);
});