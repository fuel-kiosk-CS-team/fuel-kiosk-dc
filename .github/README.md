# GitHub Actions Workflows  

This folder contains workflows designed to automate testing and deployment for the React Next.js Fuel Kiosk Data Collection website. The workflows ensure code quality through rigorous testing and enable seamless deployment to GitHub Pages.  

## Workflows Overview  

1. **Pull Request Workflows**  
   - **Unit Tests**: Executes unit tests using [Jest](https://jestjs.io/) to validate individual components and utilities.  
   - **Integration Tests**: Runs integration tests using [Jest](https://jestjs.io/) to verify the interaction between components.  
   - **End-to-End (E2E) Tests**: Utilizes [Cypress](https://www.cypress.io/) to perform E2E testing, ensuring the application functions correctly from a user's perspective.  

2. **Merge to `main` Workflow**  
   - Runs all the tests (unit, integration, and E2E) to confirm the stability of the `main` branch.  
   - Deploys the project to [GitHub Pages](https://pages.github.com/) if all tests pass.  

## Key Features  

- **Testing Frameworks**:  
  - **Jest**: Used for unit and integration testing.  
  - **Cypress**: Used for E2E testing to simulate real user interactions.  

- **Continuous Deployment**:  
  - Ensures the latest stable version is automatically deployed to GitHub Pages after merging to `main`.  

## Folder Structure  

- **`build-and-test.yml`**: This is the meat of the workflows as it defines the `build-and-test` job which actually setups the project on the runner, runs the unit, integration, and e2e tests and then deploys if the parameter it takes in set to true.
- **`deploy.yml`**: This is ran whenever there is a merge into main and it runs the `build-and-test` job with the deploy parameter set to true which means it will run the tests and then deploy the application to Github Pages.
- **`test-on-pull-request.yml`**: This is ran whenever a pull request is opened and runs the `build-and-test` job with the deploy parameter set to false. This means that it will just run the tests.

## How It Works  

1. **On Pull Requests**:  
   - The workflows automatically trigger and run the relevant tests to catch issues early.  
   - Results are displayed directly in the pull request for quick feedback.  

2. **On Merge to `main`**:  
   - All test suites are executed to ensure the stability of the codebase.  
   - Upon successful test completion, the updated application is deployed to GitHub Pages.  

## Customization  

You can customize these workflows by modifying the `.yml` files in this folder.  Refer to the [GitHub Actions documentation](https://docs.github.com/en/actions) for more details.   

With these workflows in place, this project benefits from reliable testing and automated deployment, enabling faster, more confident iterations.  

# Soon to Come: 
Use the current workflows to deploy to dev environment when merged into main. Then when a commit is tagged it will run a workflow to deploy to production.