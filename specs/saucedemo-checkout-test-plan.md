# Test Plan: SCRUM-101 - E-commerce Checkout Process
## Application: SauceDemo (https://www.saucedemo.com)

---

## 1. Test Scope

| Item | Details |
|------|---------|
| Application | Swag Labs - SauceDemo |
| URL | https://www.saucedemo.com |
| Story | SCRUM-101 - E-commerce Checkout Process |
| Test Types | Functional, Regression, Negative, Edge Cases |
| Browsers | Chrome, Firefox, Safari (WebKit) |

---

## 2. Test Credentials

| Role | Username | Password |
|------|----------|----------|
| Standard User | `standard_user` | `secret_sauce` |

---

## 3. Application Flow

```
Login → Products Page → Add to Cart → Cart Review →
Checkout Step 1 (Info) → Checkout Step 2 (Overview) → Order Confirmation
```

---

## 4. Test Scenarios

---

### SUITE 1: Login & Prerequisites

#### TC-001: Successful Login with Valid Credentials
- **Priority:** Critical
- **Type:** Happy Path
- **Steps:**
  1. Navigate to `https://www.saucedemo.com`
  2. Enter username: `standard_user`
  3. Enter password: `secret_sauce`
  4. Click the **Login** button
- **Expected Result:** User is redirected to the Products page (`/inventory.html`); page title shows "Products"

---

#### TC-002: Login Failure - Invalid Credentials
- **Priority:** High
- **Type:** Negative
- **Steps:**
  1. Navigate to `https://www.saucedemo.com`
  2. Enter username: `invalid_user`
  3. Enter password: `wrong_password`
  4. Click the **Login** button
- **Expected Result:** Error message displayed: "Epic sadface: Username and password do not match any user in this service"

---

### SUITE 2: Cart Review (AC1)

#### TC-003: Add Single Item to Cart
- **Priority:** Critical
- **Type:** Happy Path
- **Preconditions:** User is logged in
- **Steps:**
  1. On the Products page, click **"Add to cart"** for "Sauce Labs Backpack"
  2. Verify the cart badge shows `1`
  3. Click the cart icon
- **Expected Result:** Cart page shows "Sauce Labs Backpack" with correct name, description, and price ($29.99)

---

#### TC-004: Add Multiple Items to Cart
- **Priority:** High
- **Type:** Happy Path
- **Preconditions:** User is logged in
- **Steps:**
  1. Click **"Add to cart"** for "Sauce Labs Backpack" ($29.99)
  2. Click **"Add to cart"** for "Sauce Labs Bike Light" ($9.99)
  3. Click the cart icon
- **Expected Result:** Cart badge shows `2`; cart page lists both items with correct names and prices

---

#### TC-005: Cart Shows Item Details (Name, Description, Price, Quantity)
- **Priority:** High
- **Type:** Happy Path
- **Preconditions:** User is logged in, one item in cart
- **Steps:**
  1. Add "Sauce Labs Backpack" to cart
  2. Navigate to cart page
  3. Verify item details
- **Expected Result:** Item displays: name ("Sauce Labs Backpack"), description text, price ($29.99), quantity (1)

---

#### TC-006: Continue Shopping from Cart
- **Priority:** Medium
- **Type:** Navigation
- **Preconditions:** User is on cart page with items
- **Steps:**
  1. Click **"Continue Shopping"** button
- **Expected Result:** User is redirected back to the Products page (`/inventory.html`)

---

#### TC-007: Remove Item from Cart
- **Priority:** Medium
- **Type:** Functional
- **Preconditions:** User is on cart page with one item
- **Steps:**
  1. Click **"Remove"** button next to the item
- **Expected Result:** Item is removed from cart; cart badge disappears or shows `0`

---

### SUITE 3: Checkout Information Entry (AC2)

#### TC-008: Navigate to Checkout from Cart
- **Priority:** Critical
- **Type:** Happy Path
- **Preconditions:** User is on cart page with items
- **Steps:**
  1. Click **"Checkout"** button
- **Expected Result:** Redirected to Checkout Step One (`/checkout-step-one.html`); form visible with First Name, Last Name, Zip/Postal Code fields

---

