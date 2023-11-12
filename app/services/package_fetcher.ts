/**
 * Responsible for fetching package details from NPM and Github
 */
export class PackageFetcher {
  /**
   * Fetch given package details from NPM
   */
  async fetchNpmPkg(name: string) {
    const result = await fetch(`http://registry.npmjs.org/${name}`).then((res) => res.json())
    return result as Promise<Record<string, any>>
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
}
