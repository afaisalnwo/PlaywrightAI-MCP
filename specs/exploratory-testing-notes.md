# SauceDemo Exploratory Testing Notes

## Session

- URL: `https://www.saucedemo.com/`
- Page title: `Swag Labs`
- Browser surface: Playwright MCP browser session
- Initial login page exposes a named `Login` form.

## Stable Locator Inventory

| Purpose | Accessible locator | Observed DOM hook |
| --- | --- | --- |
| Username | `getByRole('textbox', { name: 'Username' })` | `[data-test="username"]` |
| Password | `getByRole('textbox', { name: 'Password' })` | `[data-test="password"]` |
| Login action | `getByRole('button', { name: 'Login' })` | `[data-test="login-button"]` |
| Error region | `getByRole('alert')` | `[data-test="error"]` when rendered |
| Inventory menu | `getByRole('button', { name: 'Open Menu' })` | stable accessible name |
| Cart | `getByRole('button', { name: /Cart/ })` | stable accessible name |
| Product sorting | `getByRole('combobox', { name: 'Sort products' })` | stable accessible name |
| Product image | `getByRole('img', { name: '<product title>' })` | product title alt text |

## Observed Flows

- Valid `standard_user` / `secret_sauce` credentials redirected to `/inventory.html`.
- Inventory exposed `Open Menu`, `Cart, empty`, `Sort products`, six product detail buttons, product images, and footer links.
- Invalid `invalid_user` / `wrong_password` stayed on `/` and displayed `Epic sadface: Username and password do not match any user in this service` in an alert.
- Contrary to the story expectation, the invalid password input still contained `wrong_password` after the error rendered.
- Blank submission stayed on `/` and rendered an alert region; exact text should be asserted by the generated test.
- `locked_out_user` / `secret_sauce` stayed on `/` in the MCP session, but the expected locked-out error did not render before the session ended. Treat this as a behavior to verify in automated execution.

## Automation Guidance

- Prefer accessible roles and names, with `data-test` selectors only where an error region or control lacks a sufficiently stable accessible name.
- Start each scenario from a fresh navigation to avoid persisted login state.
- Use Playwright assertions for URL, alert text, input values, and inventory structure; do not use fixed delays.