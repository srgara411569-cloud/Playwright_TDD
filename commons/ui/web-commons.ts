import {Page, Locator, expect} from '@playwright/test';

/**
 * WebCommons - collection of reusable Playwright helper methods for UI interactions.
 * @author SriVidyaGara
 */
export class WebCommons {

    page: Page;

    /**
     * Create a new WebCommons helper bound to a Playwright `Page` instance.
     * @param {Page} page Playwright Page instance to operate on.
     */
    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Resolve a locator string into a Playwright `Locator`.
     * @param {string} locator Selector or locator string to find the element.
     * @returns {Promise<Locator>} Promise resolving to the located element.
     */
    async element(locator: string): Promise<Locator> {
        return this.page.locator(locator);
    }

    /**
     * Navigate the page to the provided URL and optionally assert the page title.
     * @param {string} url The URL to navigate the page to.
     * @param {string} [title] Optional expected title to assert after navigation.
     * @returns {Promise<void>} Resolves when navigation (and optional title check) completes.
     */
    async launchApplication(url: string, title ?:string): Promise<void> {
        await this.page.goto(url);
        if(title){
            await expect(this.page).toHaveTitle(title);
        }
    }

    /**
     * Scroll the page so the specified element is in view.
     * @param {string} locator Selector or locator string for the element to scroll to.
     * @returns {Promise<void>} Resolves when scrolling is complete.
     */
    async scrollToElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.scrollIntoViewIfNeeded();
    }

    /**
     * Click the specified element.
     * @param {string} locator Selector or locator string for the element to click.
     * @returns {Promise<void>} Resolves after the click action completes.
     */
    async clickElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.click();
    }

    /**
     * Double-click the specified element.
     * @param {string} locator Selector or locator string for the element to double-click.
     * @returns {Promise<void>} Resolves after the double-click action completes.
     */
    async doubleClickElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.dblclick();
    }

    /**
     * Right-click (context click) the specified element.
     * @param {string} locator Selector or locator string for the element to right-click.
     * @returns {Promise<void>} Resolves after the right-click action completes.
     */
    async rightClickElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.click({button: 'right'});
    }

    /**
     * Hover the mouse over the specified element.
     * @param {string} locator Selector or locator string for the element to hover over.
     * @returns {Promise<void>} Resolves when hover completes.
     */
    async hoverOverElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.hover();
    }

    /**
     * Clear and type text into a text box element.
     * @param {string} locator Selector or locator string for the text input element.
     * @param {string} text The text to enter into the input.
     * @returns {Promise<void>} Resolves when text has been entered.
     */
    async sendtext(locator: string, text: string): Promise<void> {
        const element = await this.element(locator);
        await element.click();
        await  element.clear();
        await element.fill(text);
    }

    /**
     * Select an option from a dropdown/select element.
     * @param {string} locator Selector or locator string for the select element.
     * @param {string} option Option value to select.
     * @returns {Promise<void>} Resolves when selection completes.
     */
    async selectOption(locator: string, option: string): Promise<void> {
        const element = await this.element(locator);
        await element.selectOption(option);
    }

    /**
     * Ensure a checkbox is checked. If already checked, no action is taken.
     * @param {string} locator Selector or locator string for the checkbox element.
     * @returns {Promise<void>} Resolves when checkbox is checked.
     */
    async checkCheckbox(locator: string): Promise<void> {
        const element = await this.element(locator);
        if(!await element.isChecked()){
            await element.check();
        }
    }

    /**
     * Retrieve the text content of an element.
     * @param {string} locator Selector or locator string for the element.
     * @returns {Promise<string>} The text content (empty string if null).
     */
    async getElementText(locator: string): Promise<string> {
        const element = await this.element(locator);
        return await element.textContent() || '';
    }

    /**
     * Get the value of an attribute from an element.
     * @param {string} locator Selector or locator string for the element.
     * @param {string} attribute Attribute name to retrieve.
     * @returns {Promise<string|null>} The attribute value or null if not present.
     */
    async getElementAttribute(locator: string, attribute: string): Promise<string | null> {
        const element = await this.element(locator);
        return await element.getAttribute(attribute);
    }

    /**
     * Check whether an element is visible on the page.
     * @param {string} locator Selector or locator string for the element.
     * @returns {Promise<boolean>} True if visible, false otherwise.
     */
    async isElementVisible(locator: string): Promise<boolean> {
        const element = await this.element(locator);
        return await element.isVisible();
    }

    /**
     * Determine whether an element is hidden/disappeared from the page.
     * @param {string} locator Selector or locator string for the element.
     * @returns {Promise<boolean>} True if hidden, false otherwise.
     */
    async isElementDisappeared(locator: string): Promise<boolean> {
        const element = await this.element(locator);
        return await element.isHidden();
    }

    /**
     * Upload a file to a file input element.
     * @param {string} locator Selector or locator string for the file input element.
     * @param {string} filePath The path to the file to upload.
     * @returns {Promise<void>} Resolves when files are set on the input.
     */
    async uploadFile(locator: string, filePath: string): Promise<void> {
        const element = await this.element(locator);
        await element.setInputFiles(filePath);
    }

    /**
     * Set up a one-time handler for JavaScript dialogs (alert/confirm/prompt).
     * @param {'accept'|'dismiss'} action Whether to accept or dismiss the dialog.
     * @param {string} [promptText] Optional text to send to prompt dialogs when accepting.
     * @returns {Promise<void>} Resolves after the dialog handler has been attached.
     */
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

    /**
     * Take a screenshot of the current page and save it to disk.
     * @param {string} filePath Destination file path for the screenshot.
     * @returns {Promise<void>} Resolves when the screenshot has been written.
     */
    async takeScreenshot(filePath: string): Promise<void> {
        await this.page.screenshot({ path: filePath });
    }

    /**
     * Set the page viewport size (resolution).
     * @param {number} width Viewport width in pixels.
     * @param {number} height Viewport height in pixels.
     * @returns {Promise<void>} Resolves when viewport is updated.
     */
    async setResolution(width: number, height: number): Promise<void> {
        await this.page.setViewportSize({ width, height });
    }

    /**
     * Reload the current page.
     * @returns {Promise<void>} Resolves when the page reload completes.
     */
    async refreshPage(): Promise<void> {
        await this.page.reload();
    }

    /**
     * Get a locator inside an iframe/frame using a frame locator string.
     * @param {string} frameLocator The frame locator string (e.g., selector for the frame).
     * @param {string} frameElement The selector to locate inside the frame.
     * @returns {Promise<Locator>} Locator pointing to the target element inside the frame.
     */
    async frameElement(frameLocator: string, frameElement: string): Promise<Locator> {
        const element = this.page.frameLocator(frameLocator);
        const frame = await element.locator(frameElement)
        return frame;
    }

    /**
     * Locate an element using Playwright helper methods encoded in the locator string.
     * Supported prefixes: `getByRole`, `getByText`, `getByLabel`, `getByPlaceholder`, `getByAltText`, `getByTitle`.
     * For `getByRole`, supply a `role` parameter.
     * @param {string} locator Locator string prefixed with method name and underscore, e.g. `getByText_Hello`.
     * @param {any} [role] Role to use when locator prefix is `getByRole`.
     * @returns {Promise<Locator>} Promise resolving to the matched locator.
     */
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

    
  /**
   * Assert that actual text contains the expected text (trimmed comparison).
   * @param {string} actual The actual text value to check.
   * @param {string} expected The expected substring that should be present.
   * @returns {Promise<void>} Resolves when the assertion passes; throws if it fails.
   */
    async compareText(actual: string, expected: string): Promise<void> {
        expect(actual.trim()).toContain(expected.trim());
    }

}

/**
 * Helper to launch a URL from outside the WebCommons class and optionally assert title.
 * @author SriVidyaGara
 * @param {Page} page Playwright Page instance.
 * @param {string} url URL to navigate to.
 * @param {string} [title] Optional expected title to assert.
 * @returns {Promise<void>} Resolves when navigation (and optional title check) completes.
 */
export async function launchApplication(page: Page, url: string, title?: string): Promise<void> {
    await page.goto(url);
    if (title) {
        await expect(page).toHaveTitle(title);
    }

}
