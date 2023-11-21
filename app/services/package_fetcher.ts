/**
 * Responsible for fetching package details from NPM and Github
 */
export class PackageFetcher {
  /**
   * Get first and last release date for a given package
   */
  async fetchReleaseDates(name: string) {
    const { time } = await this.fetchNpmPkg(name)
    return { firstReleaseAt: time.created as string, lastReleaseAt: time.modified as string }
  }

  /**
   * Fetch given package details from NPM
   */
  async fetchNpmPkg(name: string) {
    const result = await fetch(`http://registry.npmjs.org/${name}`).then((res) => res.json())
    return result as Promise<Record<string, any>>
  }

  /**
   * Fetch package downloads from npm
   */
  async fetchPackageDownloads(name: string) {
    const result = await fetch(`https://api.npmjs.org/downloads/point/last-month/${name}`).then(
      (res) => res.json(),
    )
    return result as Promise<Record<string, any>>
  }

  /**
   * Fetch github stars from github REST Api
   */
  async fetchGithubStars(repo: string) {
    // See https://github.com/adonisjs/road-to-v6/issues/38 to understand
    // why we are importing env in the method
    const { default: env } = await import('#start/env')

    const result = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Authorization: `token ${env.get('GITHUB_TOKEN')}` },
    })

    const json = (await result.json()) as { stargazers_count: number }
    return { stars: json.stargazers_count }
  }

  /**
   * Fetch package.json file from github repository
   * @param repository Github repository name in format username/repo-name
   * @param branch Branch to fetch the package.json file from
   */
  fetchGithubPkg(repository: string, branch = 'main') {
    const url = `https://raw.githubusercontent.com/${repository}/${branch}/package.json`
    return fetch(url).then((res) => res.json()) as Promise<Record<string, any>>
  }

  /**
   * Fetch README.md file from github repository
   * @param repository Github repository name in format username/repo-name
   * @param branch Branch to fetch the README.md file from
   */
  fetchReadme(repository: string, branch = 'main') {
    const url = `https://raw.githubusercontent.com/${repository}/${branch}/README.md`
    return fetch(url).then((res) => res.text())
  }
}
