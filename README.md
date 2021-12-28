<div align="center">
  <img src="https://i.imgur.com/2wGdEJN.png" width="200" fill="red"/>
  <br/>
  <h3>Adonis Modules</h3>
  <p>Discover Adonis modules to supercharge your project !</p>
  <p>👉 <a href="https://adonis-modules.vercel.app/">https://adonis-modules.vercel.app</a> 👈</p>
</div>



## Modules Database

Metadata of adonis modules are maintained in [yml](https://en.wikipedia.org/wiki/YAML) files inside [./modules](./modules) directory and automatically synced from upstream to fetch latest information.

### Contribution

- If you feel a module is missing, please create a new [issue]()
- If some data is outdated please directly open a pull request

### Schema

Field Name      | Auto sync | Description
----------------|-----------|--------------
`name`          | No        | Canonical name or integration name
`description`   | Yes       | Short description
`repo`          | No        | Github repository. Format is `org/name` or `org/name#main/path`
`npm`           | Yes       | NPM package name
`icon`          | No        | Icon of module from [./website/static/icons](./website/static/icons) directory
`github`        | No        | Github URL
`website`       | No        | Website URL
`learn_more`    | No        | Link to learn more (website or relevant integration website)
`category`      | No        | Module category from [./lib/categories.json](./lib/categories.json)
`type`          | No        | `community` (for [adonisjs-community](https://github.com/adonisjs-community/)), `official` (for https://github.com/) or `3rd-party`
`maintainers`   | Yes       | List of maintainers each item has `name`, `github` and `avatar`


## Maintenance

### Add or update repository

```bash
yarn sync <name> <repo>
```

Example: `yarn sync eslint adonisjs-community/eslint-plugin-adonis`

To sync with a branch different than `master`, suffix the repo with `#repo-branch`, example: `yarn sync eslint adonisjs-community/eslint-plugin-adonis#dev`

### Auto update all current modules

```bash
yarn sync
```

### Generate `npm/modules.json`

```bash
yarn build
```

## Website development

- Clone repository
- Install website depenedencies using `npx yarn install`

Start development:

```bash
npx yarn dev
```

Then visit http://localhost:3000

In the development, the npm downloads and GitHub stars will be mocked unless setting `USE_ADONIS_API` variable.

## Acknowledgement

- Nuxt team for developing this awesome project. https://github.com/nuxt/modules
