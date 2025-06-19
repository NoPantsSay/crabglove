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
``` shell
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

## flatpack for linux(Ubuntu 24.04)

###  Install flatpak and flatpak-builder

```shell
sudo apt install flatpak flatpak-builder
```

### Add Flathub repository

```shell
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

### Install the Flatpak Runtime

``` shell
flatpak install flathub org.gnome.Platform//48 org.gnome.Sdk//48
```

### Build flatpak app

``` shell
flatpak-builder --force-clean --repo=repo build-dir org.flatpak.crabglove.yml
flatpak build-bundle repo crabglove.flatpak org.flatpak.crabglove
``` 

### Build flatpak runtime (optional)

``` shell
flatpak build-bundle --runtime /var/lib/flatpak/repo crabglove-runtime.flatpak org.gnome.Platform 48
``` 

### Install the runtime (optional)

``` shell
flatpak install crabglove-runtime.flatpak
``` 

### Run flatpak

``` shell
flatpak install --user  crabglove.flatpak
flatpak run  org.flatpak.crabglove
``` 
