# Cypress E2E SauceDemo 🛒

## 📌 Project Overview
**`cypress-e2e-saucedemo`** is a test automation project showcasing my Cypress expertise by validating real-world e-commerce scenarios on [SauceDemo](https://www.saucedemo.com/). It demonstrates:
- ✅ **Modern testing practices** (Page Objects, AAA pattern)
- 🔒 **Security-aware testing** (masked secrets, session validation)
- 📊 **Comprehensive coverage** (happy paths, edge cases)

### 🛒 Cart Functionality
- Implements **real-time cart tracking** with badge counter validation
- Tests **bulk operations** for adding/removing multiple items
- Validates **data integrity** across product pages and cart views
- Demonstrates **empty state handling** for cart clearance

### 🔐 Authentication Flows
- Covers **5 distinct login scenarios** (happy path, locked user, etc.)
- Implements **secure credential handling** with hidden password logging
- Validates **session management** through cookie verification
- Tests **protected routes** with proper error messaging

### 📊 Inventory Management
- Implements **4 sorting mechanisms** with precise validation
- Includes **currency parsing** with error handling
- Demonstrates **responsive verification** for dynamic lists
- Uses **modular utilities** for reusable sorting operations

### 🏗️ Architectural Excellence
- Follows **Cypress best practices** for selectors and commands
- Demonstrates **clean test architecture** with:
  - Separation of concerns (selectors, fixtures, tests)
  - Custom commands for common actions
  - Utility functions for complex operations
- Includes **comprehensive error handling** throughout
- Maintains **consistent test patterns** across all suites

### � Edge Case Coverage
- Tests **empty form submissions** with proper validation
- Verifies **locked user experience** with specific messaging
- Handles **price parsing edge cases** (currency symbols, NaN values)
- Validates **session cleanup** after logout

### 📈 Scalability Features
- **Data-driven testing** using fixture files
- **Reusable commands** for common workflows (login, cart ops)
- **Component-based selectors** for easy maintenance
- **Cross-suite consistency** in test structure

**View Test Plans**: Each test file has an associated test plan in this README below.

---

## 🧪 Test Plan: Login Functionality (`login.cy.js`)

### 📋 Test Coverage

| Test Scenario              | Verification Points                          | Status |
|----------------------------|---------------------------------------------|--------|
| **Happy Path Login**       | • Redirects to inventory<br>• Session established<br>• UI updates correctly | ✅     |
| **Invalid Password**       | • Error message displays<br>• No page redirect | ✅     |
| **Locked User**           | • Specific locked-out error appears<br>• Blocks navigation | ✅     |
| **Empty Field Validation** | • Required field errors appear<br>• Form blocks submission | ✅     |

### 🚀 Key Features Demonstrated
- **Credential Testing**: Validates both success and failure paths
- **Error Handling**: Verifies UI responses to invalid inputs
- **Session Management**: Confirms cookie behavior
- **Form Validation**: Tests empty submission cases

---

## 🧪 Test Plan: Logout Functionality (`logout.cy.js`) 

### 📋 Test Coverage

| Test Scenario              | Verification Points                          | Status |
|----------------------------|---------------------------------------------|--------|
| **Successful Logout**      | • Returns to login page<br>• Clears session data<br>• Resets UI state | ✅     |
| **Protected Route Access** | • Blocks access to inventory<br>• Maintains login page | ✅     |
| **Session Cleanup**        | • Removes cookies<br>• Clears localStorage  | ✅     |

### 🚀 Key Features Demonstrated
- **Session Security**: Verifies complete auth teardown
- **Route Protection**: Confirms post-logout redirects
- **Storage Management**: Validates data cleanup
- **State Management**: Ensures UI resets properly

---

## 🧪 Test Plan: Inventory Functionality (`inventory.cy.js`)

### 📋 Test Coverage

| Test Scenario              | Verification Points                          | Status |
|----------------------------|---------------------------------------------|--------|
| **Inventory Page Render**  | • Correct page title<br>• Product list displays<br>• Cart icon visible | ✅     |
| **A-Z Sorting**            | • Products sorted alphabetically (A→Z)       | ✅     |
| **Z-A Sorting**            | • Products sorted reverse-alphabetically (Z→A)| ✅     |
| **Price Low→High**         | • Products sorted by ascending price         | ✅     |
| **Price High→Low**         | • Products sorted by descending price        | ✅     |

### 🚀 Key Features Demonstrated
- **End-to-End Testing**: Simulates real user interactions with sorting functionality
- **Data Validation**: 
  - Text comparison for name sorting
  - Numeric comparison with currency parsing for price sorting
- **Modular Design**: Reusable utility functions for sorting operations
- **Responsive Verification**: Dynamic element handling with length assertions

---

## 🧪 Test Plan: Cart Functionality (`cart.cy.js`)

### 📋 Test Coverage

| Test Scenario              | Verification Points                          | Status |
|----------------------------|---------------------------------------------|--------|
| **Single Item Addition**    | • Cart badge updates<br>• Item appears in cart with correct details (name, desc, price) | ✅     |
| **Single Item Removal**     | • Cart badge disappears<br>• Item removed from cart view | ✅     |
| **Multiple Items Addition** | • Cart badge shows correct count<br>• All items appear with correct details | ✅     |
| **Full Cart Clearance**     | • Cart badge disappears<br>• All items removed from cart view | ✅     |

### 🚀 Key Features Demonstrated
- **User Flow Testing**: Simulates complete add-to-cart and checkout preparation scenarios
- **Dynamic Verification**: 
  - Real-time cart badge updates
  - Multi-item validation in single test
- **Bulk Operations**: Handles both individual and batch item management
- **Negative Assertions**: Confirms absence of elements after removal
- **Data Integrity**: Validates product details (name, description, price) persist in cart