#### TC-009: Successful Checkout Info Entry - All Fields Valid
- **Priority:** Critical
- **Type:** Happy Path
- **Preconditions:** User is on checkout-step-one page
- **Steps:**
  1. Enter First Name: `John`
  2. Enter Last Name: `Doe`
  3. Enter Zip/Postal Code: `12345`
  4. Click **"Continue"**
- **Expected Result:** Redirected to Checkout Step Two (overview page, `/checkout-step-two.html`)

---

#### TC-010: Validation Error - All Fields Empty
- **Priority:** Critical
- **Type:** Negative
- **Preconditions:** User is on checkout-step-one page
- **Steps:**
  1. Leave all fields empty
  2. Click **"Continue"**
- **Expected Result:** Error message: "Error: First Name is required"; user stays on checkout-step-one

---

#### TC-011: Validation Error - First Name Missing
- **Priority:** High
- **Type:** Negative
- **Preconditions:** User is on checkout-step-one page
- **Steps:**
  1. Leave First Name empty
  2. Enter Last Name: `Doe`
  3. Enter Zip: `12345`
  4. Click **"Continue"**
- **Expected Result:** Error message: "Error: First Name is required"

---

#### TC-012: Validation Error - Last Name Missing
- **Priority:** High
- **Type:** Negative
- **Preconditions:** User is on checkout-step-one page
- **Steps:**
  1. Enter First Name: `John`
  2. Leave Last Name empty
  3. Enter Zip: `12345`
  4. Click **"Continue"**
- **Expected Result:** Error message: "Error: Last Name is required"

---

#### TC-013: Validation Error - Zip Code Missing
- **Priority:** High
- **Type:** Negative
- **Preconditions:** User is on checkout-step-one page
- **Steps:**
  1. Enter First Name: `John`
  2. Enter Last Name: `Doe`
  3. Leave Zip empty
  4. Click **"Continue"**
- **Expected Result:** Error message: "Error: Postal Code is required"

---

#### TC-014: Cancel Checkout from Step One - Returns to Cart
- **Priority:** Medium
- **Type:** Navigation
- **Preconditions:** User is on checkout-step-one page
- **Steps:**
  1. Click **"Cancel"** button
- **Expected Result:** User is redirected back to the Cart page (`/cart.html`)

---

#### TC-015: Error Message Dismissal
- **Priority:** Low
- **Type:** Functional
- **Preconditions:** Validation error is displayed on checkout-step-one
- **Steps:**
  1. Trigger a validation error (empty fields + Continue)
  2. Click the **×** (close) button on the error message
- **Expected Result:** Error message is dismissed/hidden

---

### SUITE 4: Order Overview (AC3)

#### TC-016: Order Overview Shows All Items
- **Priority:** Critical
- **Type:** Happy Path
- **Preconditions:** User completed checkout info, now on step two
- **Steps:**
  1. Verify items listed in overview
- **Expected Result:** All cart items are shown in the order summary

---

#### TC-017: Order Overview Shows Payment Information
- **Priority:** High
- **Type:** Functional
- **Preconditions:** User is on checkout-step-two page
- **Steps:**
  1. Check for payment information section
- **Expected Result:** Payment information is visible (e.g., "SauceCard #31337")

---

#### TC-018: Order Overview Shows Shipping Information
- **Priority:** High
- **Type:** Functional
- **Preconditions:** User is on checkout-step-two page
- **Steps:**
  1. Check for shipping information section
- **Expected Result:** Shipping information is visible (e.g., "Free Pony Express Delivery!")

---

#### TC-019: Order Overview Shows Price Breakdown (Subtotal, Tax, Total)
- **Priority:** Critical
- **Type:** Functional
- **Preconditions:** User is on checkout-step-two page with known items
- **Steps:**
  1. Add item with price $29.99 to cart
  2. Complete checkout info
  3. Check price summary on overview
- **Expected Result:**
  - Item total shows $29.99
  - Tax amount shown (8% = $2.40)
  - Total = Item total + Tax ($32.39)

---

#### TC-020: Cancel Order from Overview - Returns to Products
- **Priority:** Medium
- **Type:** Navigation
- **Preconditions:** User is on checkout-step-two page
- **Steps:**
  1. Click **"Cancel"** button
- **Expected Result:** User is redirected to the Products page (`/inventory.html`)

---

### SUITE 5: Order Completion (AC4)

