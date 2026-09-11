# SCRUM-101 SauceDemo Authentication Test Plan

## Application Overview

Functional Playwright test plan for SauceDemo user authentication and post-login product catalog access. The plan covers the required standard login, invalid credentials, blank username, blank password, and both fields blank scenarios, plus optional locked-out account handling because the story lists locked_out_user as an available SauceDemo account. Core automated acceptance coverage targets Chromium with accessible labels and stable role/test-id locators.

## Test Scenarios

### 1. SauceDemo Authentication and Catalog Access

**Seed:** `tests/seed.spec.ts`

#### 1.1. AUTH-001 Successful login with standard user and catalog access

**File:** `tests/ecommerce-auth-standard-login.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to https://www.saucedemo.com/.
    - expect: The SauceDemo login page is displayed.
    - expect: The Username and Password inputs and Login button are available.
  2. Locate the Username field by its accessible label and enter standard_user.
    - expect: The Username field contains standard_user.
  3. Locate the Password field by its accessible label and enter secret_sauce.
    - expect: The Password field contains the supplied password without exposing it as readable text.
  4. Activate the Login button using a role-based locator.
    - expect: Authentication completes without a validation error.
    - expect: The browser navigates to /inventory.html.
  5. Verify the inventory page and its primary navigation controls.
    - expect: The SauceDemo application logo is visible.
    - expect: A shopping cart control is visible and available.
    - expect: A burger/menu control is visible and available.
  6. Inspect the rendered product catalog.
    - expect: The catalog contains product entries.
    - expect: Each visible product entry exposes an image, title, description, price, and Add to cart control.
    - expect: The page is fully loaded without a blocking error.

#### 1.2. AUTH-002 Invalid credentials are rejected and password is cleared

**File:** `tests/ecommerce-auth-invalid-credentials.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to https://www.saucedemo.com/.
    - expect: The SauceDemo login page is displayed.
  2. Enter an invalid username such as invalid_user and an incorrect password such as wrong_password.
    - expect: Both fields contain the entered test data before submission.
  3. Activate the Login button.
    - expect: The browser remains on the login page and does not navigate to /inventory.html.
    - expect: An inline error is visible with text equivalent to Epic sadface: Username and password do not match any user in this service.
    - expect: The Password field is cleared.
    - expect: The invalid username remains available for correction unless the application explicitly clears it.

#### 1.3. AUTH-003 Blank username validation

**File:** `tests/ecommerce-auth-required-fields.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to https://www.saucedemo.com/.
    - expect: The SauceDemo login page is displayed.
  2. Leave Username blank, enter secret_sauce in Password, and activate Login.
    - expect: The browser remains on the login page.
    - expect: An inline error is visible with text equivalent to Epic sadface: Username is required.
    - expect: The application does not navigate to /inventory.html.

#### 1.4. AUTH-004 Blank password validation

**File:** `tests/ecommerce-auth-required-fields.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to https://www.saucedemo.com/.
    - expect: The SauceDemo login page is displayed.
  2. Enter standard_user in Username, leave Password blank, and activate Login.
    - expect: The browser remains on the login page.
    - expect: An inline error is visible with text equivalent to Epic sadface: Password is required.
    - expect: The application does not navigate to /inventory.html.

#### 1.5. AUTH-005 Both username and password blank validation

**File:** `tests/ecommerce-auth-required-fields.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to https://www.saucedemo.com/.
    - expect: The SauceDemo login page is displayed.
  2. Leave both Username and Password blank and activate Login.
    - expect: The browser remains on the login page.
    - expect: An inline error is visible with text equivalent to Epic sadface: Username is required.
    - expect: The application does not navigate to /inventory.html.
    - expect: The first required validation message follows the application behavior and does not incorrectly report successful authentication.

#### 1.6. AUTH-006 Locked-out user handling (exploratory, story-adjacent)

**File:** `tests/ecommerce-auth-locked-out.spec.ts`

**Steps:**
  1. Start from a fresh browser context and navigate to https://www.saucedemo.com/.
    - expect: The SauceDemo login page is displayed.
  2. Enter locked_out_user in Username and secret_sauce in Password.
    - expect: The fields contain the locked-out account test data.
  3. Activate the Login button.
    - expect: The browser does not reach /inventory.html.
    - expect: An inline error is displayed indicating that the user has been locked out, such as Epic sadface: Sorry, this user has been locked out.
    - expect: The login page remains available for another attempt.
