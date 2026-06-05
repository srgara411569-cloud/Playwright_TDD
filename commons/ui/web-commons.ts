import {Page, Locator, expect} from '@playwright/test';

export class WebCommons {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Common method to generate a web element from the locator 
    async element(locator: string): Promise<Locator> {
        return this.page.locator(locator);
    }

    //Common method to launch the application 
    async launchApplication(url: string, title ?:string): Promise<void> {
        await this.page.goto(url);
        if(title){
            await expect(this.page).toHaveTitle(title);
        }
    }

    //Common method to scroll to the element 
    async scrollToElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.scrollIntoViewIfNeeded();
    }

    //Common method to click on the element
    async clickElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.click();
    }

    //Common method to perform double-click on the element 
    async doubleClickElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.dblclick();
    }

    //Common method to perform right-click on the element
    async rightClickElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.click({button: 'right'});
    }

    //Common method to hover over the element
    async hoverOverElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.hover();
    }

    //Common method to type within the text box element 
    async sendtext(locator: string, text: string): Promise<void> {
        const element = await this.element(locator);
        await element.click();
        await  element.clear();
        await element.fill(text);
    }

    //Common method to select the option from the dropdown 
    async selectOption(locator: string, option: string): Promise<void> {
        const element = await this.element(locator);
        await element.selectOption(option);
    }

    //Common method to check the checkbox
    async checkCheckbox(locator: string): Promise<void> {
        const element = await this.element(locator);
        if(!await element.isChecked()){
            await element.check();
        }
    }

    //Common method to get the text from the element 
    async getElementText(locator: string): Promise<string> {
        const element = await this.element(locator);
        return await element.textContent() || '';
    }

    //Common method to get the value from the attribute 
    async getElementAttribute(locator: string, attribute: string): Promise<string | null> {
        const element = await this.element(locator);
        return await element.getAttribute(attribute);
    }

    //Common method to check if the element is visible
    async isElementVisible(locator: string): Promise<boolean> {
        const element = await this.element(locator);
        return await element.isVisible();
    }

    //Common method to check if an element is disappeared 
    async isElementDisappeared(locator: string): Promise<boolean> {
        const element = await this.element(locator);
        return await element.isHidden();
    }

    //Common method to upload a file to the element 
    async uploadFile(locator: string, filePath: string): Promise<void> {
        const element = await this.element(locator);
        await element.setInputFiles(filePath);
    }

    //Common method to handle alert pop-up 
    async handleAlert(action: 'accept' | 'dismiss', promptText?: string): Promise<void> {
        this.page.once('dialog', async (dialog) => {
            if (promptText) {
                await dialog.accept(promptText);
            } else {
                if (action === 'accept') {
                    await dialog.accept();
                } else {
                    await dialog.dismiss();
                }
            }
        });
    }

    //Common Methods to Take a Screenshot 
    async takeScreenshot(filePath: string): Promise<void> {
        await this.page.screenshot({ path: filePath });
    }

    //Common method to set the resolution of page
    async setResolution(width: number, height: number): Promise<void> {
        await this.page.setViewportSize({ width, height });
    }

    //Common method to refresh the page
    async refreshPage(): Promise<void> {
        await this.page.reload();
    }

    //Common method to locate the frame element 
    async frameElement(frameLocator: string, frameElement: string): Promise<Locator> {
        const element = this.page.frameLocator(frameLocator);
        const frame = await element.locator(frameElement)
        return frame;
    }

    //Common method to locate the element by using Playwright locator methods 
    async locateElementByMethod(locator: string, role?: Parameters<Page['getByRole']>[0]): Promise<Locator> {
        const values = locator.split('_');
        const method = values[0];
        const value = values[1];

        if (method === 'getByRole') {
            if (!role) {
                throw new Error('Role is required for getByRole locator method.');
            }
            return this.page.getByRole(role, { name: value ?? '' });
        }else if (method === 'getByText') {
            return this.page.getByText(value ?? '');
        } else if (method === 'getByLabel') {
            return this.page.getByLabel(value ?? '');
        } else if (method === 'getByPlaceholder') {
            return this.page.getByPlaceholder(value ?? '');
        } else if (method === 'getByAltText') {
            return this.page.getByAltText(value ?? '');
        } else if (method === 'getByTitle') {
            return this.page.getByTitle(value ?? '');   
        } 

        throw new Error(`Unsupported locator method: ${method}`);
    }

    
  //Common method to compare the text values(actual text contained in the element and expected text)
    async compareText(actual: string, expected: string): Promise<void> {
        expect(actual.trim()).toContain(expected.trim());
    }

}

export async function launchApplication(page: Page, url: string, title?: string): Promise<void> {
    await page.goto(url);
    if (title) {
        await expect(page).toHaveTitle(title);
    }

}
