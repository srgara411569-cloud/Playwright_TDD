# Playwright TDD framework Design - step by step 

## 1. Creating a new local working directory within the workspace. 
* Example : playwright-tdd-framwork
* terminal-command : `cd playwright-tdd-framwork`

## 2. Install necessary dependencies based on our project requirements. 
1. **Playwright** — `npm init playwright@latest` (or add `@playwright/test`) for web / API automation with the Playwright Test runner.
2. **TypeScript** — `npm install typescript ts-node @types/node` and `npx tsc --init` for language support.
3. **Excel** — `npm install excel xlsx` to read or work with spreadsheet data.
4. **PDF** — `npm install pdf-parse` and (in this project) `pdf-parse-new` for PDF utilities.
5. **PostgreSQL** — `npm install pg @types/pg` to connect to a database from tests or helpers.

## 3. Updating the global configurations at project level within the package.json and ts-config.json 
 * package.json  => "type": "module"
 * tsconfig.json =>  "verbatimModuleSyntax": false

 ## 4. Create the folder structure to maintain different components of the framework. 
 1. commons => To maintain all the common methods related to UI (web-commons.ts), API(api-commons.ts), database(db-commons.ts), load testing (jmeter-commons.ts) and AI (ai-commons.ts)
 2. config => To maintain the configuration data or common data for all the components Like URLs, credentials, DB connection information, AI tokens, etc.  (config.json)
 3. testdata => To maintain the test data related to each and every component like UI, API, database, and performance testing 
 4. utils => To maintain common methods related to all the utilities we are going to use in our framework 
 5. page-objects => To maintain page-wise locators (page-elements) and page-wise common methods (page-steps) separately to implement the page object model design pattern in our framework 
 6. tests => To maintain all the test cases related to each and every component of your project 
 7. test-results/screenshots => To maintain all the screenshots related to each and every test failure 
 8. test-results => To maintain all the test results, reports, and respective traces 
 9. files => To maintain flat files like Excel, images, PDF, etc 
 10. .env => Environment Specific Configurations and Credentials To maintain in the local system 