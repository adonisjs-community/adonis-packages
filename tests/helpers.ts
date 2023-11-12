import { load } from 'js-yaml'
import { join } from 'node:path'
import { getDirname } from '@poppinss/utils'
import { readFile, rm } from 'node:fs/promises'

import type { PackageInfo } from '../app/types.js'

const dirname = getDirname(import.meta.url)

export async function readPackageFile(name: string) {
  const yml = await readFile(join(dirname, `../content/packages/${name}.yml`), 'utf-8')
  return load(yml) as PackageInfo
}

export async function deletePackageFile(name: string) {
  const file = join(dirname, `../content/packages/${name}.yml`)
  await rm(file)
}
