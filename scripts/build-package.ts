import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { rimraf } from 'rimraf'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pathTo = (p: string) => path.join(__dirname, p)

async function main() {
  await rimraf(pathTo('../dist'))
  await fs.mkdir(pathTo('../dist'))

  const toCopy = [
    ['../src/types.ts', '../dist/types.d.ts'],
  ]

  for (const [from, to] of toCopy) {
    await fs.copyFile(pathTo(from), pathTo(to))
  }

  console.log('📦 Done!')
}

await main()
