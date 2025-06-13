# Crabglove

This is a [Tauri](https://v2.tauri.app/) project using [Next.js](https://nextjs.org/),
bootstrapped by combining [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
and [`create tauri-app`](https://v2.tauri.app/start/create-project/).

This project uses [`pnpm`](https://pnpm.io/) as the Node.js dependency
manager, and uses the [App Router](https://nextjs.org/docs/app) model for Next.js.

## Getting Started

### Prepare

***This is the [environment configuration](https://tauri.app/start/prerequisites/) required for Tauri. Please follow these steps.***

If your computer already has Node.js and npm installed, you can simply run the following command to install pnpm globally:
``` bash
npm install -g pnpm
```

### Run

To develop and run the frontend in a Tauri window:

```shell
pnpm tauri dev
```

### Building for release

To export the Next.js frontend via SSG and build the Tauri application for release:

```shell
pnpm tauri build
```