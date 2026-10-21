![](./public/preview.png)

<div align="center">
  <h3>AdonisJS Packages</h3>
  <p>Discover the best AdonisJS packages</p>
</div>


## Introduction

This is the source code of the [AdonisJS Packages](https://packages.adonisjs.com/) website. The website is built using:

- [AdonisJS](https://adonisjs.com)
- [VueJS](https://vuejs.org/)
- [InertiaJS](https://inertiajs.com/)
- [UnoCSS](https://unocss.dev/)
- [Vite](https://vitejs.dev/)
- [BentoCache](https://bentocache.julr.dev/)
- [Japa](https://japa.dev/)

If you are looking for a good starting point to learn AdonisJS, then this repo may be a good starting point for you. It is a simple website, but it covers a lot of concepts like:

- How we can super easily build a monolithic application using AdonisJS, InertiaJS and VueJS and still have a SPA feeling. No state management, routing, API calls, loading spinners, error management needed front-end side.
- IoC container and Dependency injection using AdonisJS. For example, we leverage them to easily test our controller and commands without having to fetch real data from npm and GitHub APIs
- Developing custom commands with pretty prompts and spinners using AdonisJS Ace
- Testing commands, controllers, and service using IoC container, API Client, and Inertia test helpers
- [End-to-end testing](./tests/browser/) using Playwright
- [Dockerize the application](./Dockerfile) in order to make it easy to deploy
- GitHub Actions CI/CD: we use GitHub Actions to run our [tests, check linting, type checking](.github/workflows/checks.yml) and [build the application image](.github/workflows/on-push-to-main.yml) before deploying it to our server
- Caching using BentoCache: instead of calling the npm and GitHub APIs on each request, we use a 2-layer (Memory + SQLite) cache system to store the data and refresh it only when needed. See [./config/cache.ts](./config/cache.ts) for more details.
- How to setup Vite/ESLint ([Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new))/Prettier/TSconfig
- Payload validation using VineJS
- Dynamic OpenGraph image generation

## Contributions

### Add a new package

The packages database is a collection of YAML files, where each file represents a package. Files are located in the [./content/packages](./content/packages) directory and are used by both this website and [adonisjs.com/packages](https://adonisjs.com/packages).

To add a package, create a new file in that directory, or preferably, use the `node ace add:package` command. A package file looks like this:

```yaml
# Required
name: '@my-scope/my-package'
description: A short description of what the package does
category: Database # One of the labels in ./content/categories.ts
type: 3rd-party # Or "official" for packages maintained by the AdonisJS core team
repo: https://github.com/owner/repo # Can point to a monorepo folder: https://github.com/owner/repo/tree/main/packages/my-package
compatibility: ^6.0.0 || ^7.0.0 # AdonisJS major versions the package works with

# Optional
npm: '@my-scope/my-package' # Omit for packages not published on npm
website: https://my-package.dev # When the docs live outside the repo
icon: my-package.png # File stored in ./public/icons
keywords: [queue, jobs] # Used for search
```

Run `node ace validate:packages` to check your file. Pull requests run it automatically, along with `--online`, which also checks that the npm package and GitHub repository exist, are not deprecated or archived, and that `compatibility` matches the `@adonisjs/core` versions declared on npm. `node ace validate:packages --fix` updates `compatibility` from npm.

Packages whose repository gets archived, or whose npm package gets deprecated, are removed from the list. A weekly job reports them.

#### Custom Icon

If you want to add an icon for your package, make sure to pick an appropriate image, not too big, not too small, in correct quality. Once you have the image, make sure to add it in `/public/icons` directory, and then add the file name in the `icon` field of your package yaml file.

#### Launch the website

In order to run the website locally, you need to:

- Install dependencies using `pnpm install`
- Compile the package database using `node ace build:packages`
- Create your `.env` file using the `.env.example` file. Use `node ace generate:key` to generate a new key and, not mandatory, use `gh auth token` to generate a new Github token.
- Migrate and seed your database using `node ace migration:fresh --seed`
- Start the dev server using `node ace serve --watch`

Then you can visit the website at `http://localhost:3333`
