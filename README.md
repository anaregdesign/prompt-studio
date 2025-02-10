This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project Description

Prompt Studio is a web application that allows users to create, share, and manage prompts for various purposes. It provides a user-friendly interface for creating prompts, organizing them into categories, and sharing them with others. The application is built using Next.js and TypeScript, and it leverages a SQL database for storing prompt data.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 14 or later)
- npm (version 6 or later) or yarn (version 1.22 or later)
- Docker (optional, for containerized deployment)

## Installation

To install the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/anaregdesign/prompt-studio.git
   cd prompt-studio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the necessary environment variables. Refer to the `Dockerfile` for the required variables.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and
load Inter, a custom Google Font.

## Usage

To use the application, follow these steps:

1. Open the application in your browser.
2. Create a new prompt by clicking on the "Create Prompt" button.
3. Fill in the prompt details, including the name and body of the prompt.
4. Save the prompt and it will be added to the list of available prompts.
5. You can edit or delete prompts as needed.

## Contributing

Contributions are welcome! To contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
