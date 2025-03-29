# Cypress E-Commerce Demo 🛒

## 📌 Project Overview
**`cypress-ecommerce-demo`** is a test automation project showcasing my Cypress expertise by validating real-world e-commerce scenarios on [SauceDemo](https://www.saucedemo.com/). It demonstrates:
- ✅ **Modern testing practices** (Page Objects, AAA pattern)
- 🔒 **Security-aware testing** (masked secrets, session validation)
- 📊 **Comprehensive coverage** (happy paths, edge cases)

**View Test Plans**: Each test file has an associated test plan in this README below.

---

## 🧪 Test Plan: Login Functionality (`login.cy.js`)

### 📋 Test Cases
| #  | Test Case                | Steps                                                                 | Verification Points                          |
|----|--------------------------|----------------------------------------------------------------------|---------------------------------------------|
| 1  | Happy Path Login         | 1. Enter valid credentials<br>2. Submit form                         | • Redirects to `/inventory.html`<br>• "Products" header visible<br>• Session cookie exists |
| 2  | Invalid Password         | 1. Enter valid username + wrong password<br>2. Submit form           | • Shows error message<br>• No redirect      |
| 3  | Locked User              | 1. Enter locked user credentials<br>2. Submit form                   | • Displays "locked out" error<br>• No redirect |
| 4  | Empty Field Validation   | 1. Submit empty form                                                 | • Shows "Username is required" error        |

### 🛠️ Technical Details
```javascript
// Selectors (support/selectors.js)
export const loginSelectors = {
  username: '#user-name',
  password: '#password',
  loginButton: '#login-button',
  errorMessage: '[data-test="error"]'
};

// Test Data (fixtures/users.js)
export const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' }
};

---

## 🧪 Test Plan: Logout Functionality (`logout.cy.js`)

### 📋 Test Cases
| #  | Test Case                | Steps                                                                 | Verification Points                          |
|----|--------------------------|----------------------------------------------------------------------|---------------------------------------------|
| 1  | Successful Logout        | 1. While logged in<br>2. Open menu<br>3. Click logout                | • Redirects to login page<br>• Login form visible<br>• Session data cleared |
| 2  | Protected Route Access   | 1. After logout<br>2. Attempt to visit `/inventory.html`             | • Shows error message<br>• Maintains login page |
| 3  | Session Cleanup          | 1. After logout                                                     | • Session cookie is null<br>• localStorage empty |

### 🛠️ Technical Details
```javascript
// Selectors (support/selectors.js)
export const headerSelectors = {
  menuButton: '#react-burger-menu-btn', 
  logoutButton: '#logout_sidebar_link'
};

// Shared Test Data (fixtures/users.js)
export const users = {
  standard: { username: 'standard_user', password: 'secret_sauce' }
};

// Key Assertions
cy.url().should('eq', Cypress.config().baseUrl);
cy.get(loginSelectors.loginButton).should('be.visible');
cy.getCookie('session-username').should('be.null');
cy.window().its('localStorage').should('be.empty');