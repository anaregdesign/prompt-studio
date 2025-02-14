# Contributing to Prompt Studio

Thank you for considering contributing to Prompt Studio! We welcome contributions from the community to help improve the project. Please take a moment to review these guidelines before you start contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Linting and Code Style](#linting-and-code-style)
- [Submitting Changes](#submitting-changes)
- [License](#license)

## Code of Conduct

By participating in this project, you agree to abide by the [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand the expectations for all contributors.

## How to Contribute

1. **Fork the repository**: Click the "Fork" button at the top right corner of the repository page to create a copy of the repository in your GitHub account.

2. **Clone the repository**: Clone the forked repository to your local machine using the following command:
   ```bash
   git clone https://github.com/your-username/prompt-studio.git
   cd prompt-studio
   ```

3. **Create a new branch**: Create a new branch for your contribution using the following command:
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**: Make the necessary changes to the codebase. Ensure that your changes adhere to the project's coding standards and guidelines.

5. **Commit your changes**: Commit your changes with a descriptive commit message using the following command:
   ```bash
   git commit -m "Add a brief description of your changes"
   ```

6. **Push your changes**: Push your changes to your forked repository using the following command:
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a pull request**: Open a pull request (PR) from your forked repository to the main repository. Provide a clear and detailed description of your changes in the PR.

## Development Setup

To set up the development environment, follow these steps:

1. **Install dependencies**: Install the project dependencies using npm or yarn:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables**: Create a `.env.local` file in the root directory and add the necessary environment variables. Refer to the `Dockerfile` for the required variables.

3. **Run the development server**: Start the development server using the following command:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Linting and Code Style

We use ESLint to enforce code quality and consistency. Please ensure that your code passes the linting checks before submitting a pull request.

To run the linting script, use the following command:
```bash
npm run lint
```

## Submitting Changes

When submitting changes, please ensure that your pull request (PR) includes the following:

- A clear and descriptive title.
- A detailed description of the changes you have made.
- Any relevant issue numbers (if applicable).
- Screenshots or GIFs (if applicable) to demonstrate the changes.

## License

By contributing to Prompt Studio, you agree that your contributions will be licensed under the [MIT License](LICENSE).
