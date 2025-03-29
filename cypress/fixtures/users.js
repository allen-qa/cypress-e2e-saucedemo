// cypress/fixtures/users.js

/**
 * PUBLIC TEST USERS (Safe to commit)
 * For demo purposes only. These are SauceDemo's public credentials.
 * 
 * For real projects, sensitive credentials belong in:
 * 1. cypress.env.json (local development)
 * 2. CI/CD environment variables (GitHub Secrets, etc.)
 */

export const users = {
  "standard": {
    "username": "standard_user",
    "password": "secret_sauce"
  },
  "locked": {
    "username": "locked_out_user",
    "password": "secret_sauce"
  },
  "problem": {
    "username": "problem_user",
    "password": "secret_sauce"
  },
  "performance_glitch": {
    "username": "performance_glitch_user",
    "password": "secret_sauce"
  },
  "error": {
    "username": "error_user",
    "password": "secret_sauce"
  },
  "visual": {
    "username": "visual_user",
    "password": "secret_sauce"
  }
}