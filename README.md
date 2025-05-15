# Udemy Test task

**Candidate name**: [Yaroslav Kostenko](https://www.linkedin.com/in/yaroslav-kostenko-45562515a/)

This repository contains an end-to-end (E2E) testing framework built using Playwright + TS + Node.js. It is designed to automate testing for the [Udemy](https://www.udemy.com/).

## Repository Structure

```text
ts_pw_udemy/
├── environment/        # Environment files to work locally and on CI
├── resources/          # Screenshots used in tests
├── src/                # Source files for page objects and utilities
├── tests/              # Test cases for various features
├── .prettierrc         # Prettier configuration file
├── .nvmrc              # Node version configuration file
├── eslint.config.mjs    # Config file for linter
├── package.json        # Node.js dependencies and scripts
├── README.md           # Project documentation
```

## Used Technologies

- **[Playwright](https://playwright.dev/)**
- **[Allure Reporter](https://docs.qameta.io/allure/)**
- **[Node.js v22](https://nodejs.org/en)**
- **TypeScript**
- **ESLint**
- **Prettier**
- **playwright-extra/puppeteer-extra-plugin-stealth** is used to workaround captcha

## Commands

Here are some useful commands to work with this project:

### Install Dependencies

```bash
npm run start
```

### Run Tests in debug mode

```bash
npm run pw:run:local-open-debug
```

### Allure Report

Read the [documentation](https://allurereport.org/docs/install/) to setup Allure locally.

Generate report:

```bash
npm run allure:generate
```

Open report:

```bash
npm run allure:open
```
