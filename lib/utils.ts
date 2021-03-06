import { resolve } from 'path'
import { $fetch } from 'ohmyfetch'
export const rootDir = resolve(__dirname, '..')
export const modulesDir = resolve(rootDir, 'modules')
export const distDir = resolve(rootDir, 'npm')
export const distFile = resolve(distDir, 'modules.json')

export function fetchPKG (name) {
  return $fetch('http://registry.npmjs.org/' + name)
}

export function fetchRawGithub (path) {
  return $fetch('https://raw.githubusercontent.com/' + path)
}

export async function fetchGithubPkg (repo) {
  let path
  [repo, path = 'master'] = repo.split('#')

  try {
    const rawData = await fetchRawGithub(repo + '/' + path + '/' + 'package.json')
    return JSON.parse(rawData)
  } catch (error) {
    return {}
  }
}

export function uniq (items: any[]) {
  return Array.from(new Set(items))
}
