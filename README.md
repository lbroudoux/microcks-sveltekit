# Microcks SvelteKit UI

A brand new UI for Microcks frontend instead of old Angular one :wink:

## Start Microcks

To run the backend services this frontend is using, we're launching both Keycloak and Microcks via containers using ocker compose.

Go to the `/dev` folder and run the docker-compose file:

```bash
cd dev
docker compose up
```

This started Keycloak that can be accessed via `http://localhost:8180` in your browser. The default admin user/password is `admin/admin`. Docker compose also intialized a `microcks` realm that is already configured for the SvelkeKit UI client.

This also started Microcks that can be accessed via `http://localhost:8080` in your browser. This Microcks instance is un-secured when used via this port - it means that you can import samples easily without taking care of permissions.

## Developing

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

This SvelteKit application is configured to proxy HTTP request starting with `/api` to the Microcks backend we previoulys started an running on port `8080`.

Then connect to the UI using `http://localhost:5173` in your browser. You should then be re-directed to Keycloak authentication form for the `microcks` realm. You can use the default `admin/microcks123` user and password.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