#### TC-021: Complete Order Successfully
- **Priority:** Critical
- **Type:** Happy Path
- **Preconditions:** User is on checkout-step-two (overview) page
- **Steps:**
  1. Click **"Finish"** button
- **Expected Result:** Redirected to checkout-complete page; success message visible ("Thank you for your order!")

---

#### TC-022: Order Confirmation Shows Success Message
- **Priority:** Critical
- **Type:** Functional
- **Preconditions:** User just completed order
- **Steps:**
  1. Check confirmation page content
- **Expected Result:** Page shows heading "Thank you for your order!" and confirmation text

---

#### TC-023: Back Home Button Returns to Products
- **Priority:** High
- **Type:** Navigation
- **Preconditions:** User is on checkout-complete page
- **Steps:**
  1. Click **"Back Home"** button
- **Expected Result:** User is redirected to Products page (`/inventory.html`); cart is cleared (badge gone)

---

### SUITE 6: Full End-to-End Happy Path

#### TC-024: Complete Checkout Flow - Single Item
- **Priority:** Critical
- **Type:** End-to-End Happy Path
- **Steps:**
  1. Login with `standard_user` / `secret_sauce`
  2. Add "Sauce Labs Backpack" to cart
  3. Go to cart
  4. Click Checkout
  5. Enter: First Name=`John`, Last Name=`Doe`, Zip=`12345`
  6. Click Continue
  7. Verify order overview with item and pricing
  8. Click Finish
  9. Verify confirmation page
  10. Click Back Home
- **Expected Result:** Each step completes successfully; cart is empty after order

---

#### TC-025: Complete Checkout Flow - Multiple Items
- **Priority:** High
- **Type:** End-to-End Happy Path
- **Steps:**
  1. Login with `standard_user` / `secret_sauce`
  2. Add "Sauce Labs Backpack" ($29.99) and "Sauce Labs Bike Light" ($9.99) to cart
  3. Proceed through full checkout
  4. Verify overview shows both items and combined total
  5. Complete order
- **Expected Result:** Order placed with combined total ($39.98 + tax = $43.18)

---

## 5. Test Data

| Field | Valid Data | Invalid/Edge Case Data |
|-------|-----------|----------------------|
| First Name | `John`, `Jane` | `` (empty), `123`, `@#$` |
| Last Name | `Doe`, `Smith` | `` (empty), `123`, `@#$` |
| Zip Code | `12345`, `90210` | `` (empty), `ABC`, `!@#$%` |

---

## 6. Element Selectors Reference

| Element | Selector |
|---------|---------|
| Username input | `#user-name` |
| Password input | `#password` |
| Login button | `#login-button` |
| Cart icon | `.shopping_cart_link` |
| Cart badge | `.shopping_cart_badge` |
| Checkout button (cart) | `#checkout` |
| Continue shopping button | `#continue-shopping` |
| First Name field | `#first-name` |
| Last Name field | `#last-name` |
| Zip code field | `#postal-code` |
| Continue button (step 1) | `#continue` |
| Cancel button | `#cancel` |
| Error message container | `[data-test="error"]` |
| Error close button | `.error-button` |
| Finish button | `#finish` |
| Back Home button | `#back-to-products` |
| Item total | `.summary_subtotal_label` |
| Tax label | `.summary_tax_label` |
| Order total | `.summary_total_label` |
| Confirmation header | `.complete-header` |

---

## 7. Test Coverage Matrix

| Acceptance Criteria | Test Cases | Priority |
|--------------------|-----------|---------|
| AC1: Cart Review | TC-003, TC-004, TC-005, TC-006, TC-007 | Critical/High |
| AC2: Checkout Info Entry | TC-008, TC-009, TC-010, TC-011, TC-012, TC-013, TC-014, TC-015 | Critical/High |
| AC3: Order Overview | TC-016, TC-017, TC-018, TC-019, TC-020 | Critical/High |
| AC4: Order Completion | TC-021, TC-022, TC-023 | Critical/High |
| AC5: Error Handling | TC-010, TC-011, TC-012, TC-013, TC-015 | High |
| End-to-End | TC-024, TC-025 | Critical |

**Total Test Cases: 25**

---

## 8. Out of Scope

- Payment processing (demo site has no real payment)
- Performance / load testing
- Accessibility testing (WCAG compliance)
- API-level testing
