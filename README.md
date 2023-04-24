<div align="center">
  <img src="https://i.imgur.com/2wGdEJN.png" width="200" fill="red" />
  <br />
  <h3>AdonisJS Packages</h3>
  <p>Discover AdonisJS packages to supercharge your project !</p>
  <p>👉 <a href="https://packages.adonisjs.com">https://packages.adonisjs.com</a> 👈</p>
</div>

## Packages Database

Metadata of AdonisJS packages are maintained in [yml](https://en.wikipedia.org/wiki/YAML) files inside [./modules](./modules) directory and automatically synced from upstream to fetch latest information.

### Contribution

- If you feel a package is missing, please create a new [issue]() or open a pull request after [syncing](#add-or-update-repository) your package
- If some data is outdated please directly open a pull request

### Schema

Field Name      | Auto sync | Description
----------------|-----------|--------------
`name`          | No        | Canonical name or integration name
`description`   | Yes       | Short description
`repo`          | No        | Github repository. Format is `org/name` or `org/name#main/path`
`npm`           | Yes       | NPM package name
`icon`          | No        | Icon of package from [./website/static/icons](./website/static/icons) directory
`github`        | No        | Github URL
`website`       | No        | Website URL
`learn_more`    | No        | Link to learn more (website or relevant integration website)
`category`      | No        | Package category from [./lib/categories.ts](./lib/categories.ts)
`type`          | No        | `community` (for [adonisjs-community](https://github.com/adonisjs-community/)), `official` (for https://github.com/) or `3rd-party`
`maintainers`   | Yes       | List of maintainers each item has `name`, `github` and `avatar`

## Maintenance

### Add or update repository

```bash
pnpm sync <name> <repo>
```

Example: `pnpm sync eslint adonisjs-community/eslint-plugin-adonis`

**To sync with a branch different than `master`, suffix the repo with `#repo-branch`, example: `pnpm sync eslint adonisjs-community/eslint-plugin-adonis#dev`**

### Auto update all current packages

```bash
pnpm sync
```

### Generate `npm/modules.json`

```bash
pnpm build
```

## Website development

- Clone repository
- Install website dependencies using `npx yarn install`

Start development:

```bash
pnpm dev
```

Then visit http://localhost:3000

In the development, the npm downloads and GitHub stars will be mocked unless setting `USE_NUXT_API` variable.

## Acknowledgement

- Nuxt team for developing this awesome project. https://github.com/nuxt/modules
