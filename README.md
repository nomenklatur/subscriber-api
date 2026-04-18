# subscriber-api

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.23. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

## Deployment on Vercel

This application is configured to be deployed on Vercel using the Bun runtime.

### Steps to Deploy

1.  **Environment Variables**: Ensure you have the following environment variables configured in your Vercel project settings:
    - `DATABASE_URL`: Your PostgreSQL connection string.
    - `RESEND_API_KEY`: Your Resend API key for sending emails.
    - `FROM_EMAIL`: The email address to send from.

2.  **Deployment**:
    - **GitHub Integration**: Push your code to a GitHub repository and connect it to Vercel. Vercel will automatically detect the configuration and deploy using Bun.
    - **Vercel CLI**: Run `vercel` in your terminal to deploy directly.

The `vercel.json` file ensures that the Bun runtime is used, and `index.ts` exports the Express application for Vercel's serverless functions.
