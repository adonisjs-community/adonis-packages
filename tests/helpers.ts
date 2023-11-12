import { getDirname } from '@poppinss/utils'
import { readFile } from 'node:fs/promises'
import { load } from 'js-yaml'
import { join } from 'node:path'
import { PackageInfo } from '../app/types.js'

export async function readPackageFile(name: string) {
  const dirname = getDirname(import.meta.url)
  const yml = await readFile(join(dirname, `../../../content/packages/${name}.yml`), 'utf-8')
  return load(yml) as PackageInfo
}
