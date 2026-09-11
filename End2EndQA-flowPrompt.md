
Workflow Overview

### Step 1: Requirements Analysis & Test Scope

* **Action:** Read the user story saved in the file named "SCRUM-101-Ecommerce.md". Parse and summarize key functional/non-functional requirements, test scope, and expected outcomes.
* **Expected Output:**
* A structured markdown summary outlining the user authentication scope, positive/negative validation boundaries, and explicit verification goals.



### Step 2: Test Plan Generation

* **Action:** Invoke the `Playwright-test-planner` agent to create a complete test plan from the user story.
* **Expected Output:**
* A comprehensive test plan file saved successfully to `specs/Ecommerce-test-plan.md` containing test scenario IDs, descriptions, pre-conditions, step-by-step test steps, and expected results covering standard login, locked out handling, and blank field validation.



### Step 3: Exploratory Testing via MCP Browser Tools

* **Action:** Perform interactive exploratory testing against `https://www.saucedemo.com` using Playwright MCP Browser tools, following the test plan created in Step 2.
* **Expected Output:**
* A structured log or execution report detailing live DOM interactions, observed error text strings (e.g., "Epic sadface..."), and a verified inventory of stable element locators, IDs, and roles.



### Step 4: Test Script Generation

* **Action:** Invoke the `Playwright-test-generator` agent. Review the test plan (`specs/Ecommerce-test-plan.md`) and exploratory testing notes from Step 3. Generate a Playwright TypeScript automation script using robust locators (`getByRole`, test IDs), proper auto-waiting strategies, and clean TypeScript structure.
* **Expected Output:**
* A fully written, production-ready TypeScript test file (e.g., `tests/ecommerce-auth.spec.ts`) adhering to Playwright best practices, free of hardcoded delays or brittle CSS/XPath chains.



### Step 5: Execution & Self-Healing

* **Action:** Invoke the `Playwright-test-healer agent`. Execute the generated script in Chromium. If any test cases fail due to locator drift, timing issues, or unexpected UI states, analyze the failure traceback, self-heal/fix the script code, and re-execute until passing.
* **Expected Output:**
* Terminal output showing a 100% pass rate across all defined test scenarios in Chromium, accompanied by execution logs, records of any healed selectors, and the final self-healed test script.



### Step 6: Test Results & Execution Summary Generation

* **Action:** Compile the results from the final test run into a clear, professional test execution report. Save the summary report to `reports/test-execution-summary.md`.
* **Expected Output:**
* A markdown report containing total test cases executed, passed vs. failed counts, execution duration, environment details (Chromium version, OS), a breakdown of any self-healed steps, and a final quality sign-off recommendation.



```

```