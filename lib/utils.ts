import { resolve } from 'path'
import { $fetch } from 'ohmyfetch'
import { dirname } from 'desm'

export const rootDir = resolve(dirname(import.meta.url), '..')
export const modulesDir = resolve(rootDir, 'modules')
export const distDir = resolve(rootDir, 'npm')
export const distFile = resolve(distDir, 'modules.json')

export function fetchPKG (name: string) {
  return $fetch('http://registry.npmjs.org/' + name)
}

export function fetchRawGithub (path: string) {
  return $fetch('https://raw.githubusercontent.com/' + path, { responseType: 'json' })
}

export function fetchGithubPkg (repo: string) {
  let path
  [repo, path = 'main'] = repo.split('#')

  return fetchRawGithub(repo + '/' + path + '/' + 'package.json')
}

export function uniq (items: any[]) {
  return Array.from(new Set(items))
}
