# Stytch Passkey Example in Next.js

<p>
    <img width="767" alt="Screenshot 2023-11-14 at 12 56 49 PM" src="https://github.com/stytchauth/stytch-passkey-nextjs-example-app/assets/111321901/f3f2dc67-7e06-4dec-8fde-743fa7f65af8">
</p>
<p>
    <img width="1333" alt="Screenshot 2023-11-14 at 12 57 31 PM" src="https://github.com/stytchauth/stytch-passkey-nextjs-example-app/assets/111321901/4f87d23c-1f2f-47c2-92e5-84794f9f40a3">
</p>

## Overview

This example application demonstrates how one may use Stytch's Passkey authentication within a Next.js application. The application features a sign-up and login flow powered by OTP sms/email and passkeys.

This project utilizes Stytch's [NextJS SDK](https://www.npmjs.com/package/@stytch/nextjs) to power authentication. All authentication logic lives within the NextJS SDK UI components.

This project was bootstrapped with [Create Next App](https://nextjs.org/docs/api-reference/create-next-app).

## Set up

Follow the steps below to get this application fully functional and running using your own Stytch credentials.

### In the Stytch Dashboard

1. Create a [Stytch](https://stytch.com/) account. Within the signup flow select **B2C Authentication** as the authentication type you are interested in. Once your account is set up a Project called "My first project" will be automatically created for you.

   - If you signed up for Stytch in the past then your default Project is likely a Consumer type Project. You can confirm this in your [Project settings](https://stytch.com/dashboard/project-settings).

2. Navigate to [SDK Configuration](https://stytch.com/dashboard/sdk-configuration) and click "Enable SDK". Enter the domain you will be running this application on (e.g. `localhost:3000`).
Click the toggle to enable "Email Passcodes (OTP)", "SMS Passcodes (OTP)", and "Passkeys".

3. Finally, navigate to [API Keys](https://stytch.com/dashboard/api-keys). You will need the `project_id`, `secret`, and `public_token` values found on this page later on.


### On your machine

In your terminal clone the project and install dependencies:

```bash
git clone https://github.com/stytchauth/stytch-b2b-nextjs-example.git
cd stytch-b2b-nextjs-example
npm i
```

Next, create `.env.local` file by running the command below which copies the contents of `.env.template`.

```bash
cp .env.template .env.local
```

Open `.env.local` in the text editor of your choice, and set the environment variables using the `project_id`, `secret`, and `public_token` found on [API Keys](https://stytch.com/dashboard/api-keys). Leave the `NEXT_PUBLIC_STYTCH_PROJECT_ENV` value as `test`.

```
# This is what a completed .env.local file will look like
NEXT_PUBLIC_STYTCH_PROJECT_ENV=test
STYTCH_PROJECT_ID=project-test-00000000-0000-1234-abcd-abcdef1234
STYTCH_SECRET=secret-test-12345678901234567890abcdabcd
NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN=public-token-test-abc123-abcde-1234-0987-0000-abcd1234
```

## Running locally

After completing all the setup steps above the application can be run with the command:

```bash
npm run dev
```

The application will be available at [`http://localhost:3000`](http://localhost:3000).

## Get help and join the community

#### :speech_balloon: Stytch community Slack

Join the discussion, ask questions, and suggest new features in our [Slack community](https://join.slack.com/t/stytch/shared_invite/zt-nil4wo92-jApJ9Cl32cJbEd9esKkvyg)!

#### :question: Need support?

Check out the [Stytch Forum](https://forum.stytch.com/) or email us at [support@stytch.com](mailto:support@stytch.com).
